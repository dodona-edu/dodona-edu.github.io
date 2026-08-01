# D10 (feedback-tab-{en,nl}): a correct throwaway submission for Echo (activity 347592237,
# python, series 140) so the exercise page's Feedback tab shows a green verdict. Creates the
# submission the way the API/console would rather than driving the editor+submit button
# through the browser (the hook for this shot -- hooks/students-interact.mjs with
# clickTab: 'Feedback' -- stays a pure UI interaction). Run AFTER D1-D6.
#
# Live-judges first (Submission#evaluate, in-process, same mechanism the test suite uses).
# WHEN THE JUDGE IS UNAVAILABLE -- verified live: Echo's pythia_judge fails in this dev
# checkout regardless of Docker being up (`FileNotFoundError: .../resources/plan.json`, a
# pre-existing gap in this instance's judge setup, not something this capture run caused) --
# falls back to a hand-constructed, schema-accurate result (matching
# public/schemas/judge_output.json), the same proven approach as
# state/faq-annotated-submission.setup.rb. Two context cards with a stdout test each, so the
# Feedback tab shows >= 2 context cards as the shot requires.
#
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

s = Submission.new(user: User.find(5), exercise: Activity.find(347_592_237), course: Course.find(29),
                    code: code, evaluate: false, skip_rate_limit_check: true)
s.save!

begin
  s.evaluate
  raise 'judge produced no verdict' if s.reload.status.to_s.in?(%w[queued running])
  raise "expected a correct verdict, got #{s.status}" unless s.status == 'correct'
rescue StandardError => e
  warn "judge run failed (#{e.class}: #{e.message}); writing constructed result"
  result = {
    accepted: true,
    status: 'correct',
    description: nil,
    groups: [
      {
        description: 'Examples',
        groups: [
          { accepted: true,
            groups: [{ accepted: true, description: { description: '$ submission', format: 'console' },
                       tests: [{ expected: "42\\n", generated: "42\\n", channel: 'stdout', accepted: true }] }] },
          { accepted: true,
            groups: [{ accepted: true, description: { description: '$ submission', format: 'console' },
                       tests: [{ expected: "ECHO\\n", generated: "ECHO\\n", channel: 'stdout', accepted: true }] }] }
        ]
      }
    ],
    messages: []
  }
  CachedFile.write(s.fs_path(:result), ActiveSupport::Gzip.compress(result.to_json.force_encoding('UTF-8')))
  s.update_columns(status: 'correct', accepted: true, summary: nil)
  begin
    s.update_exercise_status
  rescue StandardError
    nil
  end
end

state_file = '/tmp/dodona-docs-capture-state.json'
state = File.exist?(state_file) ? JSON.parse(File.read(state_file)) : {}
state['students-submission-echo-correct'] = { 'submission_id' => s.id }
File.write(state_file, JSON.pretty_generate(state))

Rails.cache.clear
puts "students-submission-echo-correct: submission #{s.id}, status #{s.reload.status}"
