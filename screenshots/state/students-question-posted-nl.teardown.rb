Submission.find(1347).annotations.where(type: 'Question', annotation_text: 'Waarom hebben we deze regel nodig?').destroy_all
Rails.cache.clear
