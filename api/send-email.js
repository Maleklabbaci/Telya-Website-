// Il s'agit d'une fonction serverless compatible avec Vercel.
// Cette version n'envoie PAS d'e-mail via un service externe comme Brevo.
// Elle enregistre les données du formulaire dans les logs de Vercel.
// C'est une solution simple et fiable qui ne nécessite aucune clé API.

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
  
  try {
    // Le body-parser de Vercel devrait automatiquement parser le corps JSON de la requête.
    if (!req.body) {
      return res.status(400).json({ error: 'Corps de la requête manquant.' });
    }

    // Valider les champs essentiels
    const { name, email, subject, htmlContent } = req.body;
    if (!name || !email || !subject || !htmlContent) {
      return res.status(400).json({ error: 'Champs requis manquants : nom, email, sujet, htmlContent.' });
    }
    
    // Au lieu d'envoyer un e-mail, nous enregistrons les informations dans les logs.
    // Vous pouvez consulter ces logs dans votre tableau de bord Vercel.
    console.log('--- Nouvelle soumission de formulaire ---');
    console.log(`De: ${name} <${email}>`);
    console.log(`Sujet: ${subject}`);
    console.log('--- Données complètes ---');
    // On enregistre l'objet complet pour une inspection facile.
    console.log(JSON.stringify(req.body, null, 2));
    console.log('--- Fin de la soumission ---');

    // On simule une réponse réussie pour que le frontend continue son flux normal
    // (par exemple, redirection vers la page de remerciement).
    return res.status(200).json({ success: true, message: 'La soumission a été enregistrée avec succès.' });

  } catch (error) {
    console.error('Erreur serveur lors du traitement du formulaire :', error);
    return res.status(500).json({ error: 'Une erreur interne est survenue sur le serveur.' });
  }
}
