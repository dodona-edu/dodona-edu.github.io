CourseRepository.where(course_id: 29, repository_id: [1, 2]).destroy_all
Rails.cache.clear
puts "course 29 repository grants removed"
