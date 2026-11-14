# Reading the UniversalIQTest aggregate data

This notebook is a worked example for the frozen 14 November 2026 dataset. It loads all ten CSVs, checks their SHA-256 hashes and the aggregate score-moments hash, reproduces the headline counts, and draws age-coverage, screening-rate and score-spread charts. Its arithmetic checks cover 482 group means and sample SDs, 474 quality-pass rates and 437 available approximate intervals.

Dataset citation: UniversalIQTest. (2026). *Online matrix-reasoning test performance: aggregate snapshot, 14 November 2026* (Version 2026-11-14) [Data set]. Zenodo. https://doi.org/10.5281/zenodo.24217581

## Run the notebook

On Kaggle, attach version 3 of `universaliqtest/universaliqtest-aggregate-snapshot-10-oct-2026`. The stable dataset URL retains its original October slug. This example checks the November manifest and hashes before analysis, and requires no internet access.

Locally, extract the November release ZIP, install Jupyter, pandas, numpy and Matplotlib, and set `UIQ_DATASET_DIR` to the extracted directory before starting Jupyter. Then open `reading-the-universaliqtest-aggregate-data.ipynb` and run all cells. The included outputs were executed before publication.

The dataset consists of self-selected online group aggregates. Its quality checks do not establish independent psychometric validation, clinical accuracy, unique participant identity or representative population coverage. The age bars show interquartile ranges, not confidence intervals. Different views have separate reference distributions. October and November totals use different counting and scoring rules.

The example and figures are licensed under CC BY 4.0, with attribution to UniversalIQTest and the dataset DOI. They supplement the frozen release without changing its ZIP, tag or checksums.
