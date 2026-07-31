# State scenario: faq-cast (teardown)
#
# Restores zeus's real name after both locale passes. Idempotent.
#
# Usage (from the dodona checkout):
#   bin/rails runner <path-to-docs-repo>/screenshots/state/faq-cast.teardown.rb

zeus = User.find(1)
zeus.update!(first_name: 'Zeus', last_name: 'Kronosson')
Rails.cache.clear

puts "faq-cast: User 1 restored to '#{zeus.full_name}'"
