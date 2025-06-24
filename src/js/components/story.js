export function initStory() {
  const storyRoot = document.getElementById('story');
  if (!storyRoot) return;
  storyRoot.innerHTML = `
    <h2 class="section-title">Our Love Story</h2>
    <div class="story-card single-view">
        <p class="story-text">
        Sometimes love is quietly watching from a distance, waiting for the right moment to unfold.<br><br>
        For years, I would visit her house alongside a mutual friend who introduced her to me as his business partner. She was always the quiet one — calm, observant, and reserved. I, too, am an observer by nature, so I noticed her, as I noticed everything — but at the time, my heart was tangled in the remnants of old relationships and unspoken dreams.<br><br>
        She lived in a house shared with other young women — all beautiful, all deserving of love. But there was something different about her silence, something that lingered with me long after each visit. For years, the thought of us remained a passing daydream — nothing more than a fleeting wish while I tried to heal old wounds and mend broken bonds elsewhere.<br><br>
        Then came an unexpected night in 2023 that changed everything. During the fuel scarcity crisis, my car ran out of fuel late at night at the only open filling station in town — and they wouldn't take cards, only cash. Stranded and frustrated, I thought of her. Without hesitation, she drove from miles away, late at night, just to bring me the cash I needed. In that simple act of kindness and sacrifice, I saw her heart clearly for the first time — selfless, caring, and strong.<br><br>
        At that moment, I realized: what more could a man want in a woman than someone so giving?<br><br>
        As fate would have it, a short while later, during the elections, she was posted to my neighborhood as a polling official. When she handed me her voter's card, I couldn't resist checking her age — just to be sure I was older. That little confirmation gave my heart the courage it needed.<br><br>
        By April 2023, I found my moment and asked her to be mine — and she said <b>yes</b>.<br><br>
        Like every true love story, ours has weathered its share of seasons. We parted ways briefly in December, only to find our way back to each other in June 2024 — stronger, wiser, and more certain than ever that what we have is worth every twist and turn.<br><br>
        This is our love — quiet, patient, sacrificial, and beautifully resilient. A story still being written, one precious moment at a time.
      </p>
    </div>
  `;
} 