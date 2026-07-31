# State scenario: faq-course-language (teardown)
#
# Restores course 29 to English after the NL pass. Idempotent.
#
# Usage (from the dodona checkout):
#   bin/rails runner <path-to-docs-repo>/screenshots/state/faq-course-language.teardown.rb

course = Course.find(29)
course.update!(language: 'en', name: 'Programming 1')
Rails.cache.clear

puts "faq-course-language: Course 29 restored to language=en name='#{course.name}'"
