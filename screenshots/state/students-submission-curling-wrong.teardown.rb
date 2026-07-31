# Never touches the seeded #1352/#1353 pair.
Submission.where(exercise_id: 369972474, course_id: 29, user_id: 5)
          .where('created_at > ?', 1.hour.ago)
          .where.not(id: [1352, 1353])
          .destroy_all
Rails.cache.clear
