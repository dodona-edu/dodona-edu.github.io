# bin/rails runner screenshots/state/question-with-draft.setup.rb [nl]
#
# State for the AI-1/AI-2 shots (faq/annotations, "How do AI draft answers work?"):
# a global (line_nr: nil) Question from Sofie (user 5) on Submission 1206 -- an
# already-judged "correct" Java echo submission on course 11, with zero pre-existing
# annotations. That submission id is a stable seeded fixture (like series 51-54), not
# a fresh row this scenario creates, so -- unlike hooks/assessments.mjs -- no
# dynamic-id handoff through the shared JSON state file is needed: shots.yaml points
# straight at /submissions/1206/#code and hooks/ai-draft-answer.mjs only has to drive
# the reply-form interaction, not navigate to a not-yet-known URL.
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
# convention as course11-naming.setup.rb, which AI-1/AI-2/AI-3 also depend on and
# which should be run alongside this one for the same pass.
#
# Idempotent: destroys any Question left on submission 1206 by a previous run of this
# scenario (submission 1206 has zero seeded annotations of its own, so clearing all
# of its annotations is always scoped to this scenario's own leftovers) before
# creating a fresh one. rating starts at not_rated on every run -- AI-2's hook rates
# it live in the browser (a pure client-side toggle, see state/LlmResponse.ts; it does
# not PATCH the server until the reply is actually submitted, which the hook never
# does), so re-running this setup is also how to reset AI-1's "not yet rated" state if
# AI-2 was captured first in a --id-scoped rerun.
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

submission = Submission.find(1206) # Sofie, course 11, Java echo exercise, judged "correct"
unless submission.course_id == 11
  raise "submission 1206 has moved to course #{submission.course_id}, expected course 11 -- update this scenario"
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
                      Je lus roept `next()`/`nextLine()` op zonder eerst te controleren of er nog een regel is om te lezen. Zodra de invoer op is, blijft die aanroep wachten op meer invoer. Bescherm de lus met `scanner.hasNextLine()` (of controleer op EOF) zodat ze stopt zodra de invoer op is.
                    NL
                  else
                    <<~EN.strip
                      Your loop calls `next()`/`nextLine()` without first checking whether there is another line to read. Once the input runs out, that call blocks waiting for more. Guard the loop with `scanner.hasNextLine()` (or check for EOF) so it stops as soon as the input is exhausted.
                    EN
                  end

question.build_llm_response(
  response: "<TANote>#{ta_note}</TANote>\n<StudentAnswer>\n#{student_answer}\n</StudentAnswer>",
  rating: :not_rated,
  comment: nil
).save!

course.update!(draft_answers_enabled: true) # course11-naming / AI-3 need this checked; it's also the seeded default

Rails.cache.clear

puts "question-with-draft: Question #{question.id} + LlmResponse #{question.llm_response.id} " \
     "on Submission 1206 (locale=#{locale_nl ? 'nl' : 'en'})"
