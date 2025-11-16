// This is a Vercel serverless function that uses the Resend API to send emails.
// It's a more modern and developer-friendly alternative to Brevo/Sendinblue.
//
// --- HOW TO CONFIGURE ---
// 1. Go to https://resend.com and create a free account.
// 2. Create a new API Key.
// 3. Replace the placeholder 're_YOUR_API_KEY_HERE' below with your actual Resend API key.
//
// That's it! The form will work immediately.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // This is the API key you get from resend.com
  // IMPORTANT: Replace this placeholder with your actual key.
  const apiKey = 're_YOUR_API_KEY_HERE';

  if (apiKey === 're_YOUR_API_KEY_HERE') {
    console.error("Resend API key is not configured.");
    return res.status(500).json({ error: 'Email service is not configured on the server.' });
  }

  const { name, email, subject, htmlContent } = req.body;

  if (!name || !email || !subject || !htmlContent) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  // We use 'onboarding@resend.dev' as the sender.
  // This is a special address provided by Resend that allows sending emails
  // without having to complete complex domain verification steps (DNS records, etc.).
  // This makes the setup much easier.
  const emailPayload = {
    from: 'Telya Agency <onboarding@resend.dev>',
    to: ['telyaagency@gmail.com'],
    subject: subject,
    html: htmlContent,
    reply_to: email, // This allows you to directly "Reply" to the user from your inbox.
  };

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Resend API Error:', errorData);
      return res.status(response.status).json({ error: 'Failed to send the email via Resend.' });
    }

    const data = await response.json();
    res.status(200).json({ success: true, message: 'Email sent successfully!', data });

  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
}
