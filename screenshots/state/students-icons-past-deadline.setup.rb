# Stage F: briefly move series 140/141's deadlines into the past so the deadline-met
# (mdi-alarm-check) / deadline-missed (mdi-alarm-off) course-status icon crops render
# (_user_status_icon.html.erb only takes the alarm branch once `series.deadline.past?`).
#
# CORRECTED from the original single-series version: series 140 ("Variables and types")
# has all 4 exercises accepted for student 5 -- verified live, every row there resolves
# to accepted_before_deadline_for? => true once past-deadline, so it can only ever render
# alarm-check, never alarm-off. Series 141 ("Conditions") has a genuine mix (ISBN/Counter
# accepted, Manhattan/Curling not), so both series need the deadline flip to get both
# icons out of one capture pass. Series#after_save :refresh_activity_statuses (triggered
# by saved_change_to_deadline?) recomputes ActivityStatus#accepted_before_deadline for
# every activity in the series synchronously, so no separate recompute step is needed.
Series.find(140).update!(deadline: 1.day.ago)
Series.find(141).update!(deadline: 1.day.ago)
Rails.cache.clear
