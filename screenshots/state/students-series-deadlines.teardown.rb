# Run only after the NL pass (Stage E) has been fully captured -- see setup.rb.
Series.find(140).update!(deadline: nil)
Series.find(141).update!(deadline: nil)
Rails.cache.clear
