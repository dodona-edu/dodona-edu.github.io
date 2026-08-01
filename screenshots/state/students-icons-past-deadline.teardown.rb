Series.find(140).update!(deadline: nil)
Series.find(141).update!(deadline: nil)
Rails.cache.clear
