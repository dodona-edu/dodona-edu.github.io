# bin/rails runner screenshots/state/course11-labels.setup.rb
#
# Course 11 has zero member labels in the seeds; the user-management shots
# (users overview, filtered users) need a Labels column with real content.
# Creates two labels and assigns them to the first 18 enrolled students.
# Idempotent: find_or_create_by! throughout, safe to run repeatedly.
#
# Note: CourseLabel#name is lowercased on save (see CourseLabel#downcase_name),
# so these render as "5a" / "5b" in the UI even though passed as "5a"/"5b" here.

course = Course.find(11)
label_5a = CourseLabel.find_or_create_by!(course: course, name: '5a')
label_5b = CourseLabel.find_or_create_by!(course: course, name: '5b')

students = course.course_memberships.student.order(:id)
students.limit(10).each { |m| CourseMembershipLabel.find_or_create_by!(course_membership: m, course_label: label_5a) }
students.offset(10).limit(8).each { |m| CourseMembershipLabel.find_or_create_by!(course_membership: m, course_label: label_5b) }

Rails.cache.clear
