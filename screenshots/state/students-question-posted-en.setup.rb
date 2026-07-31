# D15b frame 3 (EN): the posted-thread still of the ask-question gif. Creates the Question
# directly rather than driving the form through the browser -- frames 1-2 (bubble, open/typed
# form) are pure UI states with no state dependency; only frame 3 needs this. Submission 1347,
# line 16 (matches the gif's frame crop, which includes line 16).
# Course 29 has no repository grants in the seeds; submissions/activity pages need
# this (see course29-repo-access.*.rb; removed only by that scenario's teardown).
CourseRepository.find_or_create_by!(course_id: 29, repository_id: 2)

s = Submission.find(1347)
Question.create!(
  submission: s,
  user: User.find(5),
  last_updated_by: User.find(5),
  course_id: s.course_id,
  line_nr: 16,
  annotation_text: 'Why do we need this line?'
)
Rails.cache.clear
