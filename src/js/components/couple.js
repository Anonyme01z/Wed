import { COUPLE } from '../config.js';

export function initCouple() {
  const coupleRoot = document.getElementById('couple');
  if (!coupleRoot) return;
  coupleRoot.innerHTML = `
    <div class="couple-cards single">
      <div class="person-card">
        <img src="${COUPLE.groom.image}" alt="${COUPLE.groom.name}" class="person-img"/>
        <h3>${COUPLE.groom.name}</h3>
        <div class="social-links">
          <a href="${COUPLE.groom.socials.instagram}" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        </div>
        <div class="profile-info">
          <p><strong>Bio:</strong> ${COUPLE.groom.bio}</p>
          <p><strong>Hobbies:</strong> ${COUPLE.groom.hobbies}</p>
          <p><strong>Favorite Color:</strong> ${COUPLE.groom.favoriteColor}</p>
          <p><strong>Favorite Song:</strong> ${COUPLE.groom.favoriteSong}</p>
          <p><strong>Favorite Food:</strong> ${COUPLE.groom.favoriteFood}</p>
          <p><strong>How We Met:</strong> ${COUPLE.groom.howMet}</p>
          <p><strong>What I Love Most:</strong> ${COUPLE.groom.loveMost}</p>
          <p><strong>Looking Forward To:</strong> ${COUPLE.groom.lookingForward}</p>
          <p><strong>Favorite Memory:</strong> ${COUPLE.groom.favoriteMemory}</p>
          <p><strong>Account Number:</strong> ${COUPLE.groom.accountNumber} (${COUPLE.groom.bank})</p>
        </div>
      </div>
    </div>
  `;
} 