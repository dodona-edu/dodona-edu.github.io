# bin/rails runner screenshots/state/assessments-safe-exam-browser.setup.rb [nl]
#
# Layered on top of assessments-exam-series, for the Safe Exam Browser shots ASSESS-6/7
# in guides/teachers/assessments (en+nl). Requires Safe Exam Browser on that exam series,
# with a fixed quit password and a stored configuration file, so the series form shows
# the whole Safe Exam Browser section and the student's start card shows its notice.
# Only "Restrict Dodona to assessment content" stays on next to it (the guide asks for it
# with Safe Exam Browser); the password and auto-stop go off, so Safe Exam Browser stands
# out in both shots.
#
# The Safe Exam Browser rows on the series form only appear for teachers with the
# `safe_exam_browser` Flipper flag (in beta since 2026-11); the development seeds enable
# it for zeus (user 1), and this script makes sure it is on.
#
# Pass "nl" as the first argument for the Dutch pass (locale-appropriate file name).
# Idempotent: re-running updates the same series and config in place.
#
# Undo: assessments-safe-exam-browser.teardown.rb, or assessments-exam-series.teardown.rb,
# which destroys the series together with its config.

require 'json'

locale_nl = ARGV.first == 'nl'

state_file = '/tmp/dodona-docs-capture-state.json'
state = File.exist?(state_file) ? JSON.parse(File.read(state_file)) : {}
series_id = state.dig('assessments-exam-series', 'series_id')
abort 'assessments-safe-exam-browser: run assessments-exam-series.setup.rb first' unless series_id

Flipper.enable_actor(:safe_exam_browser, User.find(1))

series = Series.find(series_id)
series.update!(exam_safe_exam_browser: true, activity_access: :open, exam_lockdown_mode: true, exam_auto_close: false)
series.safe_exam_browser_config.update!(
  quit_password: 'tR4k-mWp',
  upload_xml: Seb::Plist.generate({ 'URLFilterEnable' => true, 'allowSpellCheck' => false }),
  upload_filename: locale_nl ? 'toets-instellingen.seb' : 'exam-settings.seb'
)

Rails.cache.clear
puts "assessments-safe-exam-browser: series id=#{series.id} requires Safe Exam Browser"
