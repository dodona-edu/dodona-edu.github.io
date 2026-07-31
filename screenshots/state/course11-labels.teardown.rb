# bin/rails runner screenshots/state/course11-labels.teardown.rb
#
# Removes the 5a/5b labels seeded by course11-labels.setup.rb, restoring
# course 11 to zero member labels. Idempotent (no-op if already removed).
# CourseLabel has_many :course_membership_labels, dependent: :restrict_with_error,
# so the join rows must be deleted before the labels themselves.

course = Course.find(11)
labels = CourseLabel.where(course: course, name: %w[5a 5b])
CourseMembershipLabel.where(course_label: labels).destroy_all
labels.destroy_all

Rails.cache.clear
