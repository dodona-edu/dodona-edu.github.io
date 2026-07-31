# D14c (code-annotations-{en,nl}): a submission crafted to trigger one pyflakes/pylint
# Warning ("conditional statement with a constant value") and one Error ("Undefined
# variable 'y'"), matching the retired student.exercise_lint_error.png. Dynamic id handed
# off via the shared state file, same mechanism as students-submission-echo-wrong.
# Course 29 has no repository grants in the seeds; submissions/activity pages need
# this (see course29-repo-access.*.rb; removed only by that scenario's teardown).
CourseRepository.find_or_create_by!(course_id: 29, repository_id: 2)

require 'json'

code = <<~PY
  if True:
      print("proscribable")
  x = y + 1
PY

s = Submission.create!(exercise: Activity.find(347592237), course: Course.find(29), user: User.find(5), code: code)

Timeout.timeout(60) { sleep 1 while s.reload.status.in?(%w[queued running]) }

state_file = '/tmp/dodona-docs-capture-state.json'
state = File.exist?(state_file) ? JSON.parse(File.read(state_file)) : {}
state['students-submission-echo-lint'] = { 'submission_id' => s.id }
File.write(state_file, JSON.pretty_generate(state))

Rails.cache.clear
puts "students-submission-echo-lint: submission #{s.id}, status #{s.status} -- verify it actually carries 1 warning + 1 error annotation before shooting"
