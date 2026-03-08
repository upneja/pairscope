# Pairscope Email Templates

Three email templates for the Pairscope lifecycle. All emails use plain, warm language. No heavy HTML — these should feel like they're from a person, not a brand.

---

## Template 1: Report Delivery

**Trigger:** User enters email to save their report after viewing it.

**From:** Pairscope <hello@pairscope.com>
**Subject line options (A/B test):**
- Your Pairscope Report Is Saved
- Your Relationship Health Report
- Here's what we found

---

**Body:**

```
Hi there,

Your Pairscope report is saved. You can access it anytime here:

[View My Report →] {{report_url}}

A few things worth knowing:

1. **Your report is yours.** Bookmark the link above or save this email. We won't spam you.

2. **Revisit it in a week.** Reports like this tend to land differently after you've had time to sit with the insights. Patterns you glossed over the first time often stand out on a second read.

3. **Share what resonates.** Each section of your report has a share button that creates a card you can send to a friend, partner, or post on social. The best conversations start with "I just learned something about myself."

4. **Retake in 90 days.** Relationships change. Your patterns evolve. We'll send you a reminder in 3 months to retake the assessment and see what's shifted. (You can opt out anytime.)

If you're in a relationship and want the fuller picture, consider inviting your partner to take their own assessment independently:

[Invite Your Partner →] {{partner_invite_url}}

Thanks for spending 10 minutes on something that matters.

— The Pairscope Team

---

Pairscope is an educational self-awareness tool, not a substitute for therapy or clinical diagnosis.
If you need professional support: https://www.psychologytoday.com/us/therapists

Unsubscribe: {{unsubscribe_url}}
```

---

## Template 2: 90-Day Retake Reminder

**Trigger:** 90 days after the user's last completed assessment.

**From:** Pairscope <hello@pairscope.com>
**Subject line options (A/B test):**
- It's been 90 days. What's changed?
- Time for a relationship check-in
- Your relationship has evolved. Has your report?

---

**Body:**

```
Hi there,

Three months ago, you took the Pairscope assessment.

A lot can change in 90 days — new conversations, new patterns, sometimes new relationships entirely. Your report from {{original_date}} captured a snapshot. Here's the question: does it still feel accurate?

Retaking the assessment gives you two things:

1. **A fresh diagnostic.** See where your conflict patterns, attachment dynamics, and emotional bank account stand today.

2. **A point of comparison.** Growth is hard to notice in real time. Seeing your results side by side makes the progress (or the stagnation) visible.

It takes 10 minutes.

[Retake the Assessment →] {{assessment_url}}

Your previous report is still available here: {{previous_report_url}}

— The Pairscope Team

---

Pairscope is an educational self-awareness tool, not a substitute for therapy or clinical diagnosis.

Unsubscribe: {{unsubscribe_url}}
```

---

## Template 3: Partner Invite

**Trigger:** User clicks "Invite Your Partner" from their report page or the report delivery email.

**From:** Pairscope <hello@pairscope.com>
**Subject line options (A/B test):**
- Someone wants you to try this
- A 10-minute relationship experiment
- {{sender_name}} thinks you'd find this interesting

---

**Body:**

```
Hi,

Someone who cares about your relationship thought you'd find this valuable.

Pairscope is a free, 10-minute relationship health assessment grounded in 50 years of relationship science. It's not couples therapy. It's not a compatibility quiz. It's a diagnostic — backed by Gottman's research, attachment theory, and Big Five personality science — that helps you understand how you show up as a partner.

They've already taken it. Now they're inviting you to take yours independently.

Here's what to expect:

- **~40 questions** that feel more like self-reflection than a test
- **A personalized report** with insights about your conflict style, attachment patterns, and personality dynamics
- **Specific conversation scripts** tailored to your results
- **No account required.** No cost. Your responses are private — your partner won't see your individual answers.

[Take the Assessment →] {{assessment_url}}

The most productive relationship conversations start when both people have language for what they're experiencing. This gives you that language.

— The Pairscope Team

---

Pairscope is an educational self-awareness tool, not a substitute for therapy or clinical diagnosis.

You received this email because {{sender_name_or_fallback}} invited you via Pairscope. We will not email you again unless you choose to save your own report. Learn more at pairscope.com.
```

---

## Email Design Notes

- **Format:** Primarily plain text with minimal styling. One accent-color CTA button per email. No heavy graphics.
- **Tone:** Warm, direct, respectful of the reader's time. These are not marketing blasts — they're functional emails that happen to be well-written.
- **Mobile:** All emails must render cleanly on mobile. Single-column layout. CTA buttons at least 44px tap target.
- **Unsubscribe:** Present in every email. One-click unsubscribe compliant with CAN-SPAM.
- **Sender name:** "Pairscope" not a person's name — the brand is the sender.
