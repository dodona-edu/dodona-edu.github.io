# State scenario: faq-cast (setup)
#
# Sets user 1's first/last name to a neutral placeholder so annotation screenshots
# show "Your teacher" / "Je leraar" instead of a real person's name. The value
# depends on which locale pass is about to be shot, via FAQ_PASS (defaults to "en").
# Idempotent: safe to re-run, including with the same pass twice.
#
# Usage (from the dodona checkout):
#   FAQ_PASS=en bin/rails runner <path-to-docs-repo>/screenshots/state/faq-cast.setup.rb
#   FAQ_PASS=nl bin/rails runner <path-to-docs-repo>/screenshots/state/faq-cast.setup.rb
#
# Undo: faq-cast.teardown.rb (restores the original name, not pass-dependent).

pass = ENV.fetch('FAQ_PASS', 'en')
first_name, last_name = pass == 'nl' ? %w[Je leraar] : %w[Your teacher]

user = User.find(1)
user.update!(first_name: first_name, last_name: last_name)
Rails.cache.clear

puts "faq-cast: User 1 name set to '#{user.full_name}' (pass=#{pass})"
