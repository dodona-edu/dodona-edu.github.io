# bin/rails runner screenshots/state/course11-sections.setup.rb [nl] [empty]
#
# Groups course 11's ("Visualisation Test") series 51-54 -- renamed to
# readable names by course11-naming.setup.rb -- into two named sections:
#   Section 1 "Basics" / "Basisbegrippen"  -> series 51, 52
#   Section 2 "Loops" / "Lussen"           -> series 53, 54
#
# Section/series order is set the same way CoursesController#reorder_series
# does it: a single shared order sequence walked top to bottom, where a
# series takes the section_id of the section immediately above it in that
# sequence. Mirroring that logic (rather than picking arbitrary order
# integers) is what keeps the two sections adjacent and in the right order
# on the course page and the manage-series table.
#
# Pass "nl" for the Dutch pass (otherwise EN). Pass "empty" (any position)
# to additionally create a third, series-less section ("Advanced" /
# "Gevorderd"), needed for the admin-only empty-section shot (SEC-4). Without
# "empty", any previously-created empty section is removed again, so the
# flag can be flipped between runs without leftovers.
#
# Idempotent: safe to run repeatedly, from any starting state, in any order
# of locale/empty combinations.

locale_nl = ARGV.include?('nl')
with_empty = ARGV.include?('empty')

en_names = ['Basics', 'Loops', 'Advanced']
nl_names = ['Basisbegrippen', 'Lussen', 'Gevorderd']
target_names = locale_nl ? nl_names : en_names
other_names = locale_nl ? en_names : nl_names

course = Course.find(11)

# Reuse a section created by an earlier pass (possibly in the other locale)
# instead of creating a duplicate.
find_section = lambda do |index|
  course.sections.find_by(name: target_names[index]) ||
    course.sections.find_by(name: other_names[index]) ||
    course.sections.new(course: course)
end

section1 = find_section.call(0)
section1.name = target_names[0]
section1.save!

section2 = find_section.call(1)
section2.name = target_names[1]
section2.save!

# Same shape as the `items` the manage-series drag-and-drop sends to
# reorder_series: an ordered list of section/series markers, position is the
# index in that list, and a series inherits the section_id of the nearest
# preceding section marker.
items = [
  { type: :section, record: section1 },
  { type: :series, record: Series.find(51) },
  { type: :series, record: Series.find(52) },
  { type: :section, record: section2 },
  { type: :series, record: Series.find(53) },
  { type: :series, record: Series.find(54) }
]

Section.transaction do
  current_section_id = nil
  items.each_with_index do |item, position|
    if item[:type] == :section
      item[:record].update!(order: position)
      current_section_id = item[:record].id
    else
      item[:record].update!(order: position, section_id: current_section_id)
    end
  end
end

if with_empty
  section3 = find_section.call(2)
  section3.name = target_names[2]
  section3.order = items.size
  section3.save!
else
  course.sections.where(name: [en_names[2], nl_names[2]]).destroy_all
end

Rails.cache.clear
