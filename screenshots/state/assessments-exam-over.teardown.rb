# bin/rails runner screenshots/state/assessments-exam-over.teardown.rb
#
# Removes the sessions/logs assessments-exam-over.setup.rb created and makes sure
# exam_released is back to false -- leaves the series itself and the exam_mode flag
# alone (assessments-exam-series owns those). Idempotent.

require 'json'

state_file = '/tmp/dodona-docs-capture-state.json'
state = File.exist?(state_file) ? JSON.parse(File.read(state_file)) : {}
series_id = state.dig('assessments-exam-series', 'series_id')
series = series_id && Series.find_by(id: series_id)

if series
  series.exam_logs.destroy_all
  series.exam_sessions.destroy_all
  series.update!(exam_released: false) if series.exam_released?
  puts "assessments-exam-over: cleared sessions/logs for series #{series.id}"
else
  puts 'assessments-exam-over: no exam series found (already torn down), nothing to clear'
end

Rails.cache.clear
