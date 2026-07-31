# Stage F: briefly move series 140's deadline into the past so the deadline-met
# (mdi-alarm-check) / deadline-missed (mdi-alarm-off) course-status icon crops render
# (_user_status_icon.html.erb only takes the alarm branch once `series.deadline.past?`).
#
# Self-contained and independent of students-series-deadlines: run this AFTER that
# scenario's own teardown (deadline back to nil), as the last state change of the whole
# students batch -- Stage F is captured last precisely because it moves a deadline.
Series.find(140).update!(deadline: 1.day.ago)
Rails.cache.clear
