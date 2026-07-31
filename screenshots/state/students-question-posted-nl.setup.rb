# D15b frame 3 (NL, Stage E): Dutch variant of students-question-posted-en. Apply only after
# that EN scenario's teardown has run.
# line 1, not 16: verified live, submission #1347's code is a single line -- see the EN
# scenario's comment for the full explanation.
# Course 29 has no repository grants in the seeds; submissions/activity pages need
# this (see course29-repo-access.*.rb; removed only by that scenario's teardown).
CourseRepository.find_or_create_by!(course_id: 29, repository_id: 2)

s = Submission.find(1347)
Question.create!(
  submission: s,
  user: User.find(5),
  last_updated_by: User.find(5),
  course_id: s.course_id,
  line_nr: 1,
  annotation_text: 'Waarom hebben we deze regel nodig?'
)
Rails.cache.clear
