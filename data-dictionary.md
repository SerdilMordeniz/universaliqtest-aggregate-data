# Data dictionary

Every row is a group aggregate, not a participant. Empty cells mean unavailable; they do not mean zero. The first column identifies the group. CSVs use UTF-8 and decimal points.

| Field | Definition |
|---|---|
| countryCode | Country label/code in the source table; do not assume every all-test value is a valid ISO code without checking. |
| ageCategory; ageRange | Named band and displayed range: Youth 12–18, Young Adult 19–35, Adult 36–65, Senior 66–100. All-test exports also retain nonstandard labels. |
| gender | Supported self-reported categories in the published table: male/female. Other/missing values are not represented. |
| educationLevel; studyArea | Source categories, with normalization defined in `lib/educationStats.ts` and `lib/studyAreaStats.ts`. Availability differs from total dataset coverage. |
| n | Age CSV sample size for the selected view. |
| validatedN | Number passing automated quality rules in the group, in both country/gender/education/study views. This name is not a scientific validation claim. |
| allN | All recorded group tests, including those failing the quality rules. This includes recorded attempts/records, not verified unique people. |
| validationRate | `100 × validatedN / allN`, rounded to one decimal place. Describes quality screening coverage. |
| meanIQ | **Inverse-normal transform of the mean stored percentile**, using scale location 100 and SD 15, rounded to 0.1. It is not the arithmetic mean of individual displayed IQ scores. |
| p10; p25; p50/median; p75; p90 | Group percentiles transformed to the same score scale. `p50` is used in age CSVs; `median` in the other dimensions. |
| ciLower; ciUpper | Exported approximate limits: `meanIQ ± 1.96 × s / sqrt(n)`, with `s = round((p75−p25)/1.349, 1)`. For other dimensions, n is validatedN in screened view and allN in all view. Limits are unavailable for n ≤ 1 or nonpositive spread. Age CSVs do not contain CI fields. |
| avgTimeMs; meanTimeMs | Mean recorded total time in milliseconds; age uses `meanTimeMs`. Do not infer focused time or comparable clinical administration from this value. |
| updatedAt | Latest included record timestamp in that group; not the capture time or a fixed annual observation window. |

Check each file's exact headers in `manifest.json`; grouping-field names can differ. Country/education/study-area use age-normalized stored percentiles. Age and the default gender export use global stored percentiles. These measure different things and should not be pooled into one common ranking.

The inverse-normal transform is clamped to percentiles 0.0001–0.9999. Public aggregates do not expose each stored percentile, so the group transformation itself cannot be reconstructed from CSV quartiles. The QA script checks published intervals and internal arithmetic, not item scoring or individual records.

The approximate intervals rely on an IQR-derived spread and a square-root-n calculation around a nonlinear statistic. The release does not establish 95% coverage for that estimand. They omit selection bias, normalization uncertainty and test measurement error. Narrow intervals do not make a voluntary online cohort representative of a country's population.

Definitions checked against `lib/statisticsCsv.ts`, the five CSV route files, `lib/countryStats.ts`, `lib/ageStats.ts`, `lib/genderStats.ts`, `lib/educationStats.ts`, `lib/studyAreaStats.ts`, and the public methods page on 10 October 2026.

The historical definition used at capture was checked again on 14 November 2026. The live site revised its mean-score estimator and quality rules in November 2026. See methodology-review.md for the frozen snapshot interpretation.
