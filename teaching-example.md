# A ranking is not a population estimate

Use the frozen CSVs and the `age-spread` / `country-screening` figures for an aggregate-data lesson. There are no participant-level rows and no clinical norms. Do not simulate such rows and present them as observations.

## Exercise 1: group differences and individual spread

The screened age table reports a transformed group score of 102.1 for ages 19–35 and 98.3 for ages 36–65. The difference is **3.8 points**. Their middle 50% ranges are **92.9–113.2** and **87.8–107.5**. The overlap is **92.9–107.5**, or **14.6 points**.

Ask students to draw the two intervals and explain why a group score does not predict an individual's score. The bars are interquartile ranges, not confidence intervals; overlap alone is not a hypothesis test. These are broad cross-sectional age bands. They do not trace how one person's cognition changes over time.

## Exercise 2: choose the denominator

Portugal has **323 screened results out of 6,795 recorded tests**: `323 / 6795 × 100 = 4.75%`, displayed as **4.8%**. Poland has **2,646 out of 7,396**: `2646 / 7396 × 100 = 35.78%`, displayed as **35.8%**.

The screened country score describes the retained cohort, so its n is 323 for Portugal, not 6,795. Ask what additional information is needed to explain the difference in retention: quality-rule versions, acquisition/device composition, administration behaviour and excluded-record distributions. The public aggregates cannot answer those questions.

## Exercise 3: a narrow interval can still miss the population

Poland's transformed group statistic is **98.5**, with an exported approximate interval of **97.95–99.05**, n **2,646**. Portugal's is **100.2**, approximate interval **98.66–101.74**, n **323**. The figures reproduce these site calculations; they are not independently validated confidence intervals for population IQ.

For Poland, p25=87.9 and p75=107.4. Thus the IQR is 19.5, the implementation's rounded spread estimate is `round(19.5 / 1.349, 1) = 14.5`, and its margin is `1.96 × 14.5 / sqrt(2646) ≈ 0.5525`. This reconstructs the published interval around 98.5. It does not prove the statistical model is appropriate for the transformed mean percentile.

Ask students to list what a larger n addresses and what it does not: larger voluntary samples can reduce some sampling variability under a model while preserving selection and measurement biases. This dataset provides a concrete example of that distinction, not evidence about innate national differences.

Source files: `data/age-validated.csv` and `data/country-validated.csv`; the manifest contains URLs, capture timestamps and checksums. Methods: https://www.universaliqtest.com/methodology-and-limits.
