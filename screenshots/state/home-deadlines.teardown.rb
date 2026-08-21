# State scenario: home-deadlines (teardown)
#
# Restores the seeded names of course 1 ("Visible for all course") and series 4
# ("Reeks 0") and drops the shot deadline. The seeds give this series a deadline
# only with 10% probability (and a random timestamp at that), so there is no
# canonical value to put back; no deadline is the common seeded outcome. Idempotent.
#
# Usage (from the dodona checkout):
#   bin/rails runner <path-to-docs-repo>/screenshots/state/home-deadlines.teardown.rb

Course.find(1).update!(name: 'Visible for all course')
Series.find(4).update!(name: 'Reeks 0', deadline: nil)
Rails.cache.clear

puts "home-deadlines: course 1 restored to 'Visible for all course', series 4 to 'Reeks 0' without deadline"
