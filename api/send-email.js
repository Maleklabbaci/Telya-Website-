// Cette fonction serverless est conçue pour Vercel.
// Elle agit comme un proxy sécurisé pour envoyer les données des formulaires à Formspark.io.
// Cela évite d'exposer l'URL de votre formulaire Formspark côté client.

export default async function handler(req, res) {
  // Gérer la requête CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // Définir les en-têtes pour la réponse principale
  // Pour une sécurité accrue en production, remplacez '*' par le domaine de votre site.
  res.setHeader('Access-Control-Allow-Origin', '*'); 

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée. Seules les requêtes POST sont acceptées.' });
  }

  // Vérifier que l'ID du formulaire Formspark est configuré dans les variables d'environnement
  const formId = process.env.FORMSPARK_FORM_ID;
  if (!formId) {
    console.error("La variable d'environnement FORMSPARK_FORM_ID n'est pas définie.");
    return res.status(500).json({ error: "Le service d'envoi n'est pas configuré correctement." });
  }

  try {
    if (!req.body) {
      return res.status(400).json({ error: 'Corps de la requête manquant.' });
    }

    const formsparkUrl = `https://submit-form.com/${formId}`;

    // Transférer les données du formulaire à Formspark
    const response = await fetch(formsparkUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // Le corps de la requête est directement transmis, ce qui rend cette fonction
      // compatible avec tous les formulaires (contact, portfolio, questionnaire).
      body: JSON.stringify(req.body),
    });

    // Vérifier si la soumission à Formspark a réussi
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erreur de Formspark:', errorData);
      return res.status(response.status).json({ error: "Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer." });
    }

    // Renvoyer une réponse de succès au frontend
    return res.status(200).json({ success: true, message: 'Formulaire soumis avec succès à Formspark.' });

  } catch (error) {
    console.error('Erreur interne du serveur lors de la soumission à Formspark:', error);
    return res.status(500).json({ error: 'Une erreur interne est survenue sur le serveur.' });
  }
}
