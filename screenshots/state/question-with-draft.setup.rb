# bin/rails runner screenshots/state/question-with-draft.setup.rb [nl]
#
# State for the AI-1 shot (faq/annotations, "How do AI draft answers work?"):
# a global (line_nr: nil) Question from Sofie (user 5) on Submission 557 -- an
# already-judged "correct" Python echo submission on course 11, with zero pre-existing
# annotations. That submission id is a seeded fixture, not a fresh row this scenario
# creates, so -- unlike hooks/assessments.mjs -- no dynamic-id handoff through the
# shared JSON state file is needed: shots.yaml points straight at
# /submissions/557/#code and hooks/ai-draft-answer.mjs only has to drive the
# reply-form interaction, not navigate to a not-yet-known URL. (This scenario used to
# pin submission 1206, which the seeds no longer create -- they now stop at 1156.
# The guard below fails loudly if 557 moves off course 11 too.)
#
# Course 11's questions_enabled/draft_answers_enabled are both true (seeded default),
# so Question#delayed_generate_draft fires DraftResponseJob.perform_later after
# create. In development that job would only store a placeholder response
# ('<StudentAnswer>Draft response generated for development</StudentAnswer>') -- see
# app/jobs/draft_response_job.rb -- and it only runs at all if a Solid Queue worker
# happens to be live (config.active_job.queue_adapter = :solid_queue in dev; a bare
# `perform_later` from a runner script just inserts a queue row and returns). Rather
# than depend on either, this script seeds a realistic-looking LlmResponse directly
# via build_llm_response + save!, overwriting whatever the job may or may not have
# created. See app/models/llm_response.rb: `response` stores the raw
# <TANote>...</TANote><StudentAnswer>...</StudentAnswer> tagged text; only the
# <StudentAnswer> portion (LlmResponse#student_answer) is ever sent to the frontend.
#
# Pass "nl" as the first argument for the Dutch pass, otherwise EN is used -- same
# convention as course11-naming.setup.rb, which AI-1 and AI-3 also depend on and
# which should be run alongside this one for the same pass.
#
# Idempotent: destroys any Question left on submission 557 by a previous run of this
# scenario (submission 557 has zero seeded annotations of its own, so clearing all
# of its annotations is always scoped to this scenario's own leftovers) before
# creating a fresh one.
#
# Verified live: this dev instance has an actual Solid Queue worker running (not just
# the queue-adapter-inserts-a-row situation described above), so
# Question#delayed_generate_draft's DraftResponseJob genuinely executes seconds after
# create -- and its dev branch calls `question.create_llm_response(...)`, which (via
# the has_one :llm_response, dependent: :destroy association) destroys whatever
# LlmResponse this script just seeded and replaces it with the placeholder, racing
# unpredictably with the capture run afterwards. Sidestepped by flipping
# draft_answers_enabled off for the moment of creation (delayed_generate_draft
# early-returns unless the course has it enabled) so the job is never enqueued for
# this Question at all, then restoring it before this script exits.
#
# Undo: question-with-draft.teardown.rb

locale_nl = ARGV.first == 'nl'

submission = Submission.find(557) # Sofie, course 11, Python echo exercise, judged "correct"
unless submission.course_id == 11
  raise "submission 557 has moved to course #{submission.course_id}, expected course 11 -- update this scenario"
end

submission.annotations.where(type: 'Question').destroy_all

course = submission.course
course.update!(draft_answers_enabled: false)

question_text = if locale_nl
                   'Waarom blijft mijn programma wachten nadat alle invoer gelezen is?'
                 else
                   'Why does my program keep waiting after all the input has been read?'
                 end

question = Question.create!(
  submission: submission,
  user: User.find(5),
  last_updated_by: User.find(5),
  course_id: submission.course_id,
  line_nr: nil,
  annotation_text: question_text
)

ta_note = if locale_nl
            'De invoerlus controleert niet of er nog invoer is voor ze een nieuwe regel opvraagt.'
          else
            'The input loop never checks whether more input is actually available before reading again.'
          end

student_answer = if locale_nl
                    <<~NL.strip
                      Je lus roept `input()` op zonder eerst te controleren of er nog een regel is om te lezen. Zodra de invoer op is, heeft die aanroep niets meer om terug te geven en stopt je programma daar. Lees de regels met een `for regel in sys.stdin:`-lus, of vang de `EOFError` op, zodat ze stopt zodra de invoer op is.
                    NL
                  else
                    <<~EN.strip
                      Your loop calls `input()` without first checking whether there is another line to read. Once the input runs out, that call has nothing left to return and your program stops there. Read the lines with a `for line in sys.stdin:` loop, or catch the `EOFError`, so it ends as soon as the input is exhausted.
                    EN
                  end

question.build_llm_response(
  response: "<TANote>#{ta_note}</TANote>\n<StudentAnswer>\n#{student_answer}\n</StudentAnswer>"
).save!

course.update!(draft_answers_enabled: true) # course11-naming / AI-3 need this checked; it's also the seeded default

Rails.cache.clear

puts "question-with-draft: Question #{question.id} + LlmResponse #{question.llm_response.id} " \
     "on Submission 557 (locale=#{locale_nl ? 'nl' : 'en'})"
