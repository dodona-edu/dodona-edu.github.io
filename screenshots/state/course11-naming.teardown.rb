# bin/rails runner screenshots/state/course11-naming.teardown.rb
#
# Restores course 11 and series 51-54 to their seeded values (run after
# either the EN or the NL pass of course11-naming.setup.rb). Idempotent.

course = Course.find(11)
course.update!(name: 'Visualisation Test')

seeded = {
  51 => ['Reeks 0', 'Minus perspiciatis et. Eius excepturi soluta. Beatae iste amet. Fugiat molestiae repellendus. Qui et ea.'],
  52 => ['Reeks 1', 'Repellat culpa temporibus. Similique dolorem error. Est tenetur suscipit. Quis et excepturi. Eveniet excepturi quae.'],
  53 => ['Reeks 2', 'Repellat voluptatem est. Qui reprehenderit consequuntur. Expedita beatae vero. Corrupti dolor et. Et itaque eum.'],
  54 => ['Evaluation', 'Qui pariatur animi. Tenetur assumenda provident. In distinctio perspiciatis. Maiores ab ut. Autem voluptatibus at. Sed sit autem. Molestiae eaque quos. Rem autem consequuntur. Quisquam beatae expedita. Consequuntur ipsam facilis. Odio hic illo. Qui quae nihil. Aut vel pariatur. Quibusdam temporibus fugiat. Similique sit sed. Laboriosam sint iure. Alias repellendus at. Modi aspernatur nobis. Et illo facilis. Aliquid deserunt soluta. Non dolorem molestias. Provident omnis molestiae. Aut itaque sed. Nihil odio quis. Ut dolor eum.']
}
seeded.each { |id, (name, description)| Series.find(id).update!(name: name, description: description) }

Rails.cache.clear
