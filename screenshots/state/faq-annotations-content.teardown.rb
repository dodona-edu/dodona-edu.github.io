# State scenario: faq-annotations-content (teardown)
#
# Removes everything the faq-*.mjs hooks created during a capture pass: the two
# questions, ~3 teacher annotations, 2 saved annotations, and the notifications they
# generated for Sofie. Seeded notifications (ids 1-22) are left untouched. Run this
# after each pass (EN and NL), before flipping course 29's language for the next one.
#
# Usage (from the dodona checkout):
#   bin/rails runner <path-to-docs-repo>/screenshots/state/faq-annotations-content.teardown.rb

Question.where(course_id: 29).destroy_all
Annotation.where(course_id: 29).destroy_all
SavedAnnotation.where(course_id: 29).destroy_all
Notification.where(user_id: 5).where('id > 22').destroy_all
Rails.cache.clear

puts 'faq-annotations-content: course 29 question/annotation/saved-comment content removed'
