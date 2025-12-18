// Remplacement automatique des emojis par des SVG style dessin d'enfant
(function() {
  'use strict';
  
  // Map des emojis vers les noms d'icônes SVG
  const emojiToIcon = {
    '🌱': { name: 'plant', inline: true },
    '🌿': { name: 'plant', inline: true },
    '🌳': { name: 'tree', inline: false },
    '👧👦': { name: 'children', inline: false },
    '👧': { name: 'children', inline: false },
    '👦': { name: 'children', inline: false },
    '☀️': { name: 'sun', inline: false },
    '🌸': { name: 'flower', inline: false },
    '🌻': { name: 'flower', inline: false },
    '🦋': { name: 'butterfly', inline: false },
    '🏫': { name: 'school', inline: false },
    '💚': { name: 'heart', inline: true },
    '❤️': { name: 'heart', inline: true },
    '✨': { name: 'star', inline: false },
    '⭐': { name: 'star', inline: false },
    '📚': { name: 'book', inline: false },
    '📧': { name: 'email', inline: false },
    '💌': { name: 'email', inline: false },
    '📱': { name: 'phone', inline: false },
    '🌍': { name: 'globe', inline: false },
    '🌎': { name: 'globe', inline: false },
    '🌏': { name: 'globe', inline: false },
    '🤝': { name: 'hand', inline: false },
    '👋': { name: 'hand', inline: false },
    '🎯': { name: 'target', inline: false },
    '💡': { name: 'bulb', inline: false },
    '🎨': { name: 'palette', inline: false },
    '🚀': { name: 'rocket', inline: false },
    '🎁': { name: 'gift', inline: false },
    '☂️': { name: 'umbrella', inline: false },
    '☁️': { name: 'cloud', inline: false },
    '🌈': { name: 'rainbow', inline: false },
    '🏃': { name: 'hand', inline: false }, // Utiliser hand pour course
    '🏰': { name: 'school', inline: false }, // Utiliser school pour château
    '🍎': { name: 'flower', inline: false }, // Utiliser flower pour pomme
    '🦜': { name: 'butterfly', inline: false }, // Utiliser butterfly pour oiseau
    '🐸': { name: 'butterfly', inline: false }, // Utiliser butterfly pour grenouille
    '💧': { name: 'cloud', inline: false }, // Utiliser cloud pour goutte d'eau
    '🏞️': { name: 'tree', inline: false }, // Utiliser tree pour paysage
    '🌊': { name: 'cloud', inline: false }, // Utiliser cloud pour vague
    '👑': { name: 'star', inline: false }, // Utiliser star pour couronne
    '✏️': { name: 'palette', inline: false }, // Utiliser palette pour crayon
    '👥': { name: 'children', inline: false },
    '📘': { name: 'book', inline: false },
    '📷': { name: 'palette', inline: false },
    '💼': { name: 'book', inline: false },
    '🎥': { name: 'palette', inline: false },
    '🤔': { name: 'bulb', inline: false },
    '🔍': { name: 'target', inline: false },
    '🗺️': { name: 'globe', inline: false },
    '🏠': { name: 'school', inline: false },
    '🧭': { name: 'target', inline: false },
    '1️⃣': { name: 'star', inline: true },
    '2️⃣': { name: 'star', inline: true },
    '3️⃣': { name: 'star', inline: true },
    '4️⃣': { name: 'star', inline: true },
    '5️⃣': { name: 'star', inline: true },
    '📋': { name: 'book', inline: false },
    '📊': { name: 'book', inline: false },
    '💬': { name: 'email', inline: false },
    '❓': { name: 'bulb', inline: false },
    '❌': { name: 'target', inline: false },
    '✅': { name: 'star', inline: true }
  };

  // Créer un élément SVG
  function createSVG(iconName, isInline) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    
    // Déterminer la classe selon le contexte
    let className = 'child-icon';
    if (!isInline) {
      className = 'child-icon-large';
    }
    
    svg.setAttribute('class', className);
    svg.setAttribute('aria-hidden', 'true');
    use.setAttribute('href', `/images/icons.svg#icon-${iconName}`);
    
    svg.appendChild(use);
    return svg;
  }

  // Remplacer les emojis dans un nœud de texte
  function replaceEmojisInTextNode(textNode) {
    const text = textNode.textContent;
    let hasEmoji = false;
    
    // Vérifier si le texte contient des emojis
    for (let emoji in emojiToIcon) {
      if (text.includes(emoji)) {
        hasEmoji = true;
        break;
      }
    }
    
    if (!hasEmoji) return;
    
    // Créer un span temporaire pour traiter le texte
    const span = document.createElement('span');
    let remainingText = text;
    
    // Traiter chaque emoji
    for (let emoji in emojiToIcon) {
      if (remainingText.includes(emoji)) {
        const parts = remainingText.split(emoji);
        const newContent = document.createDocumentFragment();
        
        parts.forEach((part, index) => {
          if (part) {
            newContent.appendChild(document.createTextNode(part));
          }
          if (index < parts.length - 1) {
            const iconData = emojiToIcon[emoji];
            const svg = createSVG(iconData.name, iconData.inline);
            newContent.appendChild(svg);
          }
        });
        
        remainingText = span.textContent = '';
        span.appendChild(newContent);
        remainingText = span.textContent;
      }
    }
    
    // Remplacer le nœud de texte par le nouveau contenu
    if (span.childNodes.length > 0) {
      const parent = textNode.parentNode;
      if (parent) {
        // Insérer le contenu du span avant le texte original
        while (span.firstChild) {
          parent.insertBefore(span.firstChild, textNode);
        }
        // Supprimer le nœud de texte original
        parent.removeChild(textNode);
      }
    }
  }

  // Parcourir tous les nœuds de texte dans un élément
  function walkTextNodes(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      replaceEmojisInTextNode(node);
    } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
      // Créer un tableau des nœuds enfants car la liste sera modifiée
      const children = Array.from(node.childNodes);
      children.forEach(walkTextNodes);
    }
  }

  // Initialiser le remplacement au chargement de la page
  document.addEventListener('DOMContentLoaded', function() {
    walkTextNodes(document.body);
  });
})();
