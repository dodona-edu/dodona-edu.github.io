# bin/rails runner screenshots/state/assessments-exam-series.setup.rb [nl]
#
# Base state for the ASSESS-1..5 shots in guides/teachers/assessments (en+nl). Creates a
# single exam-kind series on course 11 with a password, lockdown mode and auto-close
# enabled, a future deadline, and two activities. No sessions yet:
# assessments-exam-sessions/-over layer those on top separately, against the same series.
#
# Pass "nl" as the first argument for the Dutch pass (locale-appropriate series name),
# otherwise EN is used -- same convention as course11-naming.setup.rb.
#
# The series id isn't known ahead of time (a fresh row on this dev instance, and
# assessments-exam-series.teardown.rb destroys it again at the end of the capture chunk,
# so it isn't a stable fixture like series 51-54/140/141/52 either). It's written to the
# shared capture state file the same way students-submission-echo-correct.setup.rb does;
# hooks/assessments.mjs reads it to build the real per-shot URLs and crop selectors
# (shots.yaml only carries a stable placeholder URL/selector with a `{seriesId}` token).
#
# Idempotent: re-running updates the same series row in place instead of creating a
# second one, and always resets it to the "no sessions" baseline first, so a stale
# assessments-exam-sessions/-over run can't leak into a plain
# assessments-exam-series capture.
#
# Undo: assessments-exam-series.teardown.rb (destroys the series -- also clears any
# sessions/logs left by assessments-exam-sessions/-over if their own teardown wasn't run
# first).

require 'json'

locale_nl = ARGV.first == 'nl'

state_file = '/tmp/dodona-docs-capture-state.json'
state = File.exist?(state_file) ? JSON.parse(File.read(state_file)) : {}
state['assessments-exam-series'] ||= {}

course = Course.find(11)
series = course.series.find_or_initialize_by(kind: :exam)
series.update!(
  name: locale_nl ? 'Toets lussen' : 'Loops assessment',
  description: '',
  deadline: 1.week.from_now.change(min: 0),
  visibility: :open,
  activity_access: :password,
  exam_lockdown_mode: true,
  exam_auto_close: true,
  exam_released: false
)

# Reset to the "no sessions" baseline on every run.
series.exam_logs.destroy_all
series.exam_sessions.destroy_all

# Two activities, from the repositories already usable on course 11 (verified live:
# course 11's usable_repositories are #1 "Example Python Activities" and #2 "A lot of
# python activities" -- no extra CourseRepository grant needed, unlike course 29).
# The seed of November 2026 gives activities random ids, so fall back to the first two
# exercises of those repositories when the original ids don't exist.
exercises = Exercise.where(id: [9_328_740, 14_589_228]).to_a
exercises = Exercise.where(repository_id: [1, 2]).order(:id).limit(2).to_a if exercises.size < 2
exercises.each do |exercise|
  next if series.exercises.include?(exercise)

  series.exercises << exercise
end
series.series_memberships.find_each { |sm| AddActivityStatusesJob.perform_now(sm) }

state['assessments-exam-series'].merge!('series_id' => series.id, 'locale' => (locale_nl ? 'nl' : 'en'))
File.write(state_file, JSON.pretty_generate(state))

Rails.cache.clear
puts "assessments-exam-series: series id=#{series.id} name='#{series.name}'"
