# bin/rails runner screenshots/state/course11-sidebar-progress.teardown.rb
#
# Undoes course11-sidebar-progress.setup.rb: removes the submissions it created
# (listed in its marker file) and the course membership if it created that too.
# Idempotent.

user = User.find(126)
course = Course.find(11)
membership_marker = Rails.root.join('tmp/docs-sidebar-progress-membership')

submissions_marker = Rails.root.join('tmp/docs-sidebar-progress-submissions')

if File.exist?(submissions_marker)
  Submission.where(id: File.read(submissions_marker).split.map(&:to_i)).destroy_all
  File.delete(submissions_marker)
end
ActivityStatus.where(user: user, series: course.series).delete_all

if File.exist?(membership_marker)
  CourseMembership.where(user: user, course: course).destroy_all
  File.delete(membership_marker)
end

Rails.cache.clear
