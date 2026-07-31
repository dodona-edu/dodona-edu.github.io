# Never touches the seeded #1352/#1353 pair.
Submission.where(exercise_id: 369972474, course_id: 29, user_id: 5)
          .where('created_at > ?', 1.hour.ago)
          .where.not(id: [1352, 1353])
          .destroy_all

# See students-submission-echo-correct.teardown.rb for why this recompute is needed:
# destroying the throwaway submission otherwise leaves ActivityStatus#last_submission_id /
# #best_submission_id pointing at a deleted row instead of falling back to the seeded pair.
Activity.find(369972474).refresh_activity_statuses_for(User.find(5), Course.find(29))
Rails.cache.clear
