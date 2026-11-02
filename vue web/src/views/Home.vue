<template>
  <div class="home">
    <section class="hero" aria-label="Restaurant hero section">
      <div class="hero-slides" aria-hidden="true">
        <div
          v-for="(slide, index) in heroSlides"
          :key="slide.url"
          class="hero-slide"
          :class="{ active: activeHeroSlide === index }"
          :style="{ backgroundImage: `url(${slide.url})` }"
        ></div>
      </div>
      <video v-if="heroVideoUrl" class="hero-video" :src="heroVideoUrl" autoplay muted loop playsinline aria-hidden="true"></video>
      <div class="hero-overlay"></div>
      <div class="container hero-inner">
        <p class="eyebrow">Fine dining / cocktails / brunch</p>
        <h1>Elevated dining in the heart of the city.</h1>
        <p class="lead">
          From slow breakfasts to candlelit dinners, 8AM Resto & Bar brings together seasonal ingredients,
          crafted cocktails, and warm hospitality in one elegant setting.
        </p>
        <div class="cta-buttons">
          <router-link to="/menu" class="btn btn-primary">Explore the menu</router-link>
          <router-link to="/contact" class="btn btn-secondary">Book a table</router-link>
        </div>
        <div class="hero-controls" aria-label="Choose hero background">
          <button
            v-for="(slide, index) in heroSlides"
            :key="slide.title"
            class="hero-dot"
            :class="{ active: activeHeroSlide === index }"
            type="button"
            :aria-label="`Show ${slide.title}`"
            :aria-pressed="activeHeroSlide === index"
            @click="setHeroSlide(index)"
          ></button>
        </div>
      </div>
    </section>

    <section class="order-showcase section-spacing" id="menu">
      <div class="container">
        <div class="showcase-header">
          <div>
            <p class="section-label">Order from the kitchen</p>
            <h2>Fire-grilled favorites, crafted to order.</h2>
          </div>
          <div class="showcase-summary">
            <span>{{ filteredMenuItems.length }} dishes on show</span>
            <strong>{{ cartCount }} item{{ cartCount === 1 ? '' : 's' }} in your order</strong>
          </div>
        </div>

        <div class="menu-search-panel">
          <label class="search-field" for="home-search-menu">
            <span class="search-icon">⌕</span>
            <input id="home-search-menu" v-model="menuSearchTerm" type="search" placeholder="Search menu" />
          </label>
        </div>

        <div class="menu-category-strip" aria-label="Menu categories">
          <button
            v-for="category in menuCategories"
            :key="category"
            type="button"
            class="category-pill"
            :class="{ active: selectedMenuCategory === category }"
            @click="selectedMenuCategory = category"
          >
            {{ category }}
          </button>
        </div>

        <div class="order-grid">
          <article v-for="item in filteredMenuItems" :key="item.id" class="order-card">
            <button type="button" class="card-focus" :aria-label="`View ${item.name}`"></button>
            <div class="card-letter" aria-hidden="true">{{ item.initial }}</div>
            <img :src="item.image" :alt="item.name" />
            <div class="card-badges">
              <span v-for="badge in item.badges" :key="badge" class="mini-badge">{{ badge }}</span>
            </div>
            <div class="prep-row">
              <span class="prep-icon">⏱</span>
              <span>~{{ item.prepTime }} min</span>
            </div>
            <div class="item-body">
              <p class="item-category">{{ item.category }}</p>
              <h3>{{ item.name }}</h3>
              <p class="item-description">{{ item.description }}</p>
              <div class="item-footer">
                <div class="item-price-wrap">
                  <strong>{{ item.price }}</strong>
                  <span>from</span>
                </div>
                <button type="button" class="add-button" @click="addToOrder(item.name)">Add {{ item.name }}</button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="status-rail section-spacing">
      <div class="container status-grid">
        <article class="status-card">
          <span class="status-label">Open now</span>
          <h3>Dining from 8:00 AM</h3>
          <p>Morning coffee, brunch, and evening service all day long.</p>
        </article>
        <article class="status-card">
          <span class="status-label">Live reservations</span>
          <h3>18 tables left</h3>
          <p>Book ahead for dinner and the weekend rush.</p>
        </article>
      </div>
    </section>

    <section class="experience section-spacing">
      <div class="container story-grid">
        <div class="story-copy">
          <p class="section-label">Our promise</p>
          <h2>Thoughtful hospitality, exceptional food.</h2>
          <p>
            At 8AM, we believe memorable meals are built on beautiful ingredients, refined execution, and a
            welcoming atmosphere that makes every guest feel at home.
          </p>
          <p>
            Our kitchen celebrates modern comfort classics and elevated seasonal dishes, while our bar menu is
            designed for both relaxed evenings and special celebrations.
          </p>
        </div>
        <div class="story-photo">
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80"
            alt="Restaurant interior and dining atmosphere"
          />
        </div>
      </div>
    </section>

    <section class="features section-spacing">
      <div class="container">
        <div class="section-heading">
          <p class="section-label">Why guests return</p>
          <h2>Crafted for everyday moments and special occasions.</h2>
        </div>

        <div class="features-grid">
          <article class="feature-card">
            <span class="feature-number">01</span>
            <h3>Seasonal menu</h3>
            <p>Fresh ingredients, evolving plates, and chef-curated specials inspired by the season.</p>
          </article>

          <article class="feature-card">
            <span class="feature-number">02</span>
            <h3>Signature cocktails</h3>
            <p>Thoughtfully mixed drinks and a curated wine list designed to pair beautifully with every course.</p>
          </article>

          <article class="feature-card">
            <span class="feature-number">03</span>
            <h3>Private events</h3>
            <p>Warm service, tailored menus, and elegant spaces for intimate dinners, launches, and gatherings.</p>
          </article>

          <article class="feature-card">
            <span class="feature-number">04</span>
            <h3>Concierge service</h3>
            <p>Reservations, celebrations, and dining recommendations handled with care and attention.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="signature section-spacing">
      <div class="container">
        <div class="section-heading row-heading">
          <div>
            <p class="section-label">Popular picks</p>
            <h2>Signature dishes worth returning for.</h2>
          </div>
          <router-link to="/menu" class="text-link">View full menu</router-link>
        </div>

        <div class="dish-grid">
          <article class="dish-card">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80"
              alt="Grilled salmon dish"
            />
            <div class="dish-copy">
              <h3>Charred salmon</h3>
              <p>Seared to perfection with seasonal greens, citrus butter, and herb finish.</p>
            </div>
          </article>

          <article class="dish-card">
            <img
              src="https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80"
              alt="Pasta dish"
            />
            <div class="dish-copy">
              <h3>Truffle pasta</h3>
              <p>Silky parmesan cream, sautéed mushrooms, black pepper, and fresh herbs.</p>
            </div>
          </article>

          <article class="dish-card">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80"
              alt="Dining room and cocktails"
            />
            <div class="dish-copy">
              <h3>Signature bar menu</h3>
              <p>Craft cocktails and classic pours designed for long conversations and late evenings.</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="testimonials section-spacing">
      <div class="container">
        <div class="section-heading center">
          <p class="section-label">Guest feedback</p>
          <h2>Guests remember the details.</h2>
        </div>

        <div class="testimonial-grid">
          <blockquote>
            “The food was beautifully prepared, the room felt elegant, and the service was polished from start to finish.”
            <footer>— Sarah M.</footer>
          </blockquote>
          <blockquote>
            “An exceptional brunch spot with a strong bar program and a relaxed, premium atmosphere.”
            <footer>— Daniel P.</footer>
          </blockquote>
          <blockquote>
            “The team handled our private dinner beautifully. Every detail felt refined and intentional.”
            <footer>— Amara L.</footer>
          </blockquote>
        </div>
      </div>
    </section>

    <section class="pairings section-spacing">
      <div class="container">
        <div class="section-heading center">
          <p class="section-label">Curated selections</p>
          <h2>Wine & cocktail pairings to elevate every course.</h2>
        </div>

        <div class="pairing-grid">
          <article class="pairing-card">
            <div class="pairing-image">
              <img
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80"
                alt="Craft cocktail"
              />
            </div>
            <div class="pairing-copy">
              <h3>Smoked old fashioned</h3>
              <p class="pairing-detail">Bourbon, orange bitters, demerara sugar. A classic reimagined with a subtle charred citrus finish.</p>
              <span class="pairing-price">$16</span>
            </div>
          </article>

          <article class="pairing-card">
            <div class="pairing-image">
              <img
                src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=600&q=80"
                alt="Aperitif"
              />
            </div>
            <div class="pairing-copy">
              <h3>Garden spritz</h3>
              <p class="pairing-detail">Gin, elderflower, cucumber, basil, sparkling tonic. Fresh, floral, and endlessly refreshing.</p>
              <span class="pairing-price">$14</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="chef-specials section-spacing">
      <div class="container">
        <div class="section-heading">
          <p class="section-label">This season</p>
          <h2>Chef's specials — limited time only.</h2>
        </div>

        <div class="special-banner">
          <div class="special-content">
            <p class="special-eyebrow">Available now through September</p>
            <h3>Heirloom tomato carpaccio</h3>
            <p>
              Paper-thin slices of peak-season tomatoes with burrata, fresh basil, aged balsamic, and fleur de sel.
              This is tomato season done right.
            </p>
            <p class="special-availability">Available Monday–Saturday for dinner service</p>
          </div>
          <div class="special-image">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80"
              alt="Chef's seasonal special"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="atmosphere section-spacing">
      <div class="container">
        <div class="section-heading center">
          <p class="section-label">The experience</p>
          <h2>A room where every detail matters.</h2>
        </div>

        <div class="atmosphere-grid">
          <article class="atmosphere-item">
            <p class="section-label small-label">Warm lighting</p>
            <h3>Candlelit comfort</h3>
            <p>Soft ambient lighting and carefully chosen textures create an atmosphere that feels both refined and genuinely welcoming—never stuffy or formal.</p>
          </article>

          <article class="atmosphere-item">
            <p class="section-label small-label">Thoughtful service</p>
            <h3>Personal attention</h3>
            <p>Our team is trained to anticipate needs, know regulars by name, and make every guest feel valued. Service is confident, warm, and never intrusive.</p>
          </article>

          <article class="atmosphere-item">
            <p class="section-label small-label">Live energy</p>
            <h3>Vibrant bar scene</h3>
            <p>The bar is a destination in itself. Pull up a stool for aperitifs, craft cocktails, and conversations that linger long into the evening.</p>
          </article>

          <article class="atmosphere-item">
            <p class="section-label small-label">Private spaces</p>
            <h3>Events & celebrations</h3>
            <p>From intimate dinners to corporate launches, our private dining room offers elegant, adaptable space with the same quality of food and service.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="stories section-spacing">
      <div class="container">
        <div class="section-heading center">
          <p class="section-label">Guest stories</p>
          <h2>Why they come back again and again.</h2>
        </div>

        <div class="story-cards-grid">
          <article class="story-card">
            <div class="story-quote">
              <p>
                "We discovered 8AM by accident and now it's our date-night tradition. The food is consistently excellent, the wine pairings are thoughtful, and the team remembers us every time we walk in. That level of care is rare."
              </p>
              <footer>
                <strong>Laura & Michael</strong>
                <span>Regular guests, 40+ visits</span>
              </footer>
            </div>
          </article>

          <article class="story-card">
            <div class="story-quote">
              <p>
                "We held our rehearsal dinner here last spring. The chef worked with us on a custom menu, the room was transformed beautifully, and every guest left talking about the experience. Highly recommended for events."
              </p>
              <footer>
                <strong>Jennifer H.</strong>
                <span>Private event host</span>
              </footer>
            </div>
          </article>

          <article class="story-card">
            <div class="story-quote">
              <p>
                "The brunch is unmissable. The cocktails are creative, the eggs are perfectly cooked, and the whole vibe feels relaxed but elevated. I bring out-of-town guests here because it captures the best of what dining should be."
              </p>
              <footer>
                <strong>David K.</strong>
                <span>Weekly brunch visitor</span>
              </footer>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="cta-section section-spacing">
      <div class="container cta-inner">
        <div class="cta-copy">
          <p class="section-label">Make your reservation</p>
          <h2>Join us for a meal worth remembering.</h2>
          <p>
            Tables often fill quickly, especially for dinner and weekends. Reserve ahead to guarantee your spot at a night you won't forget.
          </p>
        </div>
        <router-link to="/contact" class="cta-button">Reserve now</router-link>
      </div>
    </section>

    <section class="stats section-spacing">
      <div class="container stats-grid">
        <div class="stat-item">
          <strong>500+</strong>
          <span>guest reservations monthly</span>
        </div>
        <div class="stat-item">
          <strong>15+</strong>
          <span>years of hospitality</span>
        </div>
        <div class="stat-item">
          <strong>40+</strong>
          <span>signature dishes & pours</span>
        </div>
        <div class="stat-item">
          <strong>4.9/5</strong>
          <span>average guest rating</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const activeHeroSlide = ref(0)
const heroVideoUrl = import.meta.env.VITE_HERO_VIDEO_URL || ''
const menuSearchTerm = ref('')
const selectedMenuCategory = ref('All')
const cartCount = ref(0)
let heroTimer

const menuCategories = ['All', 'Fire Grilled', 'Coals & Crust', 'Hearth Roots', 'Fresh Pours', 'Sweet Coals']

const featuredMenuItems = [
  {
    id: 1,
    name: 'Nyama Choma Signature',
    category: 'Fire Grilled',
    description: 'Charcoal-grilled beef ribs, smoked then kissed with ember butter.',
    price: 'RF 9,500',
    prepTime: 25,
    badges: ['Bestseller', 'Chef Pick'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    initial: 'N'
  },
  {
    id: 2,
    name: 'Beef Brochettes',
    category: 'Fire Grilled',
    description: 'Skewers of flame-kissed beef, kanda spice and smoked salt.',
    price: 'RF 4,500',
    prepTime: 14,
    badges: ['Street Icon', 'Fast'],
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80',
    initial: 'B'
  },
  {
    id: 3,
    name: 'Lake Kivu Tilapia',
    category: 'Fire Grilled',
    description: 'Whole tilapia, lemon pepper glaze, grilled over open coals.',
    price: 'RF 11,000',
    prepTime: 22,
    badges: ['Fresh Catch', 'Only 3 left'],
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80',
    initial: 'L'
  },
  {
    id: 4,
    name: 'Ember Smash Burger',
    category: 'Coals & Crust',
    description: 'Double smashed patty, caramelised onion, ember aioli, brioche.',
    price: 'RF 6,500',
    prepTime: 16,
    badges: ['Bestseller'],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    initial: 'E'
  },
  {
    id: 5,
    name: 'Kigali Margherita',
    category: 'Coals & Crust',
    description: 'Wood-grilled base, buffalo mozzarella, basil, charred tomato.',
    price: 'RF 13,000',
    prepTime: 24,
    badges: ['Vegetarian'],
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
    initial: 'K'
  },
  {
    id: 6,
    name: 'Isombe & Ugali',
    category: 'Hearth Roots',
    description: 'Pounded cassava leaves, creamy maize ugali, roasted groundnuts.',
    price: 'RF 5,500',
    prepTime: 20,
    badges: ['Vegetarian', 'Comfort'],
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    initial: 'I'
  },
  {
    id: 7,
    name: 'Hibiscus Iced Tea',
    category: 'Fresh Pours',
    description: 'Kigali-grown hibiscus, steeped cold, mint and lime.',
    price: 'RF 1,800',
    prepTime: 5,
    badges: ['New', 'No Caffeine'],
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80',
    initial: 'H'
  },
  {
    id: 8,
    name: 'Passion Cheesecake',
    category: 'Sweet Coals',
    description: 'Burnt basque cheesecake, passion curd, ember caramel.',
    price: 'RF 5,800',
    prepTime: 8,
    badges: ['Dessert', 'Bestseller'],
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80',
    initial: 'P'
  }
]

const heroSlides = [
  {
    title: 'Restaurant interior',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85'
  },
  {
    title: 'Signature cocktails',
    url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=2000&q=85'
  },
  {
    title: 'Weekend brunch',
    url: 'https://images.unsplash.com/photo-1504674900036-acb96c0fb6c6?auto=format&fit=crop&w=2000&q=85'
  },
  {
    title: 'Private dining',
    url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=85'
  }
]

const filteredMenuItems = computed(() => {
  return featuredMenuItems.filter((item) => {
    const matchesCategory = selectedMenuCategory.value === 'All' || item.category === selectedMenuCategory.value
    const query = menuSearchTerm.value.trim().toLowerCase()
    const matchesSearch = !query || item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)
    return matchesCategory && matchesSearch
  })
})

function setHeroSlide(index) {
  activeHeroSlide.value = index
}

function addToOrder(name) {
  cartCount.value += 1
  window.alert(`${name} added to your order.`)
}

onMounted(() => {
  heroTimer = window.setInterval(() => {
    activeHeroSlide.value = (activeHeroSlide.value + 1) % heroSlides.length
  }, 5000)
})

onBeforeUnmount(() => {
  window.clearInterval(heroTimer)
})
</script>

<style scoped>
.home {
  width: 100%;
}

.section-spacing {
  padding: clamp(64px, 8vw, 96px) 0;
}

.hero + .section-spacing {
  padding-top: clamp(48px, 6vw, 72px);
}

.container {
  width: min(1200px, calc(100% - 40px));
  margin: 0 auto;
}

.eyebrow,
.section-label {
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.72rem;
  font-weight: 700;
  color: #b87743;
  margin-bottom: 14px;
}

.hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: flex;
  align-items: center;
  min-height: 680px;
}

.hero-slides,
.hero-slide,
.hero-video,
.hero-overlay {
  position: absolute;
  inset: 0;
}

.hero-slides {
  z-index: -2;
  background: #171614;
}

.hero-video {
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-slide {
  background-size: cover;
  background-position: center;
  opacity: 0;
  transform: scale(1.04);
  transition: opacity 1.2s ease, transform 6s ease;
}

.hero-slide.active {
  opacity: 1;
  transform: scale(1);
}

.hero-overlay {
  z-index: -1;
  background:
    linear-gradient(90deg, rgba(17, 14, 13, 0.8), rgba(17, 14, 13, 0.4));
}

.hero-inner {
  position: relative;
  z-index: 1;
  max-width: 760px;
  color: #fff;
}

.hero h1 {
  font-size: clamp(2.8rem, 5vw, 5rem);
  line-height: 0.95;
  letter-spacing: -0.05em;
  margin-bottom: 22px;
  color: #fff;
}

.lead {
  max-width: 620px;
  color: rgba(255,255,255,0.82);
  font-size: 1.12rem;
  line-height: 1.75;
  margin-bottom: 30px;
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 0 28px;
  border-radius: 999px;
  text-decoration: none;
  transition: 0.25s ease;
  font-weight: 600;
}

.btn-primary {
  background: linear-gradient(135deg, #c6834c, #d9a873);
  color: #171614;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(198, 131, 76, 0.28);
}

.btn-secondary {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
}

.btn-secondary:hover {
  background: rgba(255,255,255,0.14);
}

.hero-controls {
  display: flex;
  gap: 10px;
  margin-top: 28px;
}

.hero-meta {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
  padding: 8px 14px;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 999px;
  background: rgba(17,14,13,0.28);
  backdrop-filter: blur(8px);
}

.hero-live-status,
.hero-speed {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.9);
}

.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #7de39a;
  box-shadow: 0 0 0 5px rgba(125, 227, 154, 0.18);
}

.hero-dot {
  width: 34px;
  height: 5px;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.48);
  transition: width 0.25s ease, background 0.25s ease;
}

.hero-dot:hover,
.hero-dot.active {
  width: 54px;
  background: #d9a873;
}

.order-showcase {
  background: #f8f3ef;
}

.showcase-header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: end;
  margin-bottom: 28px;
}

.showcase-header h2 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
  color: #171614;
}

.showcase-summary {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  color: #62584e;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.showcase-summary strong {
  color: #9d6233;
}

.menu-search-panel {
  margin-bottom: 20px;
}

.search-field {
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 460px;
  padding: 0 16px;
  border: 1px solid rgba(25, 21, 18, 0.12);
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 8px 22px rgba(17, 14, 13, 0.04);
}

.search-field input {
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  min-height: 52px;
  font: inherit;
  color: #171614;
}

.search-icon {
  font-size: 1.2rem;
  color: #b87743;
}

.menu-category-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 28px;
}

.category-pill {
  padding: 0.82rem 1.2rem;
  border: 1px solid rgba(25, 21, 18, 0.12);
  border-radius: 999px;
  background: #fff;
  color: #171614;
  font-weight: 600;
  transition: all 0.2s ease;
}

.category-pill.active,
.category-pill:hover {
  background: #171614;
  color: #fff;
  border-color: #171614;
}

.order-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;
}

.order-card {
  position: relative;
  overflow: hidden;
  background: #fff;
  border-radius: 24px;
  border: 1px solid rgba(25, 21, 18, 0.12);
  box-shadow: 0 18px 35px rgba(17, 14, 13, 0.05);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.order-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 38px rgba(17, 14, 13, 0.08);
}

.card-focus {
  position: absolute;
  inset: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.card-letter {
  position: absolute;
  top: 18px;
  left: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(17,14,13,0.7);
  color: #fff;
  font-weight: 700;
  z-index: 1;
}

.order-card img {
  width: 100%;
  height: 210px;
  object-fit: cover;
  display: block;
}

.card-badges {
  position: absolute;
  top: 18px;
  right: 18px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
  z-index: 1;
}

.mini-badge {
  display: inline-flex;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255,255,255,0.9);
  color: #171614;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.prep-row {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px 0;
  color: #6c625b;
  font-size: 0.8rem;
  font-weight: 600;
}

.prep-icon {
  color: #b87743;
}

.item-body {
  padding: 14px 16px 18px;
}

.item-category {
  margin: 0 0 10px;
  color: #b87743;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.item-body h3 {
  margin: 0 0 10px;
  font-size: 1.4rem;
  color: #171614;
}

.item-description {
  margin: 0 0 16px;
  color: #62584e;
  line-height: 1.7;
  min-height: 72px;
}

.item-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: 12px;
}

.item-price-wrap {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.item-price-wrap strong {
  font-size: 1.15rem;
  color: #171614;
}

.item-price-wrap span {
  color: #62584e;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.add-button {
  border: 0;
  border-radius: 999px;
  padding: 0.8rem 1rem;
  background: #171614;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}

.story-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 48px;
  align-items: center;
}

.story-copy h2,
.section-heading h2 {
  margin: 0 0 18px;
  color: #171614;
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  line-height: 1.1;
}

.story-copy p {
  color: var(--muted, #62584e);
  line-height: 1.9;
  margin-bottom: 18px;
  font-size: 1.04rem;
}

.story-photo img {
  width: 100%;
  height: 560px;
  object-fit: cover;
  border-radius: 26px;
  box-shadow: var(--shadow, 0 20px 45px rgba(24, 18, 12, 0.12));
}

.status-rail {
  padding-top: 34px;
  padding-bottom: 0;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.status-card {
  background: rgba(255,255,255,0.7);
  border: 1px solid rgba(25, 21, 18, 0.08);
  border-radius: 20px;
  padding: 26px 22px;
  box-shadow: 0 18px 36px rgba(17, 14, 13, 0.04);
}

.status-card.special {
  background: linear-gradient(135deg, rgba(198, 131, 76, 0.12), rgba(255,255,255,0.8));
}

.status-label {
  display: inline-block;
  margin-bottom: 10px;
  color: #b87743;
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
}

.status-card h3 {
  color: #171614;
  font-size: 1.42rem;
  margin-bottom: 10px;
}

.status-card p {
  color: #62584e;
  line-height: 1.7;
  font-size: 0.95rem;
}

.features {
  background: #f4efe9;
}

.section-heading {
  margin-bottom: 36px;
}

.center {
  text-align: center;
}

.row-heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 24px;
}

.text-link {
  color: #b87743;
  font-weight: 600;
  text-decoration: none;
}

.features-grid,
.dish-grid,
.testimonial-grid,
.stats-grid {
  display: grid;
  gap: 26px;
}

.features-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.feature-card {
  background: #fff;
  border: 1px solid var(--line, rgba(25, 21, 18, 0.12));
  border-radius: 22px;
  padding: 30px 22px;
  box-shadow: 0 8px 24px rgba(17, 14, 13, 0.04);
}

.feature-number {
  display: inline-block;
  color: #b87743;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  font-weight: 700;
  margin-bottom: 18px;
}

.feature-card h3 {
  font-size: 1.45rem;
  margin-bottom: 12px;
  color: #171614;
}

.feature-card p {
  color: #62584e;
  line-height: 1.75;
}

.dish-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.dish-card {
  background: #fff;
  overflow: hidden;
  border-radius: 22px;
  border: 1px solid var(--line, rgba(25, 21, 18, 0.12));
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.dish-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 30px rgba(17, 14, 13, 0.06);
}

.dish-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.dish-copy {
  padding: 22px 22px 28px;
}

.dish-copy h3 {
  margin-bottom: 10px;
  color: #171614;
  font-size: 1.6rem;
}

.dish-copy p {
  color: #62584e;
  line-height: 1.7;
}

.testimonials {
  background: #fff;
}

.testimonial-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

blockquote {
  background: #f7f3ee;
  border: 1px solid var(--line, rgba(25, 21, 18, 0.12));
  border-radius: 22px;
  padding: 28px 24px;
  color: #2a241f;
  line-height: 1.8;
  font-size: 1.04rem;
}

blockquote footer {
  margin-top: 16px;
  color: #b87743;
  font-weight: 700;
}

.stats {
  background: linear-gradient(135deg, #171614, #2a241f);
}

.stats-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.stat-item {
  text-align: center;
  color: #fff;
}

.stat-item strong {
  display: block;
  font-size: clamp(2rem, 3vw, 3rem);
  color: #d9a873;
  margin-bottom: 10px;
}

.stat-item span {
  color: rgba(255,255,255,0.76);
}

/* Pairings Section */
.pairings {
  background: #fff;
}

.pairing-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.testimonial-grid > * {
  min-width: 0;
}

.pairing-card {
  background: #fff;
  border: 1px solid rgba(25, 21, 18, 0.12);
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(17, 14, 13, 0.04);
  transition: transform 0.25s ease;
}

.pairing-card:hover {
  transform: translateY(-4px);
}

.pairing-image {
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.pairing-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pairing-copy {
  padding: 18px 16px 20px;
}

.pairing-copy h3 {
  font-size: 1.4rem;
  color: #171614;
  margin-bottom: 8px;
}

.pairing-detail {
  color: #62584e;
  line-height: 1.7;
  margin-bottom: 12px;
  font-size: 0.95rem;
}

.pairing-price {
  display: inline-block;
  color: #b87743;
  font-weight: 700;
  font-size: 0.9rem;
}

/* Chef Specials Section */
.chef-specials {
  background: #f4efe9;
}

.special-banner {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 40px;
  align-items: center;
  background: #fff;
  border-radius: 28px;
  padding: 50px 42px;
  border: 1px solid rgba(25, 21, 18, 0.12);
  box-shadow: 0 16px 32px rgba(17, 14, 13, 0.06);
}

.special-content h3 {
  font-size: 2.2rem;
  color: #171614;
  margin: 12px 0 16px;
}

.special-eyebrow {
  display: inline-block;
  color: #b87743;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 10px;
}

.special-content p {
  color: #62584e;
  line-height: 1.8;
  margin-bottom: 14px;
}

.special-availability {
  color: #9d6233;
  font-size: 0.92rem;
  font-weight: 600;
}

.special-image {
  width: 100%;
  height: 360px;
  overflow: hidden;
  border-radius: 22px;
}

.special-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Atmosphere Section */
.atmosphere {
  background: linear-gradient(135deg, #171614, #2a241f);
}

.atmosphere-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
}

.atmosphere-item {
  color: #fff;
}

.small-label {
  color: #d9a873;
  margin-bottom: 10px;
}

.atmosphere-item h3 {
  font-size: 1.7rem;
  color: #fff;
  margin-bottom: 12px;
}

.atmosphere-item p {
  color: rgba(255,255,255,0.82);
  line-height: 1.8;
  font-size: 1rem;
}

/* Guest Stories Section */
.stories {
  background: #fff;
}

.story-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
}

.story-card {
  background: #f7f3ee;
  border: 1px solid rgba(25, 21, 18, 0.12);
  border-radius: 22px;
  padding: 28px 24px;
  box-shadow: 0 10px 24px rgba(17, 14, 13, 0.04);
}

.story-quote {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.story-quote p {
  color: #2a241f;
  line-height: 1.85;
  font-size: 1.02rem;
}

.story-quote footer {
  border-top: 1px solid rgba(25, 21, 18, 0.2);
  padding-top: 14px;
}

.story-quote strong {
  display: block;
  color: #171614;
  font-size: 1.02rem;
  margin-bottom: 4px;
}

.story-quote span {
  color: #b87743;
  font-size: 0.92rem;
  font-weight: 600;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #c6834c, #9d6233);
}

.cta-inner {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 40px;
  align-items: center;
}

.cta-copy {
  color: #fff;
}

.cta-copy h2 {
  color: #fff;
  margin-bottom: 12px;
}

.cta-copy p {
  color: rgba(255,255,255,0.88);
  font-size: 1.05rem;
  line-height: 1.7;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 54px;
  padding: 0 32px;
  border-radius: 999px;
  background: #fff;
  color: #9d6233;
  font-weight: 700;
  text-decoration: none;
  transition: 0.25s ease;
  white-space: nowrap;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.2);
}

@media (max-width: 960px) {
  .order-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .status-grid,
  .story-grid,
  .features-grid,
  .dish-grid,
  .testimonial-grid,
  .stats-grid,
  .pairing-grid,
  .story-cards-grid,
  .atmosphere-grid,
  .special-banner {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 680px) {
  .section-spacing {
    padding: 56px 0;
  }

  .order-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .item-description {
    min-height: 0;
  }

  .item-footer {
    align-items: center;
  }

  .add-button {
    max-width: 65%;
    min-height: 44px;
    white-space: normal;
    line-height: 1.3;
  }

  .status-grid,
  .story-grid,
  .features-grid,
  .dish-grid,
  .testimonial-grid,
  .stats-grid,
  .pairing-grid,
  .story-cards-grid,
  .atmosphere-grid,
  .special-banner,
  .row-heading,
  .cta-inner {
    grid-template-columns: 1fr;
    display: grid;
  }

  .row-heading {
    align-items: start;
  }

  .story-photo img {
    height: 360px;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  .cta-button {
    width: 100%;
  }
}
</style>
