// Il s'agit d'une fonction serverless compatible avec Vercel.
// Elle envoie un e-mail en utilisant l'API de Brevo (anciennement Sendinblue).
// Note : Pour que cela fonctionne, l'e-mail de l'expéditeur ('telyaagency@gmail.com') doit être validé dans votre compte Brevo.

// Récupère la clé API Brevo depuis les variables d'environnement.
function getBrevoApiKey() {
  let apiKey = process.env.BREVO_API_KEY;

  // Si la clé ressemble à une chaîne Base64 (comme celle partagée par l'utilisateur),
  // on essaie de la décoder pour extraire la vraie clé.
  // Cela rend le système plus robuste à une erreur de copier-coller courante.
  if (apiKey && apiKey.startsWith('ey') && apiKey.endsWith('=')) {
      try {
          // Vercel utilise un environnement Node.js, on peut donc utiliser Buffer.
          const decodedString = Buffer.from(apiKey, 'base64').toString('utf-8');
          const parsedJson = JSON.parse(decodedString);
          if (parsedJson && parsedJson.api_key) {
              return parsedJson.api_key;
          }
      } catch (e) {
          // Si le décodage échoue, ce n'était probablement pas ce qu'on pensait.
          // On continue avec la clé telle quelle. L'API Brevo renverra une erreur si elle est invalide.
          console.warn('La clé API Brevo ressemble à du Base64 mais n\'a pas pu être décodée. Utilisation de la valeur brute.');
      }
  }
  
  return apiKey;
}


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

  const brevoApiKey = getBrevoApiKey();

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