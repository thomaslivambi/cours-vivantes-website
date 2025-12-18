# 🎨 Système d'Icônes Style Dessin d'Enfant

Ce dossier contient le système d'icônes SVG qui remplace automatiquement les emojis par des illustrations colorées style "dessin d'enfant".

## 📁 Fichiers

- **icons.svg** : Bibliothèque SVG contenant toutes les icônes
- **icons.css** : Styles pour les icônes (tailles, animations)
- **emoji-replacer.js** : Script qui remplace automatiquement les emojis par des SVG au chargement de la page
- **child-icons.js** : Helper JavaScript (optionnel, pour utilisation programmatique)

## 🎭 Icônes disponibles

### Nature
- `plant` - Plante/Pousse (🌱 🌿)
- `tree` - Arbre (🌳)
- `flower` - Fleur (🌸 🌻)
- `butterfly` - Papillon (🦋)
- `sun` - Soleil (☀️)
- `cloud` - Nuage (☁️)
- `rainbow` - Arc-en-ciel (🌈)

### Personnes
- `children` - Enfants (👧👦 👧 👦 👥)
- `hand` - Main/Salut (🤝 👋 🏃)

### Objets
- `school` - École/Maison (🏫 🏠 🏰)
- `heart` - Cœur (💚 ❤️)
- `star` - Étoile (✨ ⭐)
- `book` - Livre (📚 📋 📊 💼)
- `email` - Email/Lettre (📧 💌 💬)
- `phone` - Téléphone (📱)
- `globe` - Monde/Globe (🌍 🌎 🌏 🗺️)
- `target` - Cible (🎯 🧭 🔍)
- `bulb` - Ampoule/Idée (💡 🤔 ❓)
- `palette` - Palette/Art (🎨 ✏️ 📷 🎥)
- `rocket` - Fusée (🚀)
- `gift` - Cadeau (🎁)
- `umbrella` - Parapluie (☂️)

## ⚙️ Comment ça fonctionne

### Remplacement automatique

Le script `emoji-replacer.js` :
1. Se charge au démarrage de la page
2. Parcourt tout le DOM
3. Trouve tous les emojis dans le texte
4. Les remplace par des éléments SVG correspondants
5. Préserve la mise en page et le contexte

### Exemple

```html
<!-- Avant (dans le HTML) -->
<h1>🌱 Bienvenue chez Cours Vivantes</h1>

<!-- Après (rendu dans le navigateur) -->
<h1>
  <svg class="child-icon-large" aria-hidden="true">
    <use href="/images/icons.svg#icon-plant"></use>
  </svg>
  Bienvenue chez Cours Vivantes
</h1>
```

## 🎨 Classes CSS disponibles

### Tailles
- `.child-icon` - Petite (1em × 1em) - pour icônes inline dans le texte
- `.child-icon-large` - Moyenne (3em × 3em) - pour icônes de section
- `.child-icon-xl` - Grande (5em × 5em) - pour grandes illustrations

### Animations
- `.child-icon-float` - Animation flottante douce
- `.child-icon-wiggle` - Animation de balancement

## 💻 Utilisation manuelle (optionnel)

Si vous voulez utiliser les icônes directement dans le HTML :

```html
<!-- Icône simple -->
<svg class="child-icon-large">
  <use href="/images/icons.svg#icon-plant"></use>
</svg>

<!-- Icône avec animation -->
<svg class="child-icon-xl child-icon-float">
  <use href="/images/icons.svg#icon-butterfly"></use>
</svg>
```

## ✏️ Ajouter de nouvelles icônes

1. Ouvrir `icons.svg`
2. Ajouter un nouveau `<svg id="icon-NOUVEAU-NOM">...</svg>`
3. Dessiner l'icône avec des formes SVG simples
4. Ajouter la correspondance dans `emoji-replacer.js` :
   ```javascript
   '🆕': { name: 'nouveau-nom', inline: false }
   ```

## 🎨 Style des icônes

Toutes les icônes suivent ces principes de design :
- **Trait irrégulier** (stroke-width: 2-3)
- **Couleurs vives** issues de la palette Cours Vivantes
- **Formes simples** et reconnaissables
- **Style enfantin** mais lisible

### Palette de couleurs utilisée
- Vert nature : `#6B8E23`
- Vert clair : `#8FBC8F`
- Jaune soleil : `#FFD966`
- Rose vif : `#E91E63`
- Bleu ciel : `#4A90E2`
- Beige terre : `#8B7355`

## 🚀 Performance

- **Une seule requête HTTP** : Toutes les icônes sont dans un seul fichier SVG
- **Réutilisation** : Les SVG sont référencés via `<use>`, pas dupliqués
- **Léger** : Le fichier icons.svg fait ~15 KB
- **Pas de bibliothèque externe** : JavaScript vanilla pur

## 🐛 Dépannage

### Les icônes n'apparaissent pas
1. Vérifier que `icons.css` est bien chargé
2. Vérifier que `emoji-replacer.js` est chargé AVANT `main.js`
3. Vérifier que le fichier `icons.svg` est accessible à `/images/icons.svg`

### Les icônes sont trop grandes/petites
Ajuster dans `icons.css` :
```css
.child-icon-large {
  width: 3em; /* Modifier cette valeur */
  height: 3em;
}
```

### Ajouter un emoji non supporté
Modifier `emoji-replacer.js` et ajouter la correspondance dans `emojiToIcon`.

## 📝 Notes techniques

- Compatible tous navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Fonctionne avec SSR (Server-Side Rendering)
- Accessible (attribut `aria-hidden` sur les SVG décoratifs)
- Responsive (tailles en `em` relatives au texte)

---

**Créé avec ❤️ pour Cours Vivantes** 🌱
