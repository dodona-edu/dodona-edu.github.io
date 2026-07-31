# Course 29 ("Programming 1") has no repository access grants in the seeds, so no
# student can open any of its activity pages through the UI (the seeded submissions
# were inserted directly). Every capture that submits or views an exercise in course
# 29 (FAQ annotations chain, students stages D/E) needs this grant.
CourseRepository.find_or_create_by!(course_id: 29, repository_id: 2)
Rails.cache.clear
puts "course 29 -> repository 2 grant present"
