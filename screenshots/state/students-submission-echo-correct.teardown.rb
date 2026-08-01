# Scoped to submissions created in the last hour so this can never touch the seeded
# submission #1347 (also on Echo/course 29/student 5) that D14a-c/D15 depend on.
Submission.where(exercise_id: 347592237, course_id: 29, user_id: 5)
          .where('created_at > ?', 1.hour.ago)
          .where.not(id: 1347)
          .destroy_all

# ActivityStatus#last_submission_id / #best_submission_id are plain belongs_to columns
# with no DB foreign key and no destroy callback on Submission -- destroying the
# throwaway submission above leaves them pointing at a now-deleted row (verified live:
# they silently keep the destroyed id, so the row's accepted/solved booleans stay frozen
# at whatever the throwaway submission last set them to, e.g. "not yet solved" for a
# student who really has a correct #1347). Recompute so the real seeded submission is
# reflected again on the course/homepage/recent-exercises views.
Activity.find(347592237).refresh_activity_statuses_for(User.find(5), Course.find(29))
Rails.cache.clear
