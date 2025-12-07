# 🌱 Site Web Collectif Cours Vivantes

Site vitrine pour le Collectif Cours Vivantes - Professionnels de la nature pour le réenchantement des cours d'école et aires de jeu.

## 🎨 Caractéristiques

- **Design naturel et lumineux** avec palette de couleurs jaune, vert et beige
- **Formulaire de contact** fonctionnel avec envoi d'emails
- **Newsletter** avec inscription par email
- **Pages dynamiques** : Accueil, À propos, Nos projets, Contact
- **Illustrations style enfantin** pour un côté chaleureux et authentique
- **Responsive design** adapté à tous les écrans
- **Animations douces** au scroll pour une expérience agréable

## 🚀 Installation

### Prérequis
- Node.js (version 14 ou supérieure)
- npm (installé avec Node.js)

### Étapes d'installation

1. **Installer les dépendances**
```bash
cd ~/projets/mon-site-nodejs
npm install
```

2. **Configurer les variables d'environnement**
```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer le fichier .env avec vos informations
nano .env
```

Remplissez les variables suivantes dans le fichier `.env` :
```env
PORT=3000
EMAIL_USER=votre-email@gmail.com
EMAIL_PASS=votre-mot-de-passe-application
EMAIL_TO=contact@coursvivantes.fr
NODE_ENV=development
```

**Note importante pour Gmail :** 
- Vous devez activer la validation en 2 étapes sur votre compte Google
- Créez un "mot de passe d'application" dans les paramètres de sécurité Google
- Utilisez ce mot de passe d'application dans `EMAIL_PASS`

3. **Démarrer le serveur**

Mode développement (avec redémarrage automatique) :
```bash
npm run dev
```

Mode production :
```bash
npm start
```

4. **Accéder au site**
Ouvrez votre navigateur à l'adresse : `http://localhost:3000`

## 📁 Structure du projet

```
mon-site-nodejs/
├── public/                 # Fichiers statiques
│   ├── css/
│   │   └── style.css      # Styles principaux
│   ├── js/
│   │   └── main.js        # Scripts JavaScript
│   └── images/            # Images (à ajouter)
├── routes/                # Routes Express
│   └── index.js          # Routes principales
├── views/                 # Templates EJS
│   ├── partials/         # Composants réutilisables
│   │   ├── header.ejs
│   │   ├── footer.ejs
│   │   └── newsletter.ejs
│   ├── index.ejs         # Page d'accueil
│   ├── about.ejs         # Page À propos
│   ├── projects.ejs      # Page Nos projets
│   ├── contact.ejs       # Page Contact
│   └── 404.ejs           # Page d'erreur
├── .env                   # Variables d'environnement (à créer)
├── .env.example          # Exemple de variables
├── .gitignore            # Fichiers ignorés par Git
├── package.json          # Dépendances du projet
├── server.js             # Serveur Express
└── README.md             # Ce fichier
```

## 🎨 Personnalisation

### Couleurs
Les couleurs sont définies dans `/public/css/style.css` en tant que variables CSS :
```css
:root {
  --vert-nature: #6B8E23;
  --vert-clair: #8FBC8F;
  --jaune-soleil: #FFD966;
  --jaune-doux: #FFF4CC;
  --beige: #F5E6D3;
  /* ... */
}
```

### Ajouter des images
1. Placez vos images dans le dossier `/public/images/`
2. Référencez-les dans vos templates EJS : `<img src="/images/votre-image.jpg">`

### Modifier le contenu
Les pages sont dans le dossier `/views/`. Modifiez les fichiers `.ejs` pour changer le contenu.

## 📧 Configuration de l'envoi d'emails

Le site utilise **Nodemailer** pour gérer :
- Le formulaire de contact
- Les inscriptions à la newsletter

### Pour utiliser Gmail :
1. Activez la validation en 2 étapes sur votre compte Google
2. Allez dans "Sécurité" > "Mots de passe des applications"
3. Créez un nouveau mot de passe d'application
4. Utilisez ce mot de passe dans le fichier `.env`

### Pour utiliser un autre service :
Modifiez la configuration dans `/routes/index.js` :
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.votre-service.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

## 🌐 Déploiement

### Déploiement local ou serveur VPS

1. Installez Node.js sur votre serveur
2. Clonez le projet
3. Installez les dépendances : `npm install`
4. Configurez le fichier `.env`
5. Démarrez avec PM2 (recommandé pour la production) :
```bash
npm install -g pm2
pm2 start server.js --name "cours-vivantes"
pm2 save
pm2 startup
```

### Plateformes de déploiement suggérées

- **Heroku** (facile et gratuit pour commencer)
- **Render** (alternative moderne à Heroku)
- **DigitalOcean App Platform**
- **Vercel** (nécessite quelques ajustements)
- **Railway**

## 🔧 Développement

### Commandes utiles

```bash
# Installation des dépendances
npm install

# Mode développement (redémarrage auto)
npm run dev

# Mode production
npm start

# Vérifier les mises à jour de dépendances
npm outdated
```

### Ajouter de nouvelles pages

1. Créez un nouveau fichier dans `/views/nouvelle-page.ejs`
2. Ajoutez une route dans `/routes/index.js` :
```javascript
router.get('/nouvelle-page', (req, res) => {
  res.render('nouvelle-page', { 
    title: 'Titre - Cours Vivantes',
    pageTitle: 'Titre',
    activeNav: 'nouvelle-page'
  });
});
```
3. Ajoutez un lien dans le menu (`/views/partials/header.ejs`)

## 📝 TODO / Améliorations possibles

- [ ] Ajouter de vraies photos du collectif et des projets
- [ ] Intégrer un CMS headless (Strapi, Contentful) pour gérer le contenu
- [ ] Ajouter une galerie photo avec lightbox
- [ ] Intégrer Google Analytics ou Plausible pour les statistiques
- [ ] Ajouter un blog pour partager des actualités
- [ ] Mettre en place un système de témoignages dynamiques
- [ ] Optimiser les images (WebP, lazy loading)
- [ ] Ajouter des meta tags OpenGraph pour le partage sur réseaux sociaux
- [ ] Intégrer un calendrier d'événements
- [ ] Créer une section "Ressources" avec documents téléchargeables

## 🆘 Support

Pour toute question ou problème :
- Email : contact@coursvivantes.fr
- Issues GitHub (si le projet est sur GitHub)

## 📄 Licence

Ce projet est sous licence ISC.

## 🌟 Crédits

Site créé avec ❤️ pour le Collectif Cours Vivantes

Technologies utilisées :
- Node.js
- Express.js
- EJS (Embedded JavaScript templating)
- Nodemailer
- CSS personnalisé

---

**Note :** N'oubliez pas de personnaliser ce README selon l'évolution de votre projet ! 🌱
