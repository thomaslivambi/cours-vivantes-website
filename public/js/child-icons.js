// Helper pour afficher les icônes SVG style dessin d'enfant

const ChildIcons = {
  // Map des emojis vers les noms d'icônes SVG
  emojiMap: {
    '🌱': 'plant',
    '🌿': 'plant',
    '🌳': 'tree',
    '👧👦': 'children',
    '👧': 'children',
    '👦': 'children',
    '☀️': 'sun',
    '🌸': 'flower',
    '🌻': 'flower',
    '🦋': 'butterfly',
    '🏫': 'school',
    '💚': 'heart',
    '❤️': 'heart',
    '✨': 'star',
    '⭐': 'star',
    '📚': 'book',
    '📧': 'email',
    '💌': 'email',
    '📱': 'phone',
    '🌍': 'globe',
    '🌎': 'globe',
    '🌏': 'globe',
    '🤝': 'hand',
    '👋': 'hand',
    '🎯': 'target',
    '💡': 'bulb',
    '🎨': 'palette',
    '🚀': 'rocket',
    '🎁': 'gift',
    '☂️': 'umbrella',
    '☁️': 'cloud',
    '🌈': 'rainbow'
  },

  // Créer une icône SVG
  create: function(iconName, size = 'medium', className = '') {
    const sizeClass = {
      small: 'child-icon',
      medium: 'child-icon-large',
      large: 'child-icon-xl'
    }[size] || 'child-icon-large';

    return `<svg class="${sizeClass} ${className}" aria-hidden="true">
      <use href="/images/icons.svg#icon-${iconName}"></use>
    </svg>`;
  },

  // Remplacer un emoji par une icône
  replaceEmoji: function(emoji, size = 'medium', className = '') {
    const iconName = this.emojiMap[emoji];
    if (iconName) {
      return this.create(iconName, size, className);
    }
    return emoji; // Retourne l'emoji si pas de correspondance
  }
};

// Export pour utilisation globale
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ChildIcons;
}
