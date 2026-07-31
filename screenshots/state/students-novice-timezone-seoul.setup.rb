# Stage C3: put the novice user's account timezone out of sync with their browser/OS, so
# the timezone-mismatch warning banner renders on every page.
User.find(6).update!(time_zone: 'Seoul')
Rails.cache.clear
