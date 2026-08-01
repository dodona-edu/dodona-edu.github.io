# D15 (EN pass): a neutral-named teacher comment on student 5's correct Echo submission
# #1347, for the code-annotations / ask-question / reply-to-comment shots (D15c). Also
# renames user 2 so no real-looking teacher name is stamped into a doc screenshot.
#
# Only D15c (question-reply) needs this; D15a/b (ask-question button, ask-question gif) do
# not depend on it. Run AFTER D1-D6 (creates visible state on course 29) and tear it down
# before applying the -nl variant (both target the same submission/line).
User.find(2).update!(first_name: 'Your', last_name: 'teacher')

s = Submission.find(1347)
Annotation.create!(
  submission: s,
  user: User.find(2),
  last_updated_by: User.find(2),
  course_id: s.course_id,
  line_nr: 1,
  annotation_text: 'You could use a loop here.'
)
s.update!(annotated: true)
Rails.cache.clear
