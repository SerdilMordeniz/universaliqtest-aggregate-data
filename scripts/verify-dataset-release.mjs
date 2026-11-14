import { readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv, sha256 } from './capture-dataset-release.mjs';

export async function verify(output) {
  const manifest = JSON.parse(await readFile(join(output, 'manifest.json'), 'utf8'));
  const overview = JSON.parse(await readFile(join(output, 'overview-evidence.json'), 'utf8'));
  const totals = Object.fromEntries(Object.entries(overview.counts ?? {}).map(([k, v]) => [k, Number(String(v).replace(/,/g, ''))]));
  const errors = [], notes = [], tables = [];
  if (!Number.isInteger(totals.tested) || !Number.isInteger(totals.validated) || totals.validated < 1 || totals.tested < totals.validated) {
    errors.push('Overview totals are missing or invalid; do not publish an unverified overview denominator.');
  }
  let rowChecks = 0, intervalChecks = 0, rateChecks = 0;
  const number = value => value === '' || value == null ? null : Number(value);
  const round1 = value => Math.round((value + Number.EPSILON) * 10) / 10;
  for (const file of manifest.files) {
    const bytes = await readFile(join(output, file.file));
    if (sha256(bytes) !== file.sha256) errors.push(`${file.file}: checksum mismatch`);
    const { headers, rows } = parseCsv(bytes.toString('utf8').replace(/^\uFEFF/, ''));
    if (rows.length !== file.rows || JSON.stringify(headers) !== JSON.stringify(file.columns)) errors.push(`${file.file}: manifest schema/row mismatch`);
    let includedN = 0;
    const labels = new Set();
    for (const row of rows) {
      rowChecks++;
      const label = row[headers[0]], n = number(row.n ?? row[file.view === 'all' ? 'allN' : 'validatedN']);
      if (labels.has(label)) errors.push(`${file.file}: duplicate label ${label}`);
      labels.add(label);
      if (!Number.isInteger(n) || n < 1) errors.push(`${file.file}/${label}: invalid sample size`);
      includedN += n;
      const p = ['p10', 'p25', headers.includes('median') ? 'median' : 'p50', 'p75', 'p90'].map(k => number(row[k]));
      if (p.some(v => v === null || !Number.isFinite(v)) || p.some((v, i) => i && v < p[i - 1])) errors.push(`${file.file}/${label}: invalid percentile ordering`);
      if (!Number.isFinite(number(row.meanIQ))) errors.push(`${file.file}/${label}: invalid meanIQ`);
      if (row.updatedAt && (!Number.isFinite(Date.parse(row.updatedAt)) || Date.parse(row.updatedAt) > Date.parse(manifest.completedAt))) errors.push(`${file.file}/${label}: invalid/future updatedAt`);
      if (row.validationRate !== undefined) {
        const validatedN = number(row.validatedN), allN = number(row.allN);
        const rate = number(row.validationRate);
        if (!Number.isInteger(validatedN) || !Number.isInteger(allN) || allN < 1 || validatedN < 0 || validatedN > allN || !Number.isFinite(rate) || Math.abs(rate - round1(100 * validatedN / allN)) > 1e-8) errors.push(`${file.file}/${label}: invalid quality-screening rate`);
        rateChecks++;
      }
      if (row.ciLower !== undefined) {
        const sd = p[3] > p[1] ? round1((p[3] - p[1]) / 1.349) : null;
        const margin = n > 1 && sd !== null ? 1.96 * sd / Math.sqrt(n) : null;
        const lower = number(row.ciLower), upper = number(row.ciUpper), mean = number(row.meanIQ);
        if (margin === null) {
          if (lower !== null || upper !== null) errors.push(`${file.file}/${label}: interval should be missing`);
        } else {
          if (lower === null || upper === null || Math.abs(lower - (mean - margin)) > 1e-7 || Math.abs(upper - (mean + margin)) > 1e-7) errors.push(`${file.file}/${label}: interval calculation mismatch`);
          intervalChecks++;
        }
      }
      if (file.dimension === 'age' && !['Youth', 'Young Adult', 'Adult', 'Senior'].includes(label)) notes.push(`${file.file}: nonstandard age label ${JSON.stringify(label)} has n=${n}; retained in original CSV, excluded from four-band charts.`);
    }
    const expectedN = totals[file.view === 'all' ? 'tested' : 'validated'];
    tables.push({ file: file.file, dimension: file.dimension, view: file.view, rows: rows.length, includedN,
      overviewN: expectedN ?? null, differenceFromOverview: expectedN == null ? null : expectedN - includedN,
      note: 'Dimension coverage and separate cached requests can differ; overview comparison is diagnostic, not proof of a defect.' });
  }
  notes.push('Age CSVs have no CI fields. Age charts show exported interquartile ranges, not confidence intervals.');
  notes.push('Intervals reproduce the snapshot\'s IQR-based implementation. This does not establish valid confidence coverage for the nonlinear group statistic.');
  notes.push('Country/education/study-area use age-normalized percentile columns; age/default-gender use global percentile columns. They are not interchangeable estimands.');
  const countries = parseCsv(await readFile(join(output, 'data/country-validated.csv'), 'utf8')).rows;
  const ages = parseCsv(await readFile(join(output, 'data/age-validated.csv'), 'utf8')).rows;
  const report = { checkedAt: new Date().toISOString(), status: errors.length ? 'failed' : 'passed',
    checks: { files: manifest.files.length, rows: rowChecks, intervals: intervalChecks, screeningRates: rateChecks },
    overviewTotals: totals, tables, errors, notes,
    reviewScope: 'Technical checks against public aggregates and documented code. Not an independent human review or psychometric validation.',
    independentReview: 'pending' };
  await writeFile(join(output, 'verification.json'), JSON.stringify(report, null, 2) + '\n');
  await writeFile(join(output, 'chart-inputs.json'), JSON.stringify({ capturedAt: manifest.completedAt,
    source: 'Frozen public CSVs listed in manifest.json', ages,
    countries: countries.filter(r => ['BG', 'CZ', 'FR', 'IT', 'PL', 'PT', 'RU', 'SK', 'UA'].includes(r.countryCode)) }, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
  if (errors.length) throw new Error(`Dataset verification failed: ${errors.length} error(s)`);
  return report;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (!process.argv[2]) throw new Error('Usage: node scripts/verify-dataset-release.mjs SNAPSHOT_DIRECTORY');
  await verify(resolve(process.argv[2]));
}
