# Stage D setup (manifest-students.md Stage D preamble): give series 140 "Variables and
# types" and 141 "Conditions" (course 29) a future deadline, so the course page shows the
# green not-expired deadline story and D4's deadline-warning triangle.
#
# Scope: stays applied across BOTH the EN pass (Stage D) and the NL pass (Stage E) -- do
# NOT tear this down between passes. Only run the matching teardown.rb after Stage E's NL
# pass has been fully captured (students-course29-dutch is torn down at the same point).
Series.find(140).update!(deadline: 10.days.from_now.change(hour: 12))
Series.find(141).update!(deadline: 10.days.from_now.change(hour: 12))
Rails.cache.clear
