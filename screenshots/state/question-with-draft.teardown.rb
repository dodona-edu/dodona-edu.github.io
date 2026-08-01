# bin/rails runner screenshots/state/question-with-draft.teardown.rb
#
# Destroys the Question (and its dependent LlmResponse -- Annotation has_one
# :llm_response, dependent: :destroy) seeded on Submission 1206 by
# question-with-draft.setup.rb. Idempotent: submission 1206's id is a stable seeded
# fixture (not a dynamically-created row), so there is no shared JSON state file
# entry to clean up either -- a no-op is simply "0 Questions destroyed".

submission = Submission.find(1206)
destroyed = submission.annotations.where(type: 'Question').destroy_all
Rails.cache.clear

puts "question-with-draft: destroyed #{destroyed.size} Question(s) (+ dependent LlmResponse) on Submission 1206"
