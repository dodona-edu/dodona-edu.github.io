# bin/rails runner screenshots/state/assessments-exam-sessions.setup.rb
#
# Layers a realistic mix of exam sessions on top of assessments-exam-series's exam
# series (course 11): drives ASSESS-3 (assessment overview) and ASSESS-4 (assessment
# timeline). Everything is created through the same model calls the app itself uses
# (ExamSession#create!/#stop!, not raw inserts), so the after_create_commit log
# callbacks fire exactly like a real session would:
#
#   - 2 in-progress sessions (one with a submission, so the timeline gets a "Submitted
#     solution" row)
#   - 1 stopped by a teacher (the assistant) -- "Assessment stopped" with a teacher actor
#   - 1 handed in by the student themselves -- "Assessment finalized"
#   - 1 closed before starting -- "Closed before starting" / "Assessment cancelled"
#   - 1 stopped with no Current.user set, the same way AutoCloseExamSessionsJob stops
#     sessions -- "Assessment stopped" with a System actor
#
# User 5 (Sofie, signed in for ASSESS-2) and the rest of course 11's students are left
# untouched ("Not yet started").
#
# Idempotent: wipes the series' exam_sessions/exam_logs first, then rebuilds the same
# fixed set of students every time.
#
# Requires assessments-exam-series.setup.rb to have run first (reads the series id from
# the shared capture state file).
#
# Undo: assessments-exam-sessions.teardown.rb

require 'json'

state_file = '/tmp/dodona-docs-capture-state.json'
state = File.exist?(state_file) ? JSON.parse(File.read(state_file)) : {}
series_id = state.dig('assessments-exam-series', 'series_id')
raise 'no series_id in shared state -- run assessments-exam-series.setup.rb first' unless series_id

series = Series.find(series_id)
teacher = User.find(4) # assistant ("Aster Sistant"), a course 11 administrating member

series.exam_logs.destroy_all
series.exam_sessions.destroy_all

students = Course.find(11).course_memberships.student.where.not(user_id: 5).order(:user_id).map(&:user)
in_progress1, in_progress2, stopped_by_teacher_user, handed_in_user, cancelled_user, system_stopped_user = students.first(6)

def with_actor(user, ip: Faker::Internet.ip_v4_address, user_agent: Faker::Internet.user_agent(vendor: 'chrome'))
  Current.set(user: user, ip: ip, user_agent: user_agent) { yield }
end

# In progress #1, with a submitted solution.
with_actor(in_progress1) do
  ExamSession.create!(series: series, user: in_progress1, started_at: 12.minutes.ago)
  Submission.create!(user: in_progress1, exercise: series.exercises.first, course: series.course,
                      series: series, code: "print('exam answer')\n", evaluate: false, skip_rate_limit_check: true)
end

# In progress #2, no submission yet.
with_actor(in_progress2, user_agent: Faker::Internet.user_agent(vendor: 'firefox')) do
  ExamSession.create!(series: series, user: in_progress2, started_at: 6.minutes.ago)
end

# Stopped by the teacher.
stopped_by_teacher_session = with_actor(stopped_by_teacher_user, user_agent: Faker::Internet.user_agent(vendor: 'safari')) do
  ExamSession.create!(series: series, user: stopped_by_teacher_user, started_at: 20.minutes.ago)
end
with_actor(teacher, user_agent: Faker::Internet.user_agent(vendor: 'edge')) do
  stopped_by_teacher_session.stop!(stopped_by: teacher)
end

# Handed in by the student.
handed_in_session = with_actor(handed_in_user) do
  ExamSession.create!(series: series, user: handed_in_user, started_at: 15.minutes.ago)
end
with_actor(handed_in_user) { handed_in_session.stop!(stopped_by: handed_in_user) }

# Closed before starting.
with_actor(teacher, user_agent: Faker::Internet.user_agent(vendor: 'edge')) do
  ExamSession.create!(series: series, user: cancelled_user, started_at: nil, stopped_at: 3.minutes.ago, stopped_by: teacher)
end

# System-stopped: started for real by the student, then stopped with no Current.user --
# the same as AutoCloseExamSessionsJob's `series.stop_exam_sessions!(stopped_by: nil)`.
# Gives one "System" actor row in the timeline.
system_stopped_session = with_actor(system_stopped_user) do
  ExamSession.create!(series: series, user: system_stopped_user, started_at: 25.minutes.ago)
end
system_stopped_session.stop!(stopped_by: nil)

Rails.cache.clear
puts "assessments-exam-sessions: series #{series.id} -- " \
     "in_progress=[#{in_progress1.id},#{in_progress2.id}] " \
     "stopped_by_teacher=#{stopped_by_teacher_user.id} handed_in=#{handed_in_user.id} " \
     "cancelled=#{cancelled_user.id} system_stopped=#{system_stopped_user.id}"
