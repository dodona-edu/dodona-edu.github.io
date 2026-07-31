# Course 29 ("Programming 1") has no repository access grants in the seeds, so no
# student can open any of its activity pages through the UI (the seeded submissions
# were inserted directly). Every capture that submits or views an exercise in course
# 29 (FAQ annotations chain, students stages D/E) needs this grant.
#
# Repository 2: most series 140/141 activities. Repository 1: Echo (347592237) and
# Manhattan (323553657) specifically -- verified live (`Activity#repository_id`) after
# exercise-page 403'd with only repo 2 granted. Submission #1347 (used throughout D14/D15)
# is on Echo, so both grants are needed, not just repo 2.
CourseRepository.find_or_create_by!(course_id: 29, repository_id: 1)
CourseRepository.find_or_create_by!(course_id: 29, repository_id: 2)
Rails.cache.clear
puts "course 29 -> repository 1 + 2 grants present"
