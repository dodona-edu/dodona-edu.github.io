Series.find(140).update!(deadline: nil)
Rails.cache.clear
