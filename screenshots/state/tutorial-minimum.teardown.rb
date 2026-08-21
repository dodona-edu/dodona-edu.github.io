# Undo tutorial-minimum.setup.rb: activity 445402040 back out of draft, throwaway
# zeus submission destroyed.
require 'json'

ex = Activity.find(445_402_040)
ex.update_columns(draft: false) if ex.draft?

state_file = '/tmp/dodona-docs-capture-state.json'
if File.exist?(state_file)
  state = JSON.parse(File.read(state_file))
  id = state.dig('tutorial-minimum', 'submission_id')
  Submission.find_by(id: id)&.destroy if id
  state.delete('tutorial-minimum')
  File.write(state_file, JSON.pretty_generate(state))
else
  Submission.where(user_id: 1, exercise_id: ex.id).destroy_all
end

Rails.cache.clear
puts "tutorial-minimum: torn down (draft=#{ex.reload.draft})"
