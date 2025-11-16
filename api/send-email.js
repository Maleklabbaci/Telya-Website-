// Il s'agit d'une fonction serverless compatible avec Vercel.
// Elle envoie un e-mail en utilisant l'API de Brevo (anciennement Sendinblue).
// Note : Pour que cela fonctionne, l'e-mail de l'expéditeur ('telyaagency@gmail.com') doit être validé dans votre compte Brevo.

// La clé API de Brevo est stockée de manière sécurisée dans une variable d'environnement.
// IMPORTANT : Vous devez définir BREVO_API_KEY dans les variables d'environnement de votre projet Vercel.
const brevoApiKey = process.env.BREVO_API_KEY;

export default async function handler(req, res) {
  // Autoriser les requêtes OPTIONS pour la pré-vérification CORS
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // Définir les en-têtes CORS pour la requête principale
  // En production, il est recommandé de restreindre cette origine à votre domaine.
  res.setHeader('Access-Control-Allow-Origin', '*'); 

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  if (!brevoApiKey) {
    console.error('Erreur de configuration du serveur : BREVO_API_KEY n\'est pas définie.');
    return res.status(500).json({ error: 'Erreur de configuration du serveur : La clé API pour l\'envoi d\'e-mails n\'est pas configurée.' });
  }

  try {
    // Le body-parser de Vercel devrait automatiquement parser le corps JSON de la requête.
    if (!req.body) {
      return res.status(400).json({ error: 'Corps de la requête manquant.' });
    }

    const { name, email, subject, htmlContent } = req.body;
    
    if (!name || !email || !subject || !htmlContent) {
      return res.status(400).json({ error: 'Champs requis manquants : nom, email, sujet, htmlContent.' });
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
      console.error('Erreur API Brevo :', errorData);
      const errorMessage = errorData.message || 'Une erreur inconnue est survenue.';
      return res.status(response.status).json({ error: `L'envoi de l'e-mail a échoué : ${errorMessage}` });
    }

    const data = await response.json();
    return res.status(200).json({ success: true, data });

  } catch (error) {
    console.error('Erreur serveur :', error);
    return res.status(500).json({ error: 'Une erreur interne est survenue sur le serveur.' });
  }
}
