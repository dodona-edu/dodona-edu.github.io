# Stage E: flip course 29 and its two seeded series to Dutch, so the NL pass shows genuinely
# Dutch UI/content (the activity/description language follows the COURSE language, not the
# URL locale -- cookbook note in README.md).
#
# ORDERING: run this ONLY after every Stage D (EN) shot (D1-D16, including D9-D15's
# throwaway submissions) has been captured and its own state torn down. It renames the same
# course/series the EN pass just shot under their English names -- running it early would
# make the EN pass show Dutch names.
c = Course.find(29)
c.update!(name: 'Programmeren 1', language: 'nl')
Series.find(140).update!(name: 'Variabelen en datatypes')
Series.find(141).update!(name: 'Voorwaarden')
Rails.cache.clear
