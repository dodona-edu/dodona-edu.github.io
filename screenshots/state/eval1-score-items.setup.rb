# bin/rails runner screenshots/state/eval1-score-items.setup.rb [nl]
#
# Evaluation 1's score items carry seeded lorem names (excepturi/vel/officia/
# quidem/aut); the grade-overview and grading shots need readable names.
# Pass "nl" as the first argument for the Dutch pass, otherwise EN is used.
# Idempotent: safe to run repeatedly, from any starting state.

locale_nl = ARGV.first == 'nl'

names = if locale_nl
          { 1 => 'Correctheid', 2 => 'Stijl', 3 => 'Commentaar', 4 => 'Correctheid', 5 => 'Creativiteit' }
        else
          { 1 => 'Correctness', 2 => 'Style', 3 => 'Comments', 4 => 'Correctness', 5 => 'Creativity' }
        end
names.each { |id, name| ScoreItem.find(id).update!(name: name) }

Rails.cache.clear
