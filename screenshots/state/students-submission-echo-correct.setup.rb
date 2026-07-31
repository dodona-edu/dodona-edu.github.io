# D10 (feedback-tab-{en,nl}): a correct throwaway submission for Echo (activity 347592237,
# python, series 140) so the exercise page's Feedback tab shows a green verdict. Creates the
# submission the way the API/console would rather than driving the editor+submit button
# through the browser (the hook for this shot -- hooks/students-interact.mjs with
# clickTab: 'Feedback' -- stays a pure UI interaction). Run AFTER D1-D6.
#
# NOTE: this is a best-effort stand-in for "a correct echo solution" -- if you have access to
# the exercise repo, prefer pasting its real solution.py instead of this loop.
#
# The exercise page itself is the shot's URL (no dynamic-id handoff needed): loading
# /en/courses/29/series/140/activities/347592237/ as student 5 shows the latest submission's
# tabs directly.
# Course 29 has no repository grants in the seeds; submissions/activity pages need
# this (see course29-repo-access.*.rb; removed only by that scenario's teardown).
CourseRepository.find_or_create_by!(course_id: 29, repository_id: 2)

require 'json'

code = <<~PY
  while True:
      try:
          print(input())
      except EOFError:
          break
PY

s = Submission.create!(exercise: Activity.find(347592237), course: Course.find(29), user: User.find(5), code: code)

Timeout.timeout(60) { sleep 1 while s.reload.status.in?(%w[queued running]) }
raise "expected a correct verdict, got #{s.status}" unless s.status == 'correct'

state_file = '/tmp/dodona-docs-capture-state.json'
state = File.exist?(state_file) ? JSON.parse(File.read(state_file)) : {}
state['students-submission-echo-correct'] = { 'submission_id' => s.id }
File.write(state_file, JSON.pretty_generate(state))

Rails.cache.clear
puts "students-submission-echo-correct: submission #{s.id}, status #{s.status}"
