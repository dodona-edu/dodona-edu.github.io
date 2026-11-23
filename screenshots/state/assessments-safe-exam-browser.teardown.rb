# bin/rails runner screenshots/state/assessments-safe-exam-browser.teardown.rb
#
# Undoes assessments-safe-exam-browser.setup.rb: the exam series no longer requires Safe
# Exam Browser and loses its config. The Flipper flag stays on for zeus, as the
# development seeds set it. assessments-exam-series.teardown.rb destroys the whole series
# afterwards anyway.
# Idempotent: safe to run with no series and/or no state file present.

require 'json'

state_file = '/tmp/dodona-docs-capture-state.json'
state = File.exist?(state_file) ? JSON.parse(File.read(state_file)) : {}
series = Series.find_by(id: state.dig('assessments-exam-series', 'series_id'))

if series
  series.safe_exam_browser_config&.destroy!
  series.update!(exam_safe_exam_browser: false)
  puts "assessments-safe-exam-browser: series #{series.id} no longer requires Safe Exam Browser"
else
  puts 'assessments-safe-exam-browser: no exam series found, nothing to undo'
end

Rails.cache.clear
