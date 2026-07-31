code = <<~PY
  if True:
      print("proscribable")
  x = y + 1
PY

Submission.where(exercise_id: 347592237, course_id: 29, user_id: 5, code: code)
          .where('created_at > ?', 1.hour.ago)
          .destroy_all
Rails.cache.clear
