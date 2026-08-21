# State for the exercise-creation tutorial shots (tutorial-sample-solution-submit,
# tutorial-publish-draft): the seeded "Minimum" exercise (activity 445402040, TESTed,
# sample solution solution.py) becomes a draft with one correct zeus submission, so
# /activities/445402040/ shows the draft banner with the "Publish activity." link and
# the hand-in card has a correct submission to display in place.
#
# Apply AFTER the student-stage captures: a draft exercise disappears from students'
# series tables while this is active. Teardown restores everything.
#
# The submission gets a hand-constructed, schema-accurate result (matching
# public/schemas/judge_output.json) rather than a live judge run -- same proven
# approach as students-submission-echo-correct.setup.rb; this dev checkout cannot
# reliably run judges in-process, and no verdict styling depends on the judge here.
require 'json'

ex = Activity.find(445_402_040)
ex.update_columns(draft: true) unless ex.draft?

code = <<~PY
  def minimum(a, b):
      if a < b:
          return a
      else:
          return b
PY

s = Submission.where(user_id: 1, exercise_id: ex.id).first
if s.nil?
  s = Submission.new(user: User.find(1), exercise: ex, course: nil,
                     code: code, evaluate: false, skip_rate_limit_check: true)
  s.save!
end

testcase = lambda do |expression, value|
  { accepted: true,
    groups: [{ accepted: true, description: { description: expression, format: 'code' },
               tests: [{ expected: value, generated: value, accepted: true }] }] }
end

result = {
  accepted: true,
  status: 'correct',
  description: nil,
  groups: [
    {
      description: 'Minimum',
      groups: [
        testcase.call('minimum(5, 6)', '5'),
        testcase.call('minimum(1, -6)', '-6'),
        testcase.call('minimum(0, 0)', '0')
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

state_file = '/tmp/dodona-docs-capture-state.json'
state = File.exist?(state_file) ? JSON.parse(File.read(state_file)) : {}
state['tutorial-minimum'] = { 'submission_id' => s.id }
File.write(state_file, JSON.pretty_generate(state))

Rails.cache.clear
puts "tutorial-minimum: activity #{ex.id} draft=#{ex.reload.draft}, submission #{s.id} status #{s.reload.status}"
