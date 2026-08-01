# State scenario: sm-favorites (setup)
#
# Marks course 29 (Programming 1) as a favourite for Sofie (user 5) so the homepage
# Favorites row (Home::FavoriteCoursesComponent) has something to show -- it renders
# with a hidden eyebrow and no cards when the user has no favourites. Idempotent.
#
# Usage (from the dodona checkout):
#   bin/rails runner <path-to-docs-repo>/screenshots/state/sm-favorites.setup.rb
#
# Undo: sm-favorites.teardown.rb

cm = CourseMembership.find_by!(user_id: 5, course_id: 29)
cm.update!(favorite: true)
Rails.cache.clear

puts "sm-favorites: CourseMembership(user: 5, course: 29).favorite set to true"
