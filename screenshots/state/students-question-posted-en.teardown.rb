Submission.find(1347).annotations.where(type: 'Question', annotation_text: 'Why do we need this line?').destroy_all
Rails.cache.clear
