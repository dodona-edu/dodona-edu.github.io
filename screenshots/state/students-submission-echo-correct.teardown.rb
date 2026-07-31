# Scoped to submissions created in the last hour so this can never touch the seeded
# submission #1347 (also on Echo/course 29/student 5) that D14a-c/D15 depend on.
Submission.where(exercise_id: 347592237, course_id: 29, user_id: 5)
          .where('created_at > ?', 1.hour.ago)
          .where.not(id: 1347)
          .destroy_all
Rails.cache.clear
