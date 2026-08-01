# State scenario: faq-course-language (setup)
#
# NL PASS ONLY -- do not run this before the EN pass. Flips course 29's language to
# Dutch so its activity names/descriptions render in Dutch (ActivityPresenter#language
# follows the *course*, not the URL locale -- without this, /nl/ shots would still
# show English exercise names). Idempotent.
#
# This scenario is intentionally NOT listed in any shot's `state:` array in
# shots/faq.yaml, because capture.mjs prints required scenarios for a shot regardless
# of which --locale you're running, and applying this before the EN pass would be
# wrong. Apply it by hand between the EN and NL passes of shots 1-17 and 21.
#
# Usage (from the dodona checkout):
#   bin/rails runner <path-to-docs-repo>/screenshots/state/faq-course-language.setup.rb
#
# Undo: faq-course-language.teardown.rb

course = Course.find(29)
course.update!(language: 'nl', name: 'Programmeren 1')
Rails.cache.clear

puts "faq-course-language: Course 29 set to language=nl name='#{course.name}'"
