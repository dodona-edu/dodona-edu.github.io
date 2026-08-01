# bin/rails runner screenshots/state/assessments-exam-series.teardown.rb
#
# Full and final teardown for the ASSESS-1..5 chunk: destroys the exam series on course
# 11 (and any exam_sessions/exam_logs still attached to it -- run this after
# assessments-exam-sessions.teardown.rb / assessments-exam-over.teardown.rb, or it does
# their job too) and restores the exam_mode Flipper flag to whatever it was before
# assessments-exam-series.setup.rb ran (read from the shared capture state file).
# Idempotent: safe to run with no series and/or no state file present.

require 'json'

state_file = '/tmp/dodona-docs-capture-state.json'
state = File.exist?(state_file) ? JSON.parse(File.read(state_file)) : {}
own_state = state['assessments-exam-series']

series = Course.find(11).series.find_by(kind: :exam)
if series
  series.exam_logs.destroy_all
  series.exam_sessions.destroy_all
  series.destroy!
  puts "assessments-exam-series: destroyed series #{series.id}"
else
  puts 'assessments-exam-series: no exam series found on course 11, nothing to destroy'
end

zeus = User.find(1)
if own_state && own_state['flag_was_enabled'] == false
  Flipper.disable_actor(:exam_mode, zeus)
  puts 'assessments-exam-series: exam_mode flag restored to disabled for zeus'
else
  puts 'assessments-exam-series: exam_mode flag left enabled for zeus ' \
       '(was already enabled before this scenario ran, via the seeded zeus group)'
end

state.delete('assessments-exam-series')
File.write(state_file, JSON.pretty_generate(state))

Rails.cache.clear
