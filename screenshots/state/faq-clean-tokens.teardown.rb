# Same purge as the setup: the shots create a "pycharm" token through the UI, and
# only the seeded rows should survive the run.
ApiToken.where.not("description LIKE 'Seeded token%'").destroy_all
Rails.cache.clear
puts "non-seeded API tokens purged; #{ApiToken.count} seeded rows remain"
