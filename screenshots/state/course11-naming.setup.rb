# bin/rails runner screenshots/state/course11-naming.setup.rb [nl]
#
# Course 11 ("Visualisation Test") and its series 51-54 carry seeded lorem
# names/descriptions that spoil the teacher-guide crops. Renames them to
# readable, locale-appropriate names and blanks the series descriptions.
# Pass "nl" as the first argument for the Dutch pass, otherwise EN is used.
# Idempotent: safe to run repeatedly, from any starting state.

locale_nl = ARGV.first == 'nl'

course = Course.find(11)
course.update!(name: locale_nl ? 'Programmeren' : 'Programming')

names = if locale_nl
          { 51 => 'De basis', 52 => 'Voorwaarden', 53 => 'Lussen', 54 => 'Evaluatie' }
        else
          { 51 => 'The basics', 52 => 'Conditions', 53 => 'Loops', 54 => 'Evaluation' }
        end
names.each { |id, name| Series.find(id).update!(name: name, description: '') }

Rails.cache.clear
