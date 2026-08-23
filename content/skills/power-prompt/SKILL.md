---
name: power-prompt
description: Builds a comprehensive, portable, production-grade prompt (a "power prompt") for any topic, role, tool, lesson, campaign, or workflow the user names, applying current prompt engineering standards, then keeps refreshing it as the conversation reveals more context. Use this skill whenever the user asks for a prompt, system prompt, meta-prompt, prompt template, agent instructions, or custom instructions, and whenever they say things like "write me a prompt for X", "make a power prompt", "turn this into a prompt", "improve this prompt", or "give me something I can paste into another model". Also use it when the user describes a repeatable task they clearly intend to hand off to an LLM, even if they never use the word "prompt".
---

# Power Prompt

Produce one self-contained prompt that a user can paste into any capable model and get a strong, repeatable result on the first attempt.

The deliverable is the prompt itself, delivered inline in a single fenced code block so it can be copied in one tap. Never a file, never an artifact, never prose describing what a good prompt would look like.

## Operating principles

- **Comprehensive**: cover role, context, task, method, output shape, constraints, and failure handling. A gap in the prompt becomes a guess by the model that runs it.
- **Directive**: imperative voice, professional register, zero hedging.
- **Efficient**: every line must change the receiving model's behavior. The best prompt is the one that hits the goal reliably with the minimum necessary structure, not the longest one.
- **Curious**: ask when a missing detail would change the structure of the prompt, assume when it would only change a detail.
- **Accurate**: never invent domain facts, figures, versions, or product behavior. Unknowns become explicit placeholders.

## Workflow

### 1. Mine the conversation first

Extract what is already available before asking anything: stack, audience, role, deadlines, constraints, tone, prior artifacts in the thread, anything stated earlier in the session. Asking for something already on the table is the fastest way to feel unhelpful.

### 2. Ask only what changes the shape

Ask at most three questions, and only when the answer would restructure the prompt. Audience, deliverable format, scope boundary, and hard constraints usually qualify. Cosmetic preferences do not, since they can be assumed and corrected in one line later.

When an interactive option tool is available, use it with 2 to 4 short mutually exclusive options rather than prose questions. Tapping beats typing.

If nothing structural is missing, skip this step and build.

### 3. Declare assumptions instead of stalling

- A value the user must supply becomes a placeholder in `{{DOUBLE_BRACES}}`.
- A judgment call becomes a stated assumption, listed in one short line under the code block, so the user can overturn it in a sentence.

Never block delivery on a detail that can be assumed.

### 4. Select techniques deliberately

Apply the techniques the task actually needs. Stacking every technique into one prompt degrades it.

| Need | Technique |
| --- | --- |
| Any prompt at all | Explicit instructions, stated audience, stated purpose |
| Non-obvious output shape | A skeleton of the format, or one worked example |
| Tone or style that is hard to describe | One example first, more only if one fails |
| Analytical or multi-factor task | Guided reasoning stages before the answer |
| Strict machine-readable output | Format spec plus an opening-token instruction |
| High hallucination risk | Explicit permission to say the data is insufficient |
| Genuinely multi-stage work | Split into chained prompts, one job each |

Details that matter:

- **State the why, not just the what.** "Write for junior developers onboarding to the codebase, so they can ship a first PR without a reviewer walking them through it" outperforms "write clearly". Motivation lets the model resolve cases the rules never covered.
- **Frame instructions positively.** "Write in flowing paragraphs" beats "do not use bullet points". Negative-only rules leave the target undefined.
- **Keep the role understated and specific.** "You are a senior backend reviewer focused on correctness and security" is useful. "You are a legendary 10x wizard who never makes mistakes" narrows the model and buys nothing.
- **Use examples that model exactly the behavior you want.** Models imitate details in examples closely, including flaws.
- **Prefer clear headings and whitespace over XML scaffolding.** Modern models parse structure fine. Reach for tags only when content boundaries are genuinely ambiguous, such as long pasted documents inside the prompt, and use fenced blocks or `{{PLACEHOLDER}}` markers otherwise.
- **Put the critical instruction near the end** when the prompt carries long reference material, and the reference material before it.
- **Skip reasoning scaffolds on simple tasks.** Ordering a model to think step by step before a one-line rewrite is pure overhead.

### 5. Build to the template

Drop sections that genuinely do not apply. Never add top-level sections just to look thorough.

````markdown
# {{Prompt title}}

## Role
You are {{specific role, with the seniority and domain that matter}}.

## Objective
{{The outcome in one sentence, plus why it matters and where the output will be used.}}

## Context
{{What the model needs and cannot infer: audience and their level, stack or subject, prior decisions, environment, constraints already agreed.}}

## Inputs
{{Named inputs the user will paste or fill, each with a one-line description.}}

## Task
1. {{Ordered steps, imperative voice. Each step is an action, not a topic.}}
2. {{...}}

### Out of scope
- {{Named exclusions that prevent scope drift.}}

## Method
{{Only for analytical tasks: the reasoning stages to work through before answering, and whether that reasoning appears in the output or stays internal.}}

## Output format
{{Exact shape: sections, order, length target, format. Show a skeleton when the shape is non-obvious.}}

## Rules
- {{Hard requirements and house style, phrased as what to do.}}

## When information is missing
Ask up to {{n}} clarifying questions before producing output. If the answers are unavailable, state the assumption you are making and proceed. If the inputs are insufficient to support a conclusion, say so rather than speculating.

## Quality bar
Before responding, verify: {{2 to 4 concrete checks the model can run against its own draft.}}
````

### 6. Deliver

1. One line naming what the prompt does and its version.
2. The prompt, in a single fenced code block.
3. Assumptions and placeholders, only if any exist, as a short bullet list.
4. One closing line inviting a correction, no longer than a sentence.

No preamble about your process, no summary of the prompt after the prompt.

### 7. Maintain it as the session goes on

The skill does not end at delivery. Keep a running ledger of new signal the user drops afterward: constraints, corrections, audience details, tooling, results they report back.

Reissue when any of these happen:

- A new hard constraint, audience, format, or tool appears.
- Two or more material facts have accumulated since the last version.
- The user reports the prompt underperformed, or shows you output it produced.
- Scope shifts enough that a section is now wrong.

Do not reissue for trivia, for politeness, or more than once in a short exchange. A refresh nobody needed is noise.

Refresh format: bump the version, state the change in one line, then the full updated block. Users copy the whole thing, so never ship a diff or a partial section.

- `v1` initial build
- `v1.1`, `v1.2` refinements inside the existing structure
- `v2` structural change, sections added, removed, or reordered

Example refresh line: `v1.2, fixed the output to a three-section brief and added the Arabic-language constraint.`

## Portability

Keep the structure in plain markdown headers so the prompt runs anywhere. Avoid vendor-specific syntax, tool-call blocks, and provider-only parameters unless the user names a target model or platform, in which case adapt freely.

## Calibration

Match weight to the task. A tweet-drafting prompt that runs 400 words is a failure of judgment, and so is an agent specification compressed into six lines.

- Narrow, single-output task: roughly 150 to 300 words, sections merged.
- Standard professional workflow: roughly 300 to 600 words, full template.
- Agent, system prompt, or multi-step pipeline: 600 words and up, with explicit ordering, edge cases, and stop conditions.

## Accuracy

Placeholders are cheaper than errors. If the topic depends on current facts, versions, pricing, APIs, curricula, or regulations, either verify before baking a claim in, or write it as a placeholder for the user to fill. Never state a specific number, framework version, or product behavior on the strength of a vague memory.

## House style

- No em dashes anywhere in the prompt or the surrounding reply. Use commas, colons, or a rewritten clause.
- Professional and plain. No hype adjectives, no "world-class", no "leverage synergies".
- Imperative voice in instructions, second person for the role.
- Consistent `{{PLACEHOLDER}}` syntax throughout.

## Anti-patterns

- Explaining the prompt instead of delivering it.
- Padding with generic "be helpful and accurate" filler that changes nothing.
- Asking five questions when one would do, or asking none when the deliverable format is genuinely unknown.
- Splitting the output across several code blocks so the user has to copy three times.
- Stacking chain of thought, few-shot examples, and role play onto a task that needed one clear instruction.

## Worked examples

Each shows the request, the build decision, and the sections that carry the weight.

### Example 1: software engineering

Request: "power prompt for reviewing PRs on our Laravel API"

Decision: no structural gap, the stack and deliverable are clear, so skip questions and build heavy. The task is multi-factor, so guided reasoning stages earn their place. Severity tagging makes the output actionable, and a file and line requirement blocks vague findings.

```markdown
## Role
You are a senior backend reviewer for a Laravel API, focused on correctness, security, and maintainability.

## Objective
Review the diff below and produce findings the author can act on without a follow-up conversation. Output feeds a PR comment, so it must stand alone.

## Method
Work through the diff in four passes before writing anything: correctness and edge cases, security including authorization and input handling, data access and query behavior under load, then framework conventions.

## Output format
Group findings by severity: Blocking, Should fix, Optional. Each finding is one line: `path:line, the problem, the fix`. Close with a one-sentence verdict on merge readiness.

### Out of scope
Formatting and style handled by the linter. Do not comment on spacing, import order, or naming unless it causes a defect.

## When information is missing
If the diff lacks the context needed to judge a call, name the file you would need rather than assuming behavior.
```

### Example 2: education

Request: "power prompt for teaching a chemistry lesson on chemical equilibrium"

Decision: two structural unknowns, the learner level and the session length, and both change the output shape entirely. Ask those two, assume the rest. Accuracy matters more than usual here, so the prompt forbids invented data and requires worked steps rather than bare answers.

```markdown
## Role
You are a chemistry teacher preparing a {{DURATION}} lesson on chemical equilibrium for {{LEVEL}} students.

## Objective
Produce a teachable lesson, not a summary of the topic. The teacher should be able to deliver it with no further preparation.

## Context
Students have already covered reaction rates and stoichiometry. Common sticking points are treating equilibrium as a stopped reaction and misreading Le Chatelier's principle as a rule about amounts rather than stress and response.

## Output format
1. Learning objectives, three at most, each stated as something the student can do afterwards.
2. A hook: one everyday scenario that surfaces the misconception.
3. Core explanation in plain language, building from the dynamic nature of equilibrium to the equilibrium constant.
4. Two worked problems with every step shown, including units.
5. Three check-for-understanding questions with answers and the misconception each one targets.
6. One extension task for students who finish early.

## Rules
Define every term at first use. Use SI units throughout. Where a numerical value is needed, use realistic laboratory values and label them as illustrative rather than citing a specific source. If a value or curriculum requirement is uncertain, mark it `{{TEACHER_TO_CONFIRM}}` instead of guessing.

## Quality bar
Verify that each objective is assessed by at least one question, that every worked step is justified, and that the explanation never describes equilibrium as a reaction that has stopped.
```

### Example 3: marketing and growth

Request: "power prompt for a launch campaign for our new product"

Decision: audience and channel are the structural unknowns, ask those. Growth output is worthless without measurable framing, so the prompt requires a hypothesis and a metric per asset, and explicitly bans invented performance numbers, which is where this category of prompt usually fails.

```markdown
## Role
You are a growth marketer running launch campaigns for {{PRODUCT_CATEGORY}}.

## Objective
Produce a launch plan for {{PRODUCT}} aimed at {{AUDIENCE}} on {{CHANNELS}}, built so that each asset can be tested and measured rather than only shipped.

## Context
Positioning: {{ONE_LINE_POSITIONING}}. Primary conversion event: {{CONVERSION_EVENT}}. Budget and constraints: {{BUDGET}}. Competing alternatives the audience uses today: {{ALTERNATIVES}}.

## Task
1. State the core message and the single objection it has to overcome.
2. Map the campaign across the {{DURATION}} window: pre-launch, launch, and follow-up.
3. For each channel, draft the assets in the native format of that channel.
4. Attach to each asset the hypothesis it tests and the metric that proves or kills it.
5. Propose one A/B test for the highest-leverage asset.

## Rules
Write in the voice of the positioning line, not in marketing boilerplate. Lead with the customer problem rather than the feature list. Where a claim needs a statistic, insert `{{STAT_TO_SOURCE}}` rather than producing a number.

## Quality bar
Verify that every asset ties to the conversion event, that no asset repeats another's angle, and that the plan states what a failed launch would look like in the metrics.
```
