# State scenario: home-deadlines (setup)
#
# Dresses Sofie's (user 5) homepage "Upcoming deadlines" panel
# (Home::DeadlinesComponent) for the SM-home-deadlines shot. Apply TOGETHER WITH
# students-series-deadlines, which gives course 29's "Variables and types" and
# "Conditions" a deadline 10 days out (grey "upcoming" pills). This scenario adds a
# nearer deadline in a second course so the panel shows series from two courses and
# pills in two urgency colours:
#
# Course 1 is seeded as "Visible for all course" with series "Reeks 0" -- obvious
# test scaffolding that would look wrong in the docs -- so give both a plausible
# name for the shot and a deterministic deadline 2 days out (an "urgent" red pill;
# the seeds only give this series a deadline with 10% probability, and a random
# one at that). Idempotent.
#
# Usage (from the dodona checkout):
#   bin/rails runner <path-to-docs-repo>/screenshots/state/home-deadlines.setup.rb
#
# Undo: home-deadlines.teardown.rb

Course.find(1).update!(name: 'Algorithms')
Series.find(4).update!(name: 'Recursion', deadline: 2.days.from_now.change(hour: 18))
Rails.cache.clear

puts "home-deadlines: course 1 dressed as 'Algorithms', series 4 as 'Recursion' with a deadline 2 days out"
