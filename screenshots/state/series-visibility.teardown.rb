# bin/rails runner screenshots/state/series-visibility.teardown.rb
#
# Restores series 51-53 to `open`, their seeded visibility on course 11.

[51, 52, 53].each { |id| Series.find(id).update!(visibility: :open, visibility_start: nil) }

Rails.cache.clear
