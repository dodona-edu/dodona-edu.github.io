s = Submission.find(1347)
s.annotations.where(annotation_text: 'You could use a loop here.').destroy_all
s.update!(annotated: false)
User.find(2).update!(first_name: 'Stijn', last_name: 'Taff')
Rails.cache.clear
