const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const html = `
<!DOCTYPE html>
<html>
<head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Inter', sans-serif;
    background: #0a0a0f;
    color: #e4e4e7;
    line-height: 1.7;
  }

  .page {
    width: 816px;
    min-height: 1056px;
    padding: 60px 60px 80px 60px;
    page-break-after: always;
    page-break-inside: avoid;
    position: relative;
    overflow: visible;
  }

  .cover {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 1056px;
    background: linear-gradient(135deg, #0a0a0f 0%, #1a1028 50%, #0a0a0f 100%);
    position: relative;
    overflow: hidden;
  }

  .cover::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%);
  }

  .cover-badge {
    background: rgba(34, 197, 94, 0.15);
    color: #22c55e;
    padding: 8px 24px;
    border-radius: 30px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 32px;
    position: relative;
  }

  .cover h1 {
    font-size: 48px;
    font-weight: 900;
    color: #fff;
    line-height: 1.1;
    margin-bottom: 16px;
    position: relative;
  }

  .cover h1 span { color: #8b5cf6; }

  .cover-sub {
    font-size: 20px;
    color: #9ca3af;
    max-width: 500px;
    margin-bottom: 40px;
    position: relative;
  }

  .cover-features {
    display: flex;
    gap: 32px;
    margin-bottom: 48px;
    position: relative;
  }

  .cover-feature {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #9ca3af;
  }

  .cover-feature .check { color: #22c55e; font-weight: 700; }

  .cover-brand {
    font-size: 14px;
    color: #6b7280;
    position: relative;
  }

  .cover-brand span { color: #8b5cf6; }

  /* Content pages */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    padding-bottom: 16px;
    border-bottom: 1px solid #1e1e2e;
  }

  .page-logo {
    font-size: 14px;
    font-weight: 700;
    color: #6b7280;
  }
  .page-logo span { color: #8b5cf6; }

  .page-number {
    font-size: 12px;
    color: #6b7280;
  }

  h2 {
    font-size: 28px;
    font-weight: 800;
    color: #fff;
    margin-bottom: 8px;
  }

  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #8b5cf6;
    margin-bottom: 12px;
    margin-top: 32px;
  }

  .intro-text {
    color: #9ca3af;
    font-size: 15px;
    margin-bottom: 24px;
    max-width: 650px;
  }

  .prompt-card {
    background: #12121a;
    border: 1px solid #1e1e2e;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 20px;
    page-break-inside: avoid;
  }

  .prompt-number {
    display: inline-block;
    background: rgba(139, 92, 246, 0.15);
    color: #8b5cf6;
    padding: 4px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 12px;
  }

  .prompt-title {
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 8px;
  }

  .prompt-desc {
    color: #9ca3af;
    font-size: 13px;
    margin-bottom: 16px;
  }

  .prompt-box {
    background: #0a0a0f;
    border: 1px solid #2a2a3a;
    border-radius: 8px;
    padding: 16px 18px;
    font-family: 'Courier New', monospace;
    font-size: 11.5px;
    color: #d4d4d8;
    line-height: 1.5;
    white-space: pre-wrap;
  }

  .cta-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 1056px;
    background: linear-gradient(135deg, #0a0a0f 0%, #1a1028 100%);
  }

  .cta-page h2 {
    font-size: 36px;
    margin-bottom: 16px;
  }

  .cta-page h2 span { color: #8b5cf6; }

  .cta-sub {
    color: #9ca3af;
    font-size: 18px;
    max-width: 500px;
    margin-bottom: 40px;
  }

  .cta-products {
    text-align: left;
    margin-bottom: 40px;
  }

  .cta-product {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 24px;
    background: rgba(255,255,255,0.05);
    border-radius: 8px;
    margin-bottom: 8px;
    font-size: 15px;
    color: #e4e4e7;
  }

  .cta-product .val {
    margin-left: auto;
    color: #6b7280;
    font-size: 13px;
  }

  .cta-bundle {
    background: rgba(139,92,246,0.15);
    border: 2px solid #8b5cf6;
    border-radius: 12px;
    padding: 24px 40px;
    margin-bottom: 24px;
  }

  .cta-bundle .price {
    font-size: 48px;
    font-weight: 900;
    color: #fff;
  }

  .cta-bundle .savings {
    color: #22c55e;
    font-size: 16px;
    font-weight: 600;
  }

  .cta-link {
    color: #8b5cf6;
    font-size: 16px;
    font-weight: 600;
  }
</style>
</head>
<body>

<!-- COVER -->
<div class="page cover">
  <div class="cover-badge">FREE DOWNLOAD</div>
  <h1>10 AI Prompts That<br>Save You <span>5 Hours</span><br>This Week</h1>
  <p class="cover-sub">Copy-paste these into ChatGPT, Claude, or Gemini and get instant results. No experience needed.</p>
  <div class="cover-features">
    <div class="cover-feature"><span class="check">&#10003;</span> Works with any AI tool</div>
    <div class="cover-feature"><span class="check">&#10003;</span> Fill-in-the-bracket templates</div>
    <div class="cover-feature"><span class="check">&#10003;</span> Instant results</div>
  </div>
  <p class="cover-brand">The<span>Profit</span>Lab</p>
</div>

<!-- PAGE 2: INTRO + PROMPT 1 -->
<div class="page">
  <div class="page-header">
    <div class="page-logo">The<span>Profit</span>Lab</div>
    <div class="page-number">2</div>
  </div>
  <h2>How to Use These Prompts</h2>
  <p class="intro-text">1. Copy the prompt exactly as written<br>2. Replace everything in [BRACKETS] with your details<br>3. Paste into ChatGPT, Claude, or Gemini<br>4. Get results in seconds that used to take hours</p>

  <div class="prompt-card">
    <div class="prompt-number">PROMPT 1</div>
    <div class="prompt-title">The One-Page Business Plan Generator</div>
    <div class="prompt-desc">Turn a vague business idea into a clear, actionable plan in 60 seconds.</div>
    <div class="prompt-box">Act as a senior business strategist with 20 years of experience. Create a one-page business plan for my [TYPE OF BUSINESS] targeting [TARGET AUDIENCE].

Include:
- Value proposition (one sentence)
- Problem we solve
- Target market (demographics + psychographics)
- Revenue model
- Top 5 KPIs to track
- 90-day action plan with weekly milestones
- Competitive advantage

Make it actionable — no fluff.</div>
  </div>
</div>

<!-- PAGE 3: PROMPT 2 -->
<div class="page">
  <div class="page-header">
    <div class="page-logo">The<span>Profit</span>Lab</div>
    <div class="page-number">3</div>
  </div>

  <div class="prompt-card">
    <div class="prompt-number">PROMPT 2</div>
    <div class="prompt-title">The Competitor Analysis Deep Dive</div>
    <div class="prompt-desc">Find gaps your competitors are missing — and exploit them.</div>
    <div class="prompt-box">Act as a competitive intelligence analyst. I run a [TYPE OF BUSINESS] in [INDUSTRY]. My top 3 competitors are [COMP 1], [COMP 2], [COMP 3].

For each, analyze:
- USP
- Pricing strategy
- Content approach
- Strengths to learn from
- Weaknesses to exploit
- Gaps they're missing

Then give me a "Blue Ocean" strategy — 3 things I can do that NONE of them are doing.</div>
  </div>

  <div class="prompt-card">
    <div class="prompt-number">PROMPT 3</div>
    <div class="prompt-title">30-Day Content Calendar Creator</div>
    <div class="prompt-desc">Generate a full month of content ideas in one sitting. The #1 most-loved prompt.</div>
    <div class="prompt-box">Act as a social media strategist. Create a 30-day content calendar for my [TYPE OF BUSINESS] on [PLATFORM].

My target audience is [AUDIENCE] and they struggle with [PAIN POINTS].

For each day, provide:
- Content type (carousel, reel, story, text post)
- Topic/hook (attention-grabbing)
- Key message (1-2 sentences)
- Call to action
- Best time to post

Mix educational (40%), entertaining (20%), promotional (20%), and personal/behind-the-scenes (20%). Include 5 viral hook formulas I can reuse.</div>
  </div>
</div>

<!-- PAGE 4: PROMPTS 4-5 -->
<div class="page">
  <div class="page-header">
    <div class="page-logo">The<span>Profit</span>Lab</div>
    <div class="page-number">4</div>
  </div>

  <div class="prompt-card">
    <div class="prompt-number">PROMPT 4</div>
    <div class="prompt-title">The Sales Page Writer</div>
    <div class="prompt-desc">Write high-converting sales copy that turns visitors into buyers.</div>
    <div class="prompt-box">Act as a direct-response copywriter who has generated $10M+ in sales. Write a high-converting sales page for my [PRODUCT/SERVICE] priced at [PRICE] for [TARGET AUDIENCE].

Use the PAS framework (Problem-Agitation-Solution). Include:
- Headline that stops scrolling
- Opening that calls out the pain
- 5 bullet points of benefits (not features)
- Social proof section
- FAQ (5 objection-handling questions)
- Urgency element
- CTA button text (3 options)

Tone: conversational, confident, zero hype.</div>
  </div>

  <div class="prompt-card">
    <div class="prompt-number">PROMPT 5</div>
    <div class="prompt-title">The Email Welcome Sequence Builder</div>
    <div class="prompt-desc">Turn new subscribers into paying customers on autopilot.</div>
    <div class="prompt-box">Act as an email marketing expert. Write a 5-email welcome sequence for my [TYPE OF BUSINESS] selling [PRODUCT] at [PRICE].

My lead magnet is [LEAD MAGNET]. My audience struggles with [PAIN POINTS].

For each email provide: Subject line (+ 2 alternatives), Preview text, Full email body, CTA.

Sequence: Email 1 (Day 0): Deliver lead magnet + quick win. Email 2 (Day 1): Pure value. Email 3 (Day 3): Story + connection. Email 4 (Day 5): Social proof + soft pitch. Email 5 (Day 7): Direct pitch + urgency.

Keep each email under 250 words. Conversational tone.</div>
  </div>
</div>

<!-- PAGE 5: PROMPTS 6-7 -->
<div class="page">
  <div class="page-header">
    <div class="page-logo">The<span>Profit</span>Lab</div>
    <div class="page-number">5</div>
  </div>

  <div class="prompt-card">
    <div class="prompt-number">PROMPT 6</div>
    <div class="prompt-title">The Customer Avatar Builder</div>
    <div class="prompt-desc">Know your ideal customer better than they know themselves.</div>
    <div class="prompt-box">Build a detailed customer avatar for my [TYPE OF BUSINESS] selling [PRODUCT/SERVICE] at [PRICE].

Include:
- Demographics (age, income, location, occupation)
- Psychographics (values, lifestyle, brands they trust)
- Pain points (go deep — what keeps them up at 3am)
- Buying behavior (triggers, objections, budget)
- Where they hang out online

Give the avatar a name and write a "day in their life" paragraph.</div>
  </div>

  <div class="prompt-card">
    <div class="prompt-number">PROMPT 7</div>
    <div class="prompt-title">The Weekly Newsletter Writer</div>
    <div class="prompt-desc">Write engaging newsletters that people actually open and read.</div>
    <div class="prompt-box">Act as a newsletter writer for a [TYPE OF BUSINESS]. Write this week's newsletter about [TOPIC].

My audience is [AUDIENCE] and they value [WHAT THEY CARE ABOUT].

Structure:
- Subject line (+ 2 alternatives for A/B testing)
- Opening hook (first 2 lines that prevent deleting)
- Main insight (the one thing they should take away)
- Actionable tip they can implement today
- Soft product mention (not salesy)
- P.S. line that drives clicks

Tone: like a smart friend sharing advice over coffee. Under 400 words.</div>
  </div>
</div>

<!-- PAGE 6: PROMPTS 8-9 -->
<div class="page">
  <div class="page-header">
    <div class="page-logo">The<span>Profit</span>Lab</div>
    <div class="page-number">6</div>
  </div>

  <div class="prompt-card">
    <div class="prompt-number">PROMPT 8</div>
    <div class="prompt-title">The TikTok/Reels Script Generator</div>
    <div class="prompt-desc">Create viral short-form video scripts that hook viewers in 2 seconds.</div>
    <div class="prompt-box">Act as a viral content strategist. Write 5 TikTok/Reels scripts for my [TYPE OF BUSINESS] targeting [AUDIENCE].

Each script should be 30-60 seconds and follow this structure:
- HOOK (first 2 seconds — stop the scroll)
- PROBLEM (relatable pain point)
- SOLUTION (your insight/tip)
- PROOF (quick result or example)
- CTA (what to do next)

Use trending formats: storytime, "3 things I wish I knew", hot takes, "stop doing X, do Y instead", myth-busting. Make them feel authentic, not scripted.</div>
  </div>

  <div class="prompt-card">
    <div class="prompt-number">PROMPT 9</div>
    <div class="prompt-title">The Revenue Stream Brainstormer</div>
    <div class="prompt-desc">Find 10 new ways to make money from your existing audience.</div>
    <div class="prompt-box">I run a [TYPE OF BUSINESS] making money through [CURRENT REVENUE STREAMS]. My audience is [AUDIENCE] and they struggle with [PAIN POINTS].

Generate 10 additional revenue streams ranked by:
- Ease of implementation (1-10)
- Revenue potential (1-10)
- Time to first dollar
- Startup cost

For each: one-sentence description, why it works for my audience, and the exact first step to launch it this week.</div>
  </div>
</div>

<!-- PAGE 7: PROMPT 10 -->
<div class="page">
  <div class="page-header">
    <div class="page-logo">The<span>Profit</span>Lab</div>
    <div class="page-number">7</div>
  </div>

  <div class="prompt-card">
    <div class="prompt-number">PROMPT 10</div>
    <div class="prompt-title">The Market Validation Quick-Test</div>
    <div class="prompt-desc">Validate any business idea in 7 days with $0 budget.</div>
    <div class="prompt-box">I have a new business idea: [DESCRIBE IN 2-3 SENTENCES]
Target audience: [WHO]
Price point: [PRICE]

Help me validate in 7 days with $0:

Day 1-2: What to research and where (specific subreddits, FB groups, competitor reviews)
Day 3-4: Create a validation experiment (landing page copy or survey)
Day 5-6: How to interpret results (go vs. no-go numbers)
Day 7: Decision framework — build, pivot, or kill?

Give me exact copy for a "smoke test" landing page.</div>
  </div>
</div>

<!-- CTA PAGE -->
<div class="page cta-page">
  <h2>Want <span>200+ More</span> Prompts?</h2>
  <p class="cta-sub">These 10 prompts are just the start. The full Profit Lab collection covers every area of business.</p>

  <div class="cta-products">
    <div class="cta-product">&#129302; The Ultimate AI Prompt Pack <span class="val">$197 value &rarr; $27</span></div>
    <div class="cta-product">&#128200; The Marketing Blueprint <span class="val">$149 value &rarr; $22</span></div>
    <div class="cta-product">&#127916; Content Creator's AI Toolkit <span class="val">$127 value &rarr; $19</span></div>
    <div class="cta-product">&#128640; Side Hustle Starter Guide <span class="val">$97 value &rarr; $14</span></div>
    <div class="cta-product">&#9889; The Productivity System <span class="val">$97 value &rarr; $14</span></div>
  </div>

  <div class="cta-bundle">
    <div class="savings">BUNDLE ALL 5 &mdash; SAVE 90%</div>
    <div class="price">$67</div>
    <div class="savings">$667 value &bull; Instant download &bull; Lifetime access</div>
  </div>

  <p class="cta-link">theprofitlabco.gumroad.com</p>
  <br>
  <p class="cover-brand" style="margin-top: 40px;">The<span>Profit</span>Lab</p>
  <p style="color: #6b7280; font-size: 12px; margin-top: 8px;">Digital tools that make you money. No fluff. Just profit.</p>
</div>

</body>
</html>`;

  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: path.join(__dirname, 'pdfs', '10-Free-AI-Prompts.pdf'),
    width: '816px',
    height: '1056px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  console.log('Lead magnet PDF generated: pdfs/10-Free-AI-Prompts.pdf');
  await browser.close();
})();
