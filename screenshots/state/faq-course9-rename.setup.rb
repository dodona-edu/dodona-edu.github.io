# State scenario: faq-course9-rename (setup)
#
# NL PASS ONLY, shot 21 (course-copy) -- per the coordinator decision for the FAQ
# manifest (open question 3): rename course 9 "Featured course" to "Uitgelichte
# cursus" for the NL capture. Same reasoning as faq-course-language for why this is
# not listed in shots/faq.yaml's `state:` array: apply it by hand only before the NL
# pass of shot 21. Idempotent.
#
# Usage (from the dodona checkout):
#   bin/rails runner <path-to-docs-repo>/screenshots/state/faq-course9-rename.setup.rb
#
# Undo: faq-course9-rename.teardown.rb

course = Course.find(9)
course.update!(name: 'Uitgelichte cursus')
Rails.cache.clear

puts "faq-course9-rename: Course 9 renamed to '#{course.name}'"
