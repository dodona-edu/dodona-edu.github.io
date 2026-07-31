# D15b frame 3 (NL, Stage E): Dutch variant of students-question-posted-en. Apply only after
# that EN scenario's teardown has run.
s = Submission.find(1347)
Question.create!(
  submission: s,
  user: User.find(5),
  last_updated_by: User.find(5),
  course_id: s.course_id,
  line_nr: 16,
  annotation_text: 'Waarom hebben we deze regel nodig?'
)
Rails.cache.clear
