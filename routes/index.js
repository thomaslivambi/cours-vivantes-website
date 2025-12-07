const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Configuration du transporteur email pour Hostinger
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, // true pour le port 465, false pour les autres ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Page d'accueil
router.get('/', (req, res) => {
  res.render('index', { 
    title: 'Collectif Cours Vivantes - Réenchanter les cours d\'école',
    pageTitle: 'Accueil',
    activeNav: 'accueil'
  });
});

// Page À propos
router.get('/a-propos', (req, res) => {
  res.render('about', { 
    title: 'À propos - Cours Vivantes',
    pageTitle: 'À propos',
    activeNav: 'a-propos'
  });
});

// Page Nos projets
router.get('/projets', (req, res) => {
  res.render('projects', { 
    title: 'Nos projets - Cours Vivantes',
    pageTitle: 'Nos projets',
    activeNav: 'projets'
  });
});

// Page Contact
router.get('/contact', (req, res) => {
  res.render('contact', { 
    title: 'Contact - Cours Vivantes',
    pageTitle: 'Contact',
    activeNav: 'contact',
    success: false,
    error: false
  });
});

// Traitement du formulaire de contact
router.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const transporter = createTransporter();

    // Options de l'email
    const mailOptions = {
      from: process.env.EMAIL_USER, // Utilise votre email Hostinger
      replyTo: email, // L'email du visiteur pour pouvoir répondre
      to: process.env.EMAIL_TO,
      subject: `[Cours Vivantes] ${subject}`,
      html: `
        <h2>Nouveau message depuis le site Cours Vivantes</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.render('contact', { 
      title: 'Contact - Cours Vivantes',
      pageTitle: 'Contact',
      activeNav: 'contact',
      success: true,
      error: false
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    res.render('contact', { 
      title: 'Contact - Cours Vivantes',
      pageTitle: 'Contact',
      activeNav: 'contact',
      success: false,
      error: true
    });
  }
});

// Traitement de l'inscription à la newsletter
router.post('/newsletter', async (req, res) => {
  const { email } = req.body;

  try {
    const transporter = createTransporter();

    // Options de l'email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: '[Cours Vivantes] Nouvelle inscription newsletter',
      html: `
        <h2>Nouvelle inscription à la newsletter</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><em>Pensez à ajouter cet email à votre liste de diffusion newsletter.</em></p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Merci pour votre inscription !' });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ success: false, message: 'Une erreur est survenue.' });
  }
});

module.exports = router;
