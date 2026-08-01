# D14d (visual-feedback-{en,nl}) FALLBACK. The default plan was to reuse the seeded wrong
# Curling submission #1353 (course 29, series 141) directly -- checked #1353 live and its one
# wrong test is an "invalid arguments" argument-count check with no graphic, so this fallback
# is what's actually used (see the capture-run report for the full trail).
#
# Live-judges first, falls back to a hand-constructed schema-accurate result if the judge is
# unavailable -- see students-submission-echo-correct.setup.rb for why (verified: Curling's
# pythia_judge fails in this dev checkout the same way Echo's does). The fallback's wrong
# testcase carries an extra `messages` entry with format "html" containing an inline SVG
# curling target -- svg/circle/etc are in the sanitizer's allow-list
# (app/helpers/application_helper.rb#sanitize_html), so it renders like a judge-drawn graphic
# would, satisfying "wrong test with diff AND the drawn graphic below it" without depending on
# the real judge's plotting library.
#
# Course 29 has no repository grants in the seeds; submissions/activity pages need
# this (see course29-repo-access.*.rb; removed only by that scenario's teardown).
CourseRepository.find_or_create_by!(course_id: 29, repository_id: 2)

require 'json'

s = Submission.new(user: User.find(5), exercise: Activity.find(369_972_474), course: Course.find(29),
                    code: 'print("wrong")', evaluate: false, skip_rate_limit_check: true)
s.save!

begin
  s.evaluate
  raise 'judge produced no verdict' if s.reload.status.to_s.in?(%w[queued running])
  raise "expected a wrong verdict, got #{s.status}" unless s.status == 'wrong'
rescue StandardError => e
  warn "judge run failed (#{e.class}: #{e.message}); writing constructed result"
  target_svg = <<~SVG.gsub(/\n\s*/, '')
    <svg viewBox="0 0 200 200" width="200" height="200" role="img" aria-label="Curling target">
      <circle cx="100" cy="100" r="90" fill="#e0455f" />
      <circle cx="100" cy="100" r="65" fill="#ffffff" />
      <circle cx="100" cy="100" r="40" fill="#3a6fb0" />
      <circle cx="100" cy="100" r="12" fill="#ffffff" />
      <circle cx="123" cy="88" r="9" fill="#c81c2e" stroke="#000000" stroke-width="1" />
      <circle cx="110" cy="115" r="9" fill="#e8c400" stroke="#000000" stroke-width="1" />
    </svg>
  SVG
  result = {
    accepted: false,
    status: 'wrong',
    description: nil,
    groups: [
      {
        description: 'Ends',
        badgeCount: 1,
        groups: [
          { accepted: false,
            groups: [{ accepted: false, description: { description: '$ submission', format: 'console' },
                       tests: [{ expected: "1\\n", generated: "0\\n", channel: 'stdout', accepted: false }],
                       messages: [{ format: 'html', permission: 'student', description: target_svg }] }] }
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
state['students-submission-curling-wrong'] = { 'submission_id' => s.id }
File.write(state_file, JSON.pretty_generate(state))

Rails.cache.clear
puts "students-submission-curling-wrong: submission #{s.id}, status #{s.reload.status} -- verify the target graphic actually renders"
