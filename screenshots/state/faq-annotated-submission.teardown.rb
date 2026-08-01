# State scenario: faq-annotated-submission (teardown)
#
# Destroys the submission created by faq-annotated-submission.setup.rb and removes
# the state file the faq-*.mjs hooks read. Idempotent (no-op if the state file or the
# submission it points to is already gone).
#
# Usage (from the dodona checkout):
#   bin/rails runner <path-to-docs-repo>/screenshots/state/faq-annotated-submission.teardown.rb

require 'json'

state_file = Rails.root.join('tmp', 'screenshots', 'faq-state.json')

unless File.exist?(state_file)
  puts 'faq-annotated-submission: no state file found, nothing to tear down'
  return
end

state = JSON.parse(File.read(state_file))
submission = Submission.find_by(id: state['sub'])
if submission
  submission.destroy
  puts "faq-annotated-submission: destroyed Submission #{state['sub']}"
else
  puts "faq-annotated-submission: Submission #{state['sub']} already gone"
end

File.delete(state_file)
