// Vercel Cron Job — runs daily at 9am UTC
// Checks all Profit Lab subscribers and sends the next email in the sequence

const BREVO_KEY = process.env.BREVO_API_KEY;
const LIST_ID = 7;

// Email schedule: [days since signup, template ID, email number]
const DRIP_SCHEDULE = [
  { day: 1, templateId: 25, emailNum: 2 },  // Day 2: Prompt Framework
  { day: 3, templateId: 26, emailNum: 3 },  // Day 4: Story
  { day: 5, templateId: 27, emailNum: 4 },  // Day 6: Social Proof + Pitch
  { day: 7, templateId: 28, emailNum: 5 },  // Day 8: Final Pitch
];

export default async function handler(req, res) {
  // Verify cron secret (Vercel sends this header for cron jobs)
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Fetch all contacts in the Profit Lab list
    const contactsRes = await fetch(
      `https://api.brevo.com/v3/contacts/lists/${LIST_ID}/contacts?limit=500&sort=desc`,
      {
        headers: {
          'api-key': BREVO_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    const contactsData = await contactsRes.json();

    if (!contactsRes.ok || !contactsData.contacts) {
      return res.status(200).json({ sent: 0, error: 'No contacts found' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let sent = 0;

    for (const contact of contactsData.contacts) {
      const signupDate = contact.attributes?.PROFIT_LAB_SIGNUP;
      const lastEmail = contact.attributes?.PROFIT_LAB_LAST_EMAIL || 1;

      if (!signupDate || lastEmail >= 5) continue; // No signup date or sequence complete

      const signup = new Date(signupDate);
      signup.setHours(0, 0, 0, 0);
      const daysSinceSignup = Math.floor((today - signup) / (1000 * 60 * 60 * 24));

      // Find the next email to send
      for (const step of DRIP_SCHEDULE) {
        if (daysSinceSignup >= step.day && lastEmail < step.emailNum) {
          // Send this email
          await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
              'api-key': BREVO_KEY,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              templateId: step.templateId,
              to: [{ email: contact.email }]
            })
          });

          // Update last email sent
          await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(contact.email)}`, {
            method: 'PUT',
            headers: {
              'api-key': BREVO_KEY,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              attributes: { PROFIT_LAB_LAST_EMAIL: step.emailNum }
            })
          });

          sent++;
          break; // Only send one email per contact per cron run
        }
      }
    }

    return res.status(200).json({ success: true, sent, checked: contactsData.contacts.length });
  } catch (err) {
    return res.status(500).json({ error: 'Drip job failed', details: err.message });
  }
}
