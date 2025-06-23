import { EVENTS, RECEPTION, RSVP, COLOR_OF_DAY } from '../config.js';

export function initEvents() {
  const eventsRoot = document.getElementById('events');
  if (!eventsRoot) return;
  eventsRoot.innerHTML = `
    <div class="events-card">
      <h2 class="section-title">Wedding Events</h2>
      <div class="event-details">
        ${EVENTS.map(event => `
          <div class="event-block">
            <h3>${event.type}</h3>
            <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Time:</strong> ${event.time}</p>
            <p><strong>Venue:</strong> ${event.venue}</p>
            <p><strong>Address:</strong> ${event.address}</p>
          </div>
        `).join('')}
      </div>
      <div class="reception-block">
        <h3>Reception</h3>
        <p><strong>Venue:</strong> ${RECEPTION.venue}</p>
        <p><strong>Address:</strong> ${RECEPTION.address}</p>
      </div>
      <div class="color-day-block">
        <h3>Colour of the Day</h3>
        <p>${COLOR_OF_DAY}</p>
      </div>
      <div class="rsvp-block">
        <h3>R.S.V.P</h3>
        <p>${RSVP.join(' / ')}</p>
      </div>
    </div>
  `;
} 