# State scenario: sm-favorites (teardown)
#
# Restores course 29's CourseMembership favorite flag for Sofie (user 5) to its
# original seeded value (false). Idempotent.
#
# Usage (from the dodona checkout):
#   bin/rails runner <path-to-docs-repo>/screenshots/state/sm-favorites.teardown.rb

cm = CourseMembership.find_by!(user_id: 5, course_id: 29)
cm.update!(favorite: false)
Rails.cache.clear

puts "sm-favorites: CourseMembership(user: 5, course: 29).favorite restored to false"
