# D14c (code-annotations-{en,nl}): a submission crafted to trigger one pyflakes/pylint
# Warning ("conditional statement with a constant value") and one Error ("Undefined
# variable 'y'"), matching the retired student.exercise_lint_error.png. Dynamic id handed
# off via the shared state file, same mechanism as students-submission-echo-wrong.
#
# Live-judges first, falls back to a hand-constructed schema-accurate result if the judge is
# unavailable -- see students-submission-echo-correct.setup.rb for why. The fallback writes
# the two machine annotations directly (top-level `annotations`, matching
# public/schemas/judge_output.json's `annotation` definition) since a from-scratch pyflakes
# run never happens when the judge itself can't start.
#
# Course 29 has no repository grants in the seeds; submissions/activity pages need
# this (see course29-repo-access.*.rb; removed only by that scenario's teardown).
CourseRepository.find_or_create_by!(course_id: 29, repository_id: 2)

require 'json'

code = <<~PY
  if True:
      print("proscribable")
  x = y + 1
PY

s = Submission.new(user: User.find(5), exercise: Activity.find(347_592_237), course: Course.find(29),
                    code: code, evaluate: false, skip_rate_limit_check: true)
s.save!

begin
  s.evaluate
  raise 'judge produced no verdict' if s.reload.status.to_s.in?(%w[queued running])
  # Machine annotations live in the result JSON (submission.result[:annotations]), not the
  # `annotations` DB association (that's human Annotation/Question records) -- check there.
  raise 'judge run did not attach any code annotations' if s.result[:annotations].blank?
rescue StandardError => e
  warn "judge run failed or produced no annotations (#{e.class}: #{e.message}); writing constructed result"
  result = {
    accepted: false,
    status: 'wrong',
    description: nil,
    groups: [
      {
        description: 'Examples',
        groups: [
          { accepted: false,
            groups: [{ accepted: false, description: { description: '$ submission', format: 'console' },
                       tests: [{ expected: "42\\n", generated: "43\\n", channel: 'stdout', accepted: false }] }] }
        ]
      }
    ],
    annotations: [
      { row: 0, type: 'warning', text: 'Conditional statement with a constant value.' },
      { row: 2, type: 'error', text: "Undefined variable 'y'" }
    ],
    messages: []
  }
  CachedFile.write(s.fs_path(:result), ActiveSupport::Gzip.compress(result.to_json.force_encoding('UTF-8')))
  s.update_columns(status: 'wrong', accepted: false, summary: nil)
  begin
    s.update_exercise_status
  rescue StandardError
    nil
  end
end

state_file = '/tmp/dodona-docs-capture-state.json'
state = File.exist?(state_file) ? JSON.parse(File.read(state_file)) : {}
state['students-submission-echo-lint'] = { 'submission_id' => s.id }
File.write(state_file, JSON.pretty_generate(state))

Rails.cache.clear
puts "students-submission-echo-lint: submission #{s.id}, status #{s.reload.status} -- verify it actually carries 1 warning + 1 error annotation before shooting"
