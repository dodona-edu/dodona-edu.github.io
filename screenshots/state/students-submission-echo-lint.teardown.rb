# `code` is not a real DB column (Submission#code is a virtual attribute backed by
# CachedFile, see app/models/submission.rb) -- a `.where(code: ...)` filter 500s with
# "Unknown column 'submissions.code'". Scope by recency + exclude the permanent seeded
# submissions instead, same convention as students-submission-echo-correct.teardown.rb.
Submission.where(exercise_id: 347592237, course_id: 29, user_id: 5)
          .where('created_at > ?', 1.hour.ago)
          .where.not(id: 1347)
          .destroy_all

# See students-submission-echo-correct.teardown.rb for why this recompute is needed:
# destroying the throwaway submission otherwise leaves ActivityStatus#last_submission_id /
# #best_submission_id pointing at a deleted row instead of falling back to #1347.
Activity.find(347592237).refresh_activity_statuses_for(User.find(5), Course.find(29))
Rails.cache.clear
