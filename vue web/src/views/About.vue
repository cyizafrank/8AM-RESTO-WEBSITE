<template>
  <div class="about-page">
    <section class="about-hero">
      <div class="container hero-copy">
        <p class="section-label">Our story</p>
        <h1>Hospitality shaped by craft, warmth, and consistency.</h1>
      </div>
    </section>

    <div class="container">
      <section class="story-grid">
        <div class="story-copy">
          <p class="section-label">Since 2009</p>
          <h2>A neighborhood dining room with a polished point of view.</h2>
          <p>
            8AM Resto & Bar began as a simple breakfast-first concept and evolved into a destination for elevated dining,
            handcrafted cocktails, and meaningful hospitality. Our philosophy is straightforward: serve beautiful food, welcome
            guests warmly, and create an atmosphere that feels both refined and genuinely comfortable.
          </p>
          <p>
            Every dish is shaped by seasonal ingredients, classic technique, and thoughtful presentation. Our team pairs this
            culinary focus with service that is personal, confident, and polished—so each visit feels like a memorable experience.
          </p>
        </div>

        <div class="story-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80"
            alt="Restaurant exterior and warm hospitality"
          />
        </div>
      </section>

      <section class="values-section">
        <div class="section-heading">
          <p class="section-label">What guides us</p>
          <h2>Built on quality, care, and a love for good food.</h2>
        </div>

        <div class="values-grid">
          <article class="value-card">
            <h3>Ingredient-first</h3>
            <p>We source thoughtfully, prioritize freshness, and build menus around authentic flavor and consistency.</p>
          </article>

          <article class="value-card">
            <h3>Warm service</h3>
            <p>Every guest deserves attentive, genuine hospitality—whether they are joining us for lunch or a celebration.</p>
          </article>

          <article class="value-card">
            <h3>Seasonal craft</h3>
            <p>Our menu evolves with the season, allowing creativity to respond to what is freshest and most exciting.</p>
          </article>

          <article class="value-card">
            <h3>Community care</h3>
            <p>We support local producers and create a space where neighborhoods, friends, and families can gather.</p>
          </article>
        </div>
      </section>

      <section class="team-section">
        <div class="section-heading center">
          <p class="section-label">Leadership</p>
          <h2>Meet the people shaping our experience.</h2>
        </div>

        <div class="team-grid">
          <article class="team-card">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80"
              alt="Executive chef portrait"
            />
            <div class="team-copy">
              <h3>Marco Giordano</h3>
              <p class="role">Executive Chef</p>
              <p>Known for refined technique and seasonal creativity, Marco leads the kitchen with precision and taste.</p>
            </div>
          </article>

          <article class="team-card">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80"
              alt="Restaurant manager portrait"
            />
            <div class="team-copy">
              <h3>Elena Hart</h3>
              <p class="role">Restaurant Manager</p>
              <p>Elena brings warmth, structure, and a guest-first mindset to every service and special occasion.</p>
            </div>
          </article>

          <article class="team-card">
            <img
              src="https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80"
              alt="Head bartender portrait"
            />
            <div class="team-copy">
              <h3>Jules Baird</h3>
              <p class="role">Head Bartender</p>
              <p>Jules curates a cocktail program that balances classic craft with contemporary, memorable flavor.</p>
            </div>
          </article>
        </div>
      </section>

      <section class="awards-section">
        <div class="section-heading center">
          <p class="section-label">Recognition</p>
          <h2>Trusted by guests and celebrated across the city.</h2>
        </div>

        <div class="award-grid">
          <article class="award-card">
            <h3>Local dining award</h3>
            <p>Best Neighborhood Restaurant 2024</p>
          </article>
          <article class="award-card">
            <h3>Culinary excellence</h3>
            <p>Chef’s Choice, seasonal tasting menu</p>
          </article>
          <article class="award-card">
            <h3>Hospitality honors</h3>
            <p>Outstanding guest experience and service</p>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  width: 100%;
}

.container {
  width: min(1200px, calc(100% - 40px));
  margin: 0 auto;
}

.about-hero {
  min-height: 380px;
  display: flex;
  align-items: center;
  background:
    linear-gradient(90deg, rgba(17, 14, 13, 0.72), rgba(17, 14, 13, 0.46)),
    url('https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1800&q=80');
  background-size: cover;
  background-position: center;
}

.hero-copy {
  max-width: 760px;
  color: #fff;
  padding: 60px 0;
}

.section-label {
  display: inline-block;
  margin-bottom: 12px;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: #d9a873;
}

.hero-copy h1 {
  color: #fff;
  font-size: clamp(2.6rem, 5vw, 4.5rem);
  line-height: 1.02;
  letter-spacing: -0.05em;
}

.story-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 44px;
  padding: 90px 0 30px;
  align-items: center;
}

.story-copy h2,
.section-heading h2 {
  color: #171614;
  font-size: clamp(2.3rem, 4vw, 3.2rem);
  line-height: 1.1;
  letter-spacing: -0.04em;
  margin-bottom: 20px;
}

.story-copy p {
  color: #62584e;
  line-height: 1.9;
  margin-bottom: 16px;
}

.story-image-wrap img {
  width: 100%;
  height: 560px;
  object-fit: cover;
  border-radius: 26px;
  box-shadow: 0 20px 45px rgba(24, 18, 12, 0.12);
}

.values-section,
.team-section,
.awards-section {
  padding: 90px 0 0;
}

.center {
  text-align: center;
}

.values-grid, .team-grid, .award-grid {
  display: grid;
  gap: 24px;
}

.values-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.value-card, .award-card {
  background: #fff;
  border: 1px solid rgba(25, 21, 18, 0.12);
  border-radius: 22px;
  padding: 26px 22px;
  box-shadow: 0 8px 24px rgba(17, 14, 13, 0.04);
}

.value-card h3, .award-card h3 {
  margin-bottom: 12px;
  color: #171614;
  font-size: 1.5rem;
}

.value-card p, .award-card p {
  color: #62584e;
  line-height: 1.8;
}

.team-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.team-card {
  background: #fff;
  border: 1px solid rgba(25, 21, 18, 0.12);
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 10px 22px rgba(17, 14, 13, 0.04);
}

.team-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.team-copy {
  padding: 22px 20px 24px;
}

.team-copy h3 {
  font-size: 1.65rem;
  color: #171614;
  margin-bottom: 6px;
}

.role {
  color: #b87743;
  font-weight: 700;
  margin-bottom: 8px;
}

.team-copy p:last-child {
  color: #62584e;
  line-height: 1.8;
}

.award-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding-bottom: 90px;
}

@media (max-width: 960px) {
  .story-grid,
  .values-grid,
  .team-grid,
  .award-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .story-grid,
  .values-grid,
  .team-grid,
  .award-grid {
    grid-template-columns: 1fr;
  }

  .story-image-wrap img {
    height: 360px;
  }
}
</style>
