# State scenario: faq-course9-rename (teardown)
#
# Restores course 9's English name after the NL pass of shot 21. Idempotent.
#
# Usage (from the dodona checkout):
#   bin/rails runner <path-to-docs-repo>/screenshots/state/faq-course9-rename.teardown.rb

course = Course.find(9)
course.update!(name: 'Featured course')
Rails.cache.clear

puts "faq-course9-rename: Course 9 restored to 'Featured course'"
