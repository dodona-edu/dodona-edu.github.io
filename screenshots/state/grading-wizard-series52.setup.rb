# bin/rails runner screenshots/state/grading-wizard-series52.setup.rb
#
# The G-2..G-6 grading shots walk the "new evaluation" wizard on series 52
# through the UI (see hooks/grading-wizard.mjs) so the wizard's own screens
# can be captured. This just guarantees series 52 starts without an
# evaluation attached (a series can only have one), so "Evaluate series"
# and the wizard render as G-1 expects. Idempotent.

Evaluation.where(series_id: 52).destroy_all

Rails.cache.clear
