# State scenario: faq-annotations-content (setup)
#
# Defensive pre-clean, not a seed step: the questions/annotations/saved comments the
# annotations chain (shots 1-17) needs are created LIVE by the capture hooks
# (screenshots/hooks/faq-*.mjs), which drive the real UI the way a student/teacher
# would -- several shots (6, 7, 9) specifically need to show content mid-way through
# being saved/reused, which only makes sense if it's genuinely created in that order
# during capture, not pre-seeded.
#
# This script only guards idempotency: if a previous, interrupted pass left content
# behind, clear it before starting a fresh pass. Safe to run against an already-clean
# course (destroy_all on an empty scope is a no-op).
#
# Usage (from the dodona checkout):
#   bin/rails runner <path-to-docs-repo>/screenshots/state/faq-annotations-content.setup.rb
#
# Undo/equivalent cleanup after a pass: faq-annotations-content.teardown.rb

Question.where(course_id: 29).destroy_all
Annotation.where(course_id: 29).destroy_all
SavedAnnotation.where(course_id: 29).destroy_all
Notification.where(user_id: 5).where('id > 22').destroy_all
Rails.cache.clear

puts 'faq-annotations-content: course 29 question/annotation/saved-comment state is clean'
