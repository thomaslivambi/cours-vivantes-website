// Script pour la newsletter
document.addEventListener('DOMContentLoaded', function() {
  const newsletterForm = document.getElementById('newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[name="email"]');
      const button = this.querySelector('button');
      const messageDiv = document.getElementById('newsletter-message');
      
      // Désactiver le bouton pendant l'envoi
      button.disabled = true;
      button.textContent = 'Inscription en cours...';
      
      try {
        const response = await fetch('/newsletter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: emailInput.value })
        });
        
        const data = await response.json();
        
        if (data.success) {
          messageDiv.textContent = data.message;
          messageDiv.className = 'newsletter-message success';
          messageDiv.style.display = 'block';
          emailInput.value = '';
        } else {
          messageDiv.textContent = data.message;
          messageDiv.className = 'newsletter-message error';
          messageDiv.style.display = 'block';
        }
      } catch (error) {
        messageDiv.textContent = 'Une erreur est survenue. Veuillez réessayer.';
        messageDiv.className = 'newsletter-message error';
        messageDiv.style.display = 'block';
      }
      
      // Réactiver le bouton
      button.disabled = false;
      button.textContent = 'S\'inscrire 🌱';
      
      // Masquer le message après 5 secondes
      setTimeout(() => {
        messageDiv.style.display = 'none';
      }, 5000);
    });
  }
});

// Animation au scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observer tous les éléments avec la classe 'fade-in'
document.addEventListener('DOMContentLoaded', function() {
  const fadeElements = document.querySelectorAll('.card, .child-illustration');
  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});
