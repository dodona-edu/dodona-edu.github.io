# D14b (feedback-diff-{en,nl}): a wrong Echo submission, for the red verdict / Correctness
# badge-count / diff view. The resulting submission id is not known ahead of time, so it's
# handed to hooks/students-interact.mjs (dynamicSubmission: students-submission-echo-wrong)
# via the shared state file below, instead of being guessed into a static shot URL.
# Course 29 has no repository grants in the seeds; submissions/activity pages need
# this (see course29-repo-access.*.rb; removed only by that scenario's teardown).
CourseRepository.find_or_create_by!(course_id: 29, repository_id: 2)

require 'json'

s = Submission.create!(exercise: Activity.find(347592237), course: Course.find(29), user: User.find(5), code: 'print("wrong")')

Timeout.timeout(60) { sleep 1 while s.reload.status.in?(%w[queued running]) }
raise "expected a wrong verdict, got #{s.status}" unless s.status == 'wrong'

state_file = '/tmp/dodona-docs-capture-state.json'
state = File.exist?(state_file) ? JSON.parse(File.read(state_file)) : {}
state['students-submission-echo-wrong'] = { 'submission_id' => s.id }
File.write(state_file, JSON.pretty_generate(state))

Rails.cache.clear
puts "students-submission-echo-wrong: submission #{s.id}, status #{s.status}"
