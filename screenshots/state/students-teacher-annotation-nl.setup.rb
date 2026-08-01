# D15 (NL pass, Stage E): Dutch variant of students-teacher-annotation-en. Apply only after
# that EN scenario's teardown has run (same submission, same line -- one annotation at a time).
User.find(2).update!(first_name: 'Je', last_name: 'leraar')

s = Submission.find(1347)
Annotation.create!(
  submission: s,
  user: User.find(2),
  last_updated_by: User.find(2),
  course_id: s.course_id,
  line_nr: 1,
  annotation_text: 'Je zou hier beter een lus gebruiken.'
)
s.update!(annotated: true)
Rails.cache.clear
