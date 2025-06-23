export function initStory() {
  const storyRoot = document.getElementById('story');
  if (!storyRoot) return;
  storyRoot.innerHTML = `
    <div class="story-card">
      <h2 class="section-title">Our Love Story</h2>
      <p class="story-text">
        Elizabeth and Ibukunoluwa met in a serendipitous moment at a mutual friend's event in Port-Harcourt. Their connection was instant, blossoming into a beautiful journey filled with laughter, faith, and shared dreams. After years of growing together, Ibukunoluwa proposed in the most heartfelt way, and Elizabeth said YES!<br><br>
        Join us as we celebrate love, family, and a lifetime of happiness.
      </p>
    </div>
  `;
} 