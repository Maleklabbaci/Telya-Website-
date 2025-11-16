// This is a serverless function compatible with Vercel.
// It sends an email using the Brevo (formerly Sendinblue) API.
// Note: For this to work, the sender email ('telyaagency@gmail.com') must be validated in your Brevo account.

// The Brevo API key is securely stored in an environment variable.
// IMPORTANT: You must set BREVO_API_KEY in your Vercel project's environment variables.
const brevoApiKey = process.env.BREVO_API_KEY;

export default async function handler(req, res) {
  // Allow OPTIONS requests for CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // Set CORS headers for the main request
  res.setHeader('Access-Control-Allow-Origin', '*'); // In production, restrict this to your domain

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!brevoApiKey) {
    console.error('Server configuration error: BREVO_API_KEY is not set.');
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { name, email, subject, htmlContent } = body;
    
    if (!name || !email || !subject || !htmlContent) {
      return res.status(400).json({ error: 'Missing required fields: name, email, subject, htmlContent' });
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': brevoApiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Telya Agency Site', email: 'telyaagency@gmail.com' },
        to: [{ email: 'telyaagency@gmail.com', name: 'Telya Agency' }],
        replyTo: { email: email, name: name },
        subject: subject,
        htmlContent: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API Error:', errorData);
      const errorMessage = errorData.message || 'An unknown error occurred.';
      return res.status(response.status).json({ error: `Failed to send email: ${errorMessage}` });
    }

    const data = await response.json();
    return res.status(200).json({ success: true, data });

  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}