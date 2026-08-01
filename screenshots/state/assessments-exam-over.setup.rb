# bin/rails runner screenshots/state/assessments-exam-over.setup.rb
#
# Drives ASSESS-5 (the "Publish assessment" card on the course page): every session on
# the exam series stopped, exam_released still false. Self-sufficient -- it does not
# depend on assessments-exam-sessions having run (ASSESS-5's state list in shots.yaml is
# just [assessments-exam-series, assessments-exam-over]), so it creates its own small
# set of genuinely-started-then-stopped sessions before closing out the rest of the
# course, the same way Series#release_exam! (the real "Publish assessment" flow) closes
# any sessions still open when it runs.
#
# User 5 (Sofie, signed in for ASSESS-2) is deliberately excluded from the bulk stop, so
# an ASSESS-2 capture earlier in the same run is never affected by this scenario.
#
# Idempotent: wipes the series' exam_sessions/exam_logs first, then rebuilds.
#
# Requires assessments-exam-series.setup.rb to have run first (reads the series id from
# the shared capture state file).
#
# Undo: assessments-exam-over.teardown.rb

require 'json'

state_file = '/tmp/dodona-docs-capture-state.json'
state = File.exist?(state_file) ? JSON.parse(File.read(state_file)) : {}
series_id = state.dig('assessments-exam-series', 'series_id')
raise 'no series_id in shared state -- run assessments-exam-series.setup.rb first' unless series_id

series = Series.find(series_id)
teacher = User.find(4) # assistant

series.exam_logs.destroy_all
series.exam_sessions.destroy_all
series.update!(exam_released: false) if series.exam_released?

# A couple of students who genuinely took the assessment before it ended.
attempted = Course.find(11).course_memberships.student.where.not(user_id: 5).order(:user_id).limit(2).map(&:user)
attempted.each do |user|
  Current.set(user: user, ip: Faker::Internet.ip_v4_address, user_agent: Faker::Internet.user_agent(vendor: 'chrome')) do
    ExamSession.create!(series: series, user: user, started_at: 40.minutes.ago)
  end
end

# Stop everyone except user 5: the attempted students' open sessions, plus a "closed
# before starting" row for the rest -- exactly what Series#stop_exam_sessions! (the
# method behind both the deadline auto-stop and the real "Publish assessment" flow) does.
remaining_memberships = Course.find(11).course_memberships.student.where.not(user_id: 5)
Current.set(user: teacher, ip: Faker::Internet.ip_v4_address, user_agent: Faker::Internet.user_agent(vendor: 'edge')) do
  series.stop_exam_sessions!(stopped_by: teacher, course_memberships: remaining_memberships)
end

Rails.cache.clear
puts "assessments-exam-over: series #{series.id} phase=#{series.reload.exam_phase}"
