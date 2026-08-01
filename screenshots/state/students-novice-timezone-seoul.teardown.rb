# Restores the seeded value (README: "Your timezone is set to Brussels." on the profile page).
User.find(6).update!(time_zone: 'Brussels')
Rails.cache.clear
