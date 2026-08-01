# bin/rails runner screenshots/state/course11-sections.teardown.rb
#
# Undoes course11-sections.setup.rb (either locale pass, with or without the
# "empty" third section): destroys the sections it created and restores
# series 51-54 to their seeded order (0). `Section#series` is `dependent:
# :nullify`, so destroying the sections already clears `section_id` back to
# nil on the four series -- only `order` needs restoring by hand, since the
# setup script renumbers it to lay the sections out in sequence. Idempotent
# (a no-op section/series lookup is a no-op update).

course = Course.find(11)

section_names = ['Basics', 'Loops', 'Advanced', 'Basisbegrippen', 'Lussen', 'Gevorderd']
course.sections.where(name: section_names).destroy_all

Series.where(id: [51, 52, 53, 54]).update_all(order: 0, section_id: nil)

Rails.cache.clear
