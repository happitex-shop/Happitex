export const flyToCart = (event, imageSrc) => {
  const button = event.currentTarget;
  // Find the closest product image (for ProductCard) or pass an ID for ProductDetail
  const card = button.closest('.product-container') || button.closest('div');
  const cartIcon = document.getElementById('nav-cart-icon');

  if (!cartIcon || !imageSrc) return;

  const cartRect = cartIcon.getBoundingClientRect();
  const buttonRect = button.getBoundingClientRect();

  // Create flying image
  const flyingImg = document.createElement('img');
  flyingImg.src = imageSrc;
  flyingImg.style.position = 'fixed';
  flyingImg.style.top = `${buttonRect.top}px`;
  flyingImg.style.left = `${buttonRect.left}px`;
  flyingImg.style.width = '100px';
  flyingImg.style.height = '100px';
  flyingImg.style.objectFit = 'cover';
  flyingImg.style.borderRadius = '50%';
  flyingImg.style.zIndex = '9999';
  flyingImg.style.pointerEvents = 'none';
  flyingImg.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
  flyingImg.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';

  document.body.appendChild(flyingImg);

  // Trigger animation next frame
  requestAnimationFrame(() => {
    flyingImg.style.top = `${cartRect.top + cartRect.height / 2 - 25}px`;
    flyingImg.style.left = `${cartRect.left + cartRect.width / 2 - 25}px`;
    flyingImg.style.width = '20px';
    flyingImg.style.height = '20px';
    flyingImg.style.opacity = '0.5';
  });

  // Remove after animation
  setTimeout(() => {
    flyingImg.remove();
    // Optional: bounce the cart icon
    cartIcon.classList.add('animate-bounce');
    setTimeout(() => cartIcon.classList.remove('animate-bounce'), 1000);
  }, 800);
};
