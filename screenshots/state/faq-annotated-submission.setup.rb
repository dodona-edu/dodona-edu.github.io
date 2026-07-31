# State scenario: faq-annotated-submission (setup)
#
# Creates a fresh, judged ISBN submission for Sofie (user 5) on course 29's ISBN
# exercise (activity 576967365), with a deliberate Python 2 `print` statement on the
# last line so the judge returns a compilation error -- the annotations chain (shots
# 1-17) needs exactly this failure so the student question and the "Python 2 print"
# saved comment make sense together. Comments in the submitted code are translated
# for the NL pass, via FAQ_PASS (defaults to "en").
#
# Deviates from the manifest on purpose: the manifest describes submitting through the
# browser as Sofie ("not runner"), presumably so the real judge pipeline runs. This
# script uses Submission#evaluate instead, which is the exact synchronous equivalent
# the test suite itself uses (see test/runners/submission_runner_test.rb) -- it skips
# only the ActiveJob queue the web flow uses, not the judge run itself, so the result
# is genuinely judged, not faked. That makes this scriptable and idempotent rather
# than a manual browser step.
#
# REQUIRES a running Docker daemon with the exercise's judge image available locally
# (TESTed / dodona-tested) -- Submission#evaluate runs SubmissionRunner in-process,
# which launches a real container, exactly like the worker the web flow depends on.
# This has not been run/verified in this environment; if Docker isn't up, it raises.
#
# Idempotent: destroys any submission left behind by a previous, interrupted run
# (tracked via the state file below) before creating a new one. Writes the new
# submission's id to tmp/screenshots/faq-state.json, which the faq-*.mjs hooks read to
# build the submission URL (the id isn't known ahead of time, so shots/faq.yaml points
# these shots at a stable placeholder URL and lets the hook navigate to the real one).
#
# Usage (from the dodona checkout):
#   FAQ_PASS=en bin/rails runner <path-to-docs-repo>/screenshots/state/faq-annotated-submission.setup.rb
#   FAQ_PASS=nl bin/rails runner <path-to-docs-repo>/screenshots/state/faq-annotated-submission.setup.rb
#
# Undo: faq-annotated-submission.teardown.rb

require 'fileutils'
require 'json'

state_dir = Rails.root.join('tmp', 'screenshots')
state_file = state_dir.join('faq-state.json')
pass = ENV.fetch('FAQ_PASS', 'en')

if File.exist?(state_file)
  begin
    previous = JSON.parse(File.read(state_file))
    Submission.find_by(id: previous['sub'])&.destroy
  rescue JSON::ParserError
    nil
  end
end

code_en = <<~PYTHON
  # read first nine digits of an ISBN-10 code and convert them to integers
  x1 = int(input())
  x2 = int(input())
  x3 = int(input())
  x4 = int(input())
  x5 = int(input())
  x6 = int(input())
  x7 = int(input())
  x8 = int(input())
  x9 = int(input())

  # compute check digit
  x10 = (x1 + 2 * x2 + 3 * x3 + 4 * x4 + 5 * x5 + 6 * x6 + 7 * x7 + 8 * x8 + 9 * x9) % 11

  # print check digit
  print x10
PYTHON

code_nl = <<~PYTHON
  # lees de eerste negen cijfers van een ISBN-10 code en zet ze om naar integers
  x1 = int(input())
  x2 = int(input())
  x3 = int(input())
  x4 = int(input())
  x5 = int(input())
  x6 = int(input())
  x7 = int(input())
  x8 = int(input())
  x9 = int(input())

  # bereken het controlecijfer
  x10 = (x1 + 2 * x2 + 3 * x3 + 4 * x4 + 5 * x5 + 6 * x6 + 7 * x7 + 8 * x8 + 9 * x9) % 11

  # druk het controlecijfer af
  print x10
PYTHON

submission = Submission.new(
  user: User.find(5),
  exercise: Activity.find(576_967_365),
  course: Course.find(29),
  code: pass == 'nl' ? code_nl : code_en,
  evaluate: false,
  skip_rate_limit_check: true
)
submission.save!
I18n.with_locale(pass) { submission.evaluate }

FileUtils.mkdir_p(state_dir)
File.write(state_file, JSON.generate(sub: submission.id, pass: pass))

puts "faq-annotated-submission: created Submission #{submission.id} (status=#{submission.status}, pass=#{pass})"
puts "  state file written: #{state_file}"
