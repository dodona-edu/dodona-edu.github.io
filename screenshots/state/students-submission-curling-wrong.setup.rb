# D14d (visual-feedback-{en,nl}) FALLBACK ONLY. The default plan is to reuse the seeded
# wrong Curling submission #1353 (course 29, series 141) directly -- only run this if you've
# checked #1353 live and it does NOT render the curling-target graphic.
require 'json'

s = Submission.create!(exercise: Activity.find(369972474), course: Course.find(29), user: User.find(5), code: 'print("wrong")')

Timeout.timeout(60) { sleep 1 while s.reload.status.in?(%w[queued running]) }

state_file = '/tmp/dodona-docs-capture-state.json'
state = File.exist?(state_file) ? JSON.parse(File.read(state_file)) : {}
state['students-submission-curling-wrong'] = { 'submission_id' => s.id }
File.write(state_file, JSON.pretty_generate(state))

Rails.cache.clear
puts "students-submission-curling-wrong: submission #{s.id}, status #{s.status} -- verify the target graphic actually renders"
