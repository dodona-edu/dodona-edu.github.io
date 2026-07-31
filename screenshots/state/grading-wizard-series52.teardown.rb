# bin/rails runner screenshots/state/grading-wizard-series52.teardown.rb
#
# Deletes the temporary evaluation the G-2..G-6 hooks created on series 52
# while walking the wizard. Idempotent (no-op if already deleted).

Evaluation.where(series_id: 52).destroy_all

Rails.cache.clear
