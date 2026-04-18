export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const BREVO_KEY = process.env.BREVO_API_KEY;
  const LIST_ID = 7; // "The Profit Lab - Free Prompts" list
  const TEMPLATE_ID_EMAIL_1 = 24; // Welcome + Download

  try {
    // 1. Add contact to Brevo list with signup date
    const contactRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': BREVO_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        listIds: [LIST_ID],
        attributes: {
          PROFIT_LAB_SIGNUP: new Date().toISOString().split('T')[0],
          PROFIT_LAB_LAST_EMAIL: 1
        },
        updateEnabled: true
      })
    });

    const contactData = await contactRes.json();

    if (!contactRes.ok && contactData.code !== 'duplicate_parameter') {
      return res.status(contactRes.status).json({ error: contactData.message || 'Subscription failed' });
    }

    // 2. Send Email 1 immediately (Welcome + Download)
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': BREVO_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        templateId: TEMPLATE_ID_EMAIL_1,
        to: [{ email: email }]
      })
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}
