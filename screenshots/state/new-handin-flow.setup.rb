# Enable the new hand-in flow (single card, always-visible editor) for EVERY user,
# matching production where the new_handin_flow Flipper flag is at 100%. The dev seeds
# only enable it for the :zeus group (db/seeds.rb), so student-cast shots (user 5/6)
# would otherwise still render the retired tabbed card.
#
# Idempotent; teardown restores the seeded group-only state.
Flipper.add(:new_handin_flow)
Flipper.enable(:new_handin_flow)
puts "new-handin-flow: enabled for everyone (#{Flipper.enabled?(:new_handin_flow)})"
