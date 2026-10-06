# bin/rails runner screenshots/state/course11-sidebar-progress.setup.rb
#
# Gives the SEC-2 user (126) a mix of exercise statuses in course 11's series
# 51-54, so every segment state of the course sidebar progress bars shows up:
# solved (green check), wrong (red cross), solved earlier but latest
# submission wrong (amber exclamation mark) and not started (grey).
#
# The seeds are random, so user 126 has no submissions in course 11 and may
# not even be registered for it. The script registers them when needed and
# adds submissions before each series deadline. Submission code lives on disk,
# not in the database, so the ids of what it creates go into a marker file in
# the dodona checkout's tmp/ for the teardown. Idempotent: submissions from an
# earlier run are removed first.

user = User.find(126)
course = Course.find(11)
membership_marker = Rails.root.join('tmp/docs-sidebar-progress-membership')
submissions_marker = Rails.root.join('tmp/docs-sidebar-progress-submissions')

unless CourseMembership.exists?(user: user, course: course)
  CourseMembership.create!(user: user, course: course, status: :student)
  FileUtils.touch(membership_marker)
end

if File.exist?(submissions_marker)
  Submission.where(id: File.read(submissions_marker).split.map(&:to_i)).destroy_all
  File.delete(submissions_marker)
end
created = []

results = {
  correct: JSON.parse(Rails.root.join('db/results/correct-result.json').read, symbolize_names: true),
  wrong: JSON.parse(Rails.root.join('db/results/wrong-result.json').read, symbolize_names: true)
}

# Per series: one entry per exercise (content pages are skipped), each a list
# of results in submission order. An empty list leaves the exercise unstarted.
plan = {
  51 => [%i[correct], %i[wrong]],
  52 => [%i[correct wrong], %i[correct], []],
  53 => [%i[wrong correct], %i[wrong]],
  54 => [%i[correct], %i[correct]]
}

plan.each do |series_id, exercises|
  series = Series.find(series_id)
  start = (series.deadline || Time.zone.now) - 3.days
  series.exercises.zip(exercises).each do |exercise, statuses|
    Array(statuses).each_with_index do |status, i|
      submission = Submission.new(evaluate: false, skip_rate_limit_check: true, user: user, course: course,
                                  exercise: exercise, created_at: start + i.hours, code: "print(input())\n")
      submission.save_result(results.fetch(status))
      created << submission.id
    end
  end
end

File.write(submissions_marker, created.join("\n"))
Rails.cache.clear
