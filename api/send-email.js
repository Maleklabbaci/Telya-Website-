// This is a Vercel serverless function that acts as a secure backend to process form submissions.
// It uses the Brevo API (formerly Sendinblue) to send transactional emails.
// IMPORTANT: For this to work, the BREVO_API_KEY must be set as an environment variable in your hosting provider (e.g., Vercel).

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Destructure all expected fields from the request body.
  const { name, email, subject, htmlContent } = req.body;

  // Perform basic validation to ensure all required data is present.
  if (!name || !email || !subject || !htmlContent) {
    return res.status(400).json({ error: 'Missing required fields. All fields are required.' });
  }

  // Securely retrieve the API key from environment variables.
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
      console.error("Brevo API key is not configured on the server.");
      // Provide a generic error message to the client for security.
      return res.status(500).json({ error: 'Server configuration error.' });
  }

  // Construct the email payload for the Brevo API.
  const emailPayload = {
      // Use a verified sender address for better deliverability.
      sender: { name: 'Telya Site Web', email: 'contact@telya.agency' }, 
      to: [{ email: 'telyaagency@gmail.com', name: 'Telya Agency' }],
      // Set the user's email as the 'reply-to' address to allow direct replies.
      replyTo: { email: email, name: name }, 
      subject: subject,
      htmlContent: htmlContent,
  };

  try {
    // Make the API call to Brevo.
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(emailPayload),
    });

    // Handle non-successful responses from the Brevo API.
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API Error:', errorData);
      return res.status(response.status).json({ error: 'Failed to send the email.' });
    }

    // Send a success response back to the client.
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).json({ error: 'An internal server error occurred while sending the email.' });
  }
}
