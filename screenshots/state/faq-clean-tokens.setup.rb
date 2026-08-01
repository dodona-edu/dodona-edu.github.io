# State scenario: faq-clean-tokens (setup)
#
# The token shots (create-new-token, token-generated) type a "pycharm" token through
# the real UI. A stray token from an earlier or interrupted pass leaks into the next
# capture (this happened in the 2026-07 run: the NL "before" shot showed the EN
# pass's leftover row). Purge every non-seeded token before shooting; the teardown
# runs the same purge to leave only the seeded rows behind.
ApiToken.where.not("description LIKE 'Seeded token%'").destroy_all
Rails.cache.clear
puts "non-seeded API tokens purged; #{ApiToken.count} seeded rows remain"
