s = Submission.find(1347)
s.annotations.where(annotation_text: 'Je zou hier beter een lus gebruiken.').destroy_all
s.update!(annotated: false)
User.find(2).update!(first_name: 'Stijn', last_name: 'Taff')
Rails.cache.clear
