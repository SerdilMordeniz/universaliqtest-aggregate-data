# Technical methodology review

Reviewed on 14 November 2026. This review covers the frozen public aggregate snapshot captured on 10 October 2026, its historical calculation, source-file integrity, reproducible arithmetic and supporting figures.

## Capture and integrity

The ten CSVs contain 501 aggregate rows. Exact source URLs, retrieval times, response metadata, column definitions, byte lengths and SHA-256 hashes are recorded in `manifest.json`. Each file was retrieved separately from a cached public endpoint. Observation windows are all-time records available to that endpoint at capture.

The CSV bytes match all ten original capture hashes. Git attributes preserve those bytes when the public repository is checked out on Windows. Original category labels and numerical values are retained.

## Historical group statistic

The implementation in use at capture calculated the arithmetic mean of a group's stored percentiles and transformed that mean through the inverse normal distribution with location 100 and standard deviation 15. The reported group statistic is `100 + 15 × Φ⁻¹(mean stored percentile)`, rounded to one decimal place. Percentiles are clamped to the range 0.0001 through 0.9999 before transformation.

Country, education and study-area summaries use age-normalized percentiles. Age-band summaries and default gender summaries use global percentiles. Quantile columns transform the corresponding group percentile through the same score scale.

This definition was checked against the historical implementation used at capture. A November 2026 revision changed the live site's mean-score calculation and screening rules. Interpret this frozen release using its historical definitions and capture date.

The CSV aggregates contain the published score, quantiles and counts. Reconstructing the group's transformed mean from its raw inputs requires participant-level percentiles, which are outside this aggregate release.

## Interval arithmetic and interpretation

The exported approximate limits for country, gender, education and study area use `group statistic ± 1.96 × s / sqrt(n)`, where `s = round((p75 − p25) / 1.349, 1)`. The sample size is `validatedN` for the screened view and `allN` for the all-test view. Limits are unavailable for sample sizes at most one or nonpositive interquartile spread.

All 451 available interval calculations reproduce to numerical tolerance. All 491 exported screening rates reproduce as `100 × validatedN / allN`, rounded to one decimal place. Age CSVs provide quantiles without interval fields. Their charts display the interquartile range.

Reproducible arithmetic establishes consistency with the historical calculation. Confidence coverage for this transformed group statistic has not been established. The calculation omits selection bias, normalization uncertainty and test measurement error.

## Coverage and category findings

The public overview at capture reported 334,915 recorded tests and 109,433 quality-screened results. The age tables reconcile to those totals. Country, gender, education and study-area tables have smaller dimension-specific totals, which are listed in the README and verification report. Each analysis should identify the denominator it uses.

The all-test age export includes three records with an empty category and two with the label `Test`. Four-band age figures use the screened groups. Country exports retain legacy category labels, including `USA` and `USD`. Published CSVs preserve the source groups so later cleaning remains an explicit, reproducible analysis choice.

The screening rate describes the fraction of recorded group tests passing the site's automated rules. Records can include repeat participation. Available aggregates do not establish a count of unique individuals.

## Figure review

The seven figures were regenerated from the verified frozen CSV inputs. Counts, score positions and plotted ranges were checked against those inputs. Age figures label their bars as interquartile ranges. Country figures show each screened sample size and explain the limitations of their approximate intervals. Country selections are ordered by code and meet the stated display threshold of 200 screened records.

## Supported scope and remaining evidence

The release supports descriptive analysis of a self-selected online cohort and teaching about aggregation, spread and sample selection. Population inference, clinical assessment, test reliability and causal interpretations require additional evidence.

An independent external psychometric assessment has not been performed. Item discrimination, internal consistency, retest stability and comparisons with established assessments are outside the evidence supplied by these aggregate CSVs. Publication of the technical review makes its findings and scope available for further scrutiny.
