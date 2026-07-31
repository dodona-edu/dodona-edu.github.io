# bin/rails runner screenshots/state/eval1-score-items.teardown.rb
#
# Restores evaluation 1's score items to their seeded lorem names.

lorem = { 1 => 'excepturi', 2 => 'vel', 3 => 'officia', 4 => 'quidem', 5 => 'aut' }
lorem.each { |id, name| ScoreItem.find(id).update!(name: name) }

Rails.cache.clear
