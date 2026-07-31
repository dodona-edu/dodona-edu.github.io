# D14b (feedback-diff-{en,nl}): a wrong Echo submission, for the red verdict / Correctness
# badge-count / diff view. The resulting submission id is not known ahead of time, so it's
# handed to hooks/students-interact.mjs (dynamicSubmission: students-submission-echo-wrong)
# via the shared state file below, instead of being guessed into a static shot URL.
#
# Live-judges first, falls back to a hand-constructed schema-accurate result if the judge is
# unavailable -- see students-submission-echo-correct.setup.rb for why (verified: Echo's
# pythia_judge fails in this dev checkout). The constructed test's expected/generated strings
# differ only partway through, so the frontend's char-level diff has both a matching prefix
# and a highlighted mismatch to show.
#
# Course 29 has no repository grants in the seeds; submissions/activity pages need
# this (see course29-repo-access.*.rb; removed only by that scenario's teardown).
CourseRepository.find_or_create_by!(course_id: 29, repository_id: 2)

require 'json'

s = Submission.new(user: User.find(5), exercise: Activity.find(347_592_237), course: Course.find(29),
                    code: 'print("wrong")', evaluate: false, skip_rate_limit_check: true)
s.save!

begin
  s.evaluate
  raise 'judge produced no verdict' if s.reload.status.to_s.in?(%w[queued running])
  raise "expected a wrong verdict, got #{s.status}" unless s.status == 'wrong'
rescue StandardError => e
  warn "judge run failed (#{e.class}: #{e.message}); writing constructed result"
  result = {
    accepted: false,
    status: 'wrong',
    description: nil,
    groups: [
      {
        description: 'Examples',
        badgeCount: 1,
        groups: [
          { accepted: false,
            groups: [{ accepted: false, description: { description: '$ submission', format: 'console' },
                       tests: [{ expected: "42\\n", generated: "wrong\\n", channel: 'stdout', accepted: false }] }] }
        ]
      }
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
state['students-submission-echo-wrong'] = { 'submission_id' => s.id }
File.write(state_file, JSON.pretty_generate(state))

Rails.cache.clear
puts "students-submission-echo-wrong: submission #{s.id}, status #{s.reload.status}"
