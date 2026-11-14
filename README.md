# UniversalIQTest aggregate snapshot — 10 October 2026

This is a dated capture of the site's first-party public aggregate exports. At capture, the public overview reported **334,915 recorded tests**, including **109,433 quality-screened results**. Quality screening checks test-taking behaviour; it does not establish psychometric validity.

Snapshot version **2026-10-10**. Publication date **14 November 2026**. Publisher and rights holder **UniversalIQTest**. Licensed under **CC BY 4.0**.

Package revision **2** includes the worked teaching example omitted from the initial archive. The ten captured CSVs are unchanged.

The collection includes country, age band, gender, education and study area, each in quality-screened and all-test views. The files are captured from separate HTTP requests and cached endpoints, so this is not an atomic database extract or a fixed annual cohort. Capture times, exact source URLs, SHA-256 checksums, schemas and row counts are in [manifest.json](manifest.json).

## What has been checked

[verification.json](verification.json) records 10 files, 501 aggregate rows, 491 screening-rate checks and 451 reproducible interval calculations. All ten original CSV checksums match the capture manifest. The completed [technical methodology review](methodology-review.md) explains the historical calculations, coverage differences and interval limitations. An independent external psychometric assessment has not been performed.

The historical `meanIQ` field is an inverse-normal transform of a group's mean stored percentile. The frozen snapshot retains the calculation and screening rules used on 10 October 2026. The live site's estimator and quality rules changed in November 2026.

The age files contain 109,433 screened and 334,915 all-test records. The latter includes five records outside the four named age bands: three with an empty label and two labelled `Test`. Country exports retain legacy category labels including `USA` and `USD`. The source CSVs preserve these original groups. Four-band age charts use only the screened groups.

Dimension coverage differs. Country tables include 109,302 screened / 334,266 all-test records; gender 82,024 / 261,736; education 82,053 / 261,825; study area 109,423 / 334,885. These are observed table totals, not interchangeable denominators. Missing/unsupported categories and separately cached requests can affect coverage; public aggregates alone cannot identify every cause.

## Files and charts

- `data/`: ten original CSVs, unchanged.
- [data-dictionary.md](data-dictionary.md): field definitions, scoring bases, units and limitations.
- `charts/`: seven figures, each as PNG, SVG and PDF, with separate alternative text. Age figures are available in English, French and Russian; country figures in English, Italian and Polish; screening coverage in English.
- [teaching-example.md](teaching-example.md): a worked aggregate-only exercise about spread, denominators and sample selection.
- [methodology-review.md](methodology-review.md): the completed technical review, findings and scope of the available evidence.
- `scripts/`: standalone capture, verification and chart-rendering programs in the public repository and downloadable release.

Country figures illustrate nine cohorts, ordered by country code, with screened n ≥ 200. The selection and display threshold are documented charting choices. The release supports descriptive analysis and teaching about a self-selected online cohort. Population IQ estimation and clinical assessment are outside its supported scope.

## Reproduction

From the root of the downloaded release or public dataset repository, run:

```text
node scripts/verify-dataset-release.mjs .
python scripts/render-dataset-charts.py .
```

Verification requires Node.js 22 or later and its built-in modules. Chart rendering requires Python 3 and Matplotlib. Runtime versions are recorded in `charts/runtime.json`.

Capture a new version into a **new directory**:

```text
node scripts/capture-dataset-release.mjs NEW_OUTPUT_DIRECTORY
```

A new capture contains different dates and potentially different values. Reproduction of this release uses its frozen CSVs, not a fresh download. Group scores cannot be independently recomputed from aggregates alone because the underlying percentile records are not exported.

## Licence and citation

Copyright © 2026 UniversalIQTest. The CSV files, accompanying figures, release documentation and standalone reproduction scripts distributed in this dataset release are licensed under the [Creative Commons Attribution 4.0 International licence](https://creativecommons.org/licenses/by/4.0/). See [LICENSE](LICENSE) for the full terms.

Reuse and adaptation, including commercial reuse, are permitted with appropriate attribution, a licence link and an indication of changes. Suggested attribution follows.

> UniversalIQTest (2026). *Online matrix-reasoning test performance — aggregate snapshot, 10 October 2026* (version 2026-10-10). https://github.com/SerdilMordeniz/universaliqtest-aggregate-data. CC BY 4.0. Changes: [describe any changes].

The public repository includes machine-readable citation metadata in `CITATION.cff`.

Public methods: https://www.universaliqtest.com/methodology-and-limits.

Archived version https://doi.org/10.5281/zenodo.24216588
