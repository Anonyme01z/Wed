export function initStory() {
  const storyRoot = document.getElementById('story');
  if (!storyRoot) return;
  storyRoot.innerHTML = `
    <h2 class="section-title">Our Love Story</h2>
    <div class="story-card" style="display: flex; flex-wrap: wrap; gap: 2rem; justify-content: center; align-items: flex-start; position:relative;">
      <div class="story-half" style="flex:1 1 300px; min-width:260px; background:#fffbe6; border-radius:1rem; box-shadow:0 2px 8px rgba(114,47,55,0.07); padding:1.5rem; position:relative;">
        <h3 style="font-size:1.3rem; color:var(--accent-color); margin-bottom:1rem;">Groom's View</h3>
        <p class="story-text">
          I met my partner in church. What I love most about her is her quietness. I am most looking forward to Jesus in our marriage. My favorite memory together is our visits to our both parents.
        </p>
      </div>
      <div class="love-animation" style="display:flex; align-items:center; justify-content:center; min-width:60px;">
        <span class="heart-animate" style="font-size:2.5rem; animation:beat 1s infinite;">❤️</span>
      </div>
      <div class="story-half" style="flex:1 1 300px; min-width:260px; background:#fffbe6; border-radius:1rem; box-shadow:0 2px 8px rgba(114,47,55,0.07); padding:1.5rem; position:relative;">
        <h3 style="font-size:1.3rem; color:var(--accent-color); margin-bottom:1rem;">Bride's View</h3>
        <p class="story-text">
          [Bride's story placeholder: Add her perspective here.]
        </p>
      </div>
    </div>
    <style>
      @keyframes beat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.25); }
      }
    </style>
  `;
} 