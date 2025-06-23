import { COUPLE } from '../config.js';

export function initCouple() {
  const coupleRoot = document.getElementById('couple');
  if (!coupleRoot) return;
  coupleRoot.innerHTML = `
    <div class="couple-cards">
      <div class="person-card">
        <img src="${COUPLE.groom.image}" alt="${COUPLE.groom.name}" class="person-img"/>
        <h3>${COUPLE.groom.name}</h3>
        <div class="social-links">
          <a href="${COUPLE.groom.socials.instagram}" target="_blank">Instagram</a>
          <a href="${COUPLE.groom.socials.facebook}" target="_blank">Facebook</a>
        </div>
      </div>
      <div class="person-card">
        <img src="${COUPLE.bride.image}" alt="${COUPLE.bride.name}" class="person-img"/>
        <h3>${COUPLE.bride.name}</h3>
        <div class="social-links">
          <a href="${COUPLE.bride.socials.instagram}" target="_blank">Instagram</a>
          <a href="${COUPLE.bride.socials.facebook}" target="_blank">Facebook</a>
        </div>
      </div>
    </div>
  `;
} 