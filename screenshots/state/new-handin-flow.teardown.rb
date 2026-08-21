# Restore the seeded default: new_handin_flow enabled for the :zeus group only.
Flipper.disable(:new_handin_flow)
Flipper.enable_group(:new_handin_flow, :zeus)
puts "new-handin-flow: restored to zeus-group-only (fully enabled: #{Flipper.enabled?(:new_handin_flow)})"
