# bin/rails runner screenshots/state/series-visibility.setup.rb
#
# SS-1 (series-settings, EN only) shows the three non-default visibility
# banners at once. Gives course 11's series 51-53 the three visibilities
# in one shot: hidden, secret-link (closed), and timed (future start).
# Idempotent.

Series.find(51).update!(visibility: :hidden)
Series.find(52).update!(visibility: :closed)
Series.find(53).update!(visibility: :timed, visibility_start: 1.month.from_now)

Rails.cache.clear
