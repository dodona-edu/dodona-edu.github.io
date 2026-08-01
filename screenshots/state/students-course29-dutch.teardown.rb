# Run after Stage E (the NL pass, D1-D16 repeated on /nl/...) has been fully captured.
c = Course.find(29)
c.update!(name: 'Programming 1', language: 'en')
Series.find(140).update!(name: 'Variables and types')
Series.find(141).update!(name: 'Conditions')
Rails.cache.clear
