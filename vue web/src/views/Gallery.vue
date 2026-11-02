<template>
  <div class="gallery-page">
    <section class="gallery-hero" aria-label="8AM gallery highlights">
      <div class="hero-slides" aria-hidden="true">
        <div
          v-for="(slide,index) in heroSlides"
          :key="slide.url"
          class="hero-slide"
          :class="{ active: activeHeroSlide === index }"
          :style="{ backgroundImage: `url(${slide.url})` }"
        ></div>
      </div>
      <div class="hero-color-wash" aria-hidden="true"></div>
      <div class="container hero-copy">
        <p class="section-label">Highlights</p>
        <h1>Spaces, stories, and plates designed to be remembered.</h1>
        <div class="hero-controls" aria-label="Choose gallery background">
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

    <div class="container">
      <div class="filter-buttons">
        <button
          v-for="filter in filters"
          :key="filter"
          @click="selectedFilter = filter"
          :class="{ active: selectedFilter === filter }"
          class="filter-btn"
        >
          {{ filter }}
        </button>
      </div>

      <div class="gallery-grid">
        <article
          v-for="image in filteredImages"
          :key="image.id"
          class="gallery-item"
          tabindex="0"
          @click="selectImage(image)"
          @keydown.enter="selectImage(image)"
        >
          <img :src="image.url" :alt="image.title" @error="useFallbackImage" />
          <div class="gallery-overlay">
            <span>{{ image.title }}</span>
          </div>
        </article>
      </div>
    </div>

    <div v-if="selectedImageData" class="lightbox" @click="selectedImageData = null">
      <div class="lightbox-card" @click.stop>
        <button class="close-btn" @click="selectedImageData = null" aria-label="Close image">×</button>
        <button type="button" class="lightbox-nav previous" aria-label="Previous image" @click="moveLightbox(-1)">‹</button>
        <img class="lightbox-image" :src="selectedImageData.url" :alt="selectedImageData.title" :style="{ transform: `scale(${zoomLevel})` }" @error="useFallbackImage" />
        <button type="button" class="lightbox-nav next" aria-label="Next image" @click="moveLightbox(1)">›</button>
        <div class="lightbox-copy">
          <p class="section-label light-label">Gallery</p>
          <h3>{{ selectedImageData.title }}</h3>
          <p>{{ selectedImageData.description }}</p>
          <div class="lightbox-tools"><button type="button" @click="zoomLevel = Math.min(zoomLevel + 0.2, 2)">Zoom in</button><button type="button" @click="zoomLevel = Math.max(zoomLevel - 0.2, 1)">Zoom out</button><span>{{ lightboxIndex + 1 }} / {{ filteredImages.length }}</span></div>
        </div>
      </div>
    </div>

    <section class="gallery-categories">
      <div class="container">
        <div class="section-heading">
          <p class="section-label">Our story in images</p>
          <h2>Visual journey through 8AM</h2>
        </div>

        <div class="categories-grid">
          <div class="category-card">
            <h3>Interior & ambiance</h3>
            <p>Thoughtfully designed spaces with warm lighting, rich textures, and an atmosphere that makes guests feel welcomed and valued.</p>
          </div>
          <div class="category-card">
            <h3>Artfully plated food</h3>
            <p>Every dish is a culinary statement—crafted with seasonal ingredients, precision techniques, and an unwavering commitment to flavor.</p>
          </div>
          <div class="category-card">
            <h3>Signature cocktails </h3>
            <p>From classics reimagined to original creations, our bartenders craft drinks that elevate every moment and complement every plate.</p>
          </div>
          <div class="category-card">
            <h3>Celebrations & events</h3>
            <p>Whether intimate dinners or grand celebrations, we create memorable experiences with personalized service and attention to detail.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="gallery-callout">
      <div class="container callout-content">
        <h2>Ready to experience 8AM in person?</h2>
        <p>Reserve your table and discover why guests keep coming back for the food, the atmosphere, and the memories.you go have a best experience bro come and seeeeee</p>
        <router-link to="/contact" class="callout-btn">Reserve now</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const selectedFilter = ref('All')
const selectedImageData = ref(null)
const zoomLevel = ref(1)
const activeHeroSlide = ref(0)
let heroTimer

const heroSlides = [
  {
    title: 'Celebrate with us',
    url: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1800&q=85'
  },
  {
    title: 'Signature cocktail bar',
    url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1800&q=85'
  },
  {
    title: 'Main dining room',
    url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1800&q=85'
  },
  {
    title: 'Weekend brunch',
    url: 'https://images.unsplash.com/photo-1504674900036-acb96c0fb6c6?auto=format&fit=crop&w=1800&q=85'
  }
]

const filters = ['All', 'Interior', 'Food', 'Cocktails', 'Events']

const galleryImages = [
  {
    id: 1,
    title: 'Main dining room',
    description: 'Warm lighting, rich textures, and a welcoming atmosphere designed for long conversations.',
    category: 'Interior',
    url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    title: 'Signature cocktail bar',
    description: 'A comfortable, polished bar setup with premium spirits and expertly crafted pours.',
    category: 'Cocktails',
    url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    title: 'Grilled salmon plate',
    description: 'Fresh seafood, seasonal vegetables, and a clean, elegant presentation.',
    category: 'Food',
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 4,
    title: 'Private event setting',
    description: 'A refined event space for celebrations, launches, and intimate gatherings.',
    category: 'Events',
    url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 5,
    title: 'Brunch details',
    description: 'Fresh ingredients and beautifully composed plates made for slow mornings.',
    category: 'Food',
    url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 6,
    title: 'Restaurant lounge',
    description: 'Comfortable seating and layered textures that make the room feel polished and welcoming.',
    category: 'Interior',
    url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 7,
    title: 'Garden spritz',
    description: 'Crisp, floral, and sparkling—the perfect balance for a relaxed evening.',
    category: 'Cocktails',
    url: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 8,
    title: 'Celebrate with us',
    description: 'Elegant setups for birthdays, dinners, and intimate gatherings with memorable service.',
    category: 'Events',
    url: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 9,
    title: 'Dessert craftsmanship',
    description: 'Thoughtfully plated desserts that complete the dining journey with elegance and flavor.',
    category: 'Food',
    url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 10,
    title: 'Wine selection',
    description: 'A curated wine program featuring boutique producers and the perfect pairings for every course.',
    category: 'Cocktails',
    url: 'https://images.unsplash.com/photo-1510812431401-41d2ced4dc8b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 11,
    title: 'Private dining room',
    description: 'An intimate space designed for exclusive gatherings with personalized service and menus.',
    category: 'Interior',
    url: 'https://images.unsplash.com/photo-1519671482677-11fbb007d7dc?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 12,
    title: 'Seasonal appetizers',
    description: "Small bites crafted with care, showcasing the season's finest ingredients.",
    category: 'Food',
    url: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 13,
    title: 'Weekend brunch',
    description: 'Lively, social brunches where friends gather and memories are made over great food.',
    category: 'Events',
    url: 'https://images.unsplash.com/photo-1504674900036-acb96c0fb6c6?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 14,
    title: 'Bar counter detail',
    description: 'Premium spirits, expert mixologists, and a vibrant energy at the heart of our restaurant.',
    category: 'Cocktails',
    url: 'https://images.unsplash.com/photo-1551632786-de41ec16a830?auto=format&fit=crop&w=1200&q=80'
  }
]

const filteredImages = computed(() => {
  if (selectedFilter.value === 'All') return galleryImages
  return galleryImages.filter((image) => image.category === selectedFilter.value)
})

function setHeroSlide(index) {
  activeHeroSlide.value = index
}

function selectImage(image) {
  selectedImageData.value = image
  zoomLevel.value = 1
}

const lightboxIndex = computed(() => filteredImages.value.findIndex((image) => image.id === selectedImageData.value?.id))

function moveLightbox(direction) {
  if (!filteredImages.value.length) return
  const nextIndex = (lightboxIndex.value + direction + filteredImages.value.length) % filteredImages.value.length
  selectImage(filteredImages.value[nextIndex])
}

function useFallbackImage(event) {
  event.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
  event.target.onerror = null
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
.gallery-page {
  width: 100%;
}

.container {
  width: min(1200px, calc(100% - 40px));
  margin: 0 auto;
}

.gallery-hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  min-height: 380px;
  display: flex;
  align-items: center;
}

.hero-slides,
.hero-color-wash {
  position: absolute;
  inset: 0;
}

.hero-slides {
  z-index: -2;
  background: #171614;
}

.hero-slide {
  position: absolute;
  inset: -2%;
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

.hero-color-wash {
  z-index: -1;
  background:
    linear-gradient(90deg, rgba(18, 13, 12, 0.82), rgba(18, 13, 12, 0.32)),
    linear-gradient(135deg, rgba(255, 78, 80, 0.28), rgba(255, 192, 72, 0.08) 52%, rgba(23, 180, 166, 0.3));
}

.hero-copy {
  color: #fff;
  max-width: 760px;
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
  font-size: clamp(2.6rem, 4.8vw, 4.4rem);
  line-height: 1.02;
  letter-spacing: -0.05em;
}

.hero-controls {
  display: flex;
  gap: 10px;
  margin-top: 30px;
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
  background: #ffbf59;
}

.filter-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 42px 0 24px;
}

.filter-btn {
  border: 1px solid rgba(25, 21, 18, 0.14);
  background: #fff;
  color: #171614;
  border-radius: 999px;
  padding: 10px 18px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s ease;
}

.filter-btn.active,
.filter-btn:hover {
  background: #171614;
  border-color: #171614;
  color: #fff;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  padding-bottom: 80px;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  cursor: pointer;
  min-height: 280px;
  box-shadow: 0 12px 24px rgba(17, 14, 13, 0.06);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-item:hover img {
  transform: scale(1.04);
}

.gallery-item:focus-visible {
  outline: 3px solid #c6834c;
  outline-offset: 4px;
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: end;
  justify-content: flex-start;
  padding: 18px 16px;
  background: linear-gradient(180deg, rgba(23, 22, 20, 0), rgba(23, 22, 20, 0.72));
  color: #fff;
  font-weight: 600;
}

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(17, 14, 13, 0.86);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 22px;
  z-index: 50;
}

.lightbox-card {
  position: relative;
  width: min(960px, 100%);
  background: #fff;
  border-radius: 26px;
  overflow: hidden;
}

.lightbox-card img {
  width: 100%;
  max-height: 70vh;
  object-fit: cover;
}

.lightbox-image {
  transition: transform 0.25s ease;
}

.lightbox-nav {
  position: absolute;
  top: 38%;
  z-index: 1;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 50%;
  background: rgba(255,255,255,0.88);
  color: #171614;
  font-size: 2.2rem;
  line-height: 1;
}

.lightbox-nav.previous { left: 16px; }
.lightbox-nav.next { right: 16px; }

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 50%;
  background: rgba(255,255,255,0.82);
  color: #171614;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
}

.lightbox-copy {
  padding: 24px 28px 30px;
}

.light-label {
  margin-bottom: 8px;
}

.lightbox-copy h3 {
  margin-bottom: 10px;
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  color: #171614;
}

.lightbox-copy p:last-child {
  color: #62584e;
  line-height: 1.7;
}

.lightbox-tools {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 18px;
}

.lightbox-tools button {
  min-height: 34px;
  padding: 0 12px;
  border: 1px solid rgba(25,21,18,0.14);
  border-radius: 999px;
  background: #f5efe9;
  color: #171614;
  font-size: 0.8rem;
  font-weight: 700;
}

.lightbox-tools span {
  margin-left: auto;
  color: #62584e;
  font-size: 0.85rem;
}

.gallery-categories {
  padding: 70px 0 60px;
  background: #faf8f5;
}

.section-heading {
  text-align: center;
  margin-bottom: 48px;
}

.section-heading h2 {
  color: #171614;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  line-height: 1.15;
  letter-spacing: -0.03em;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
}

.category-card {
  background: #fff;
  padding: 28px 22px;
  border-radius: 20px;
  border: 1px solid rgba(25, 21, 18, 0.08);
}

.category-card h3 {
  color: #171614;
  font-size: 1.1rem;
  margin-bottom: 10px;
  line-height: 1.3;
}

.category-card p {
  color: #62584e;
  line-height: 1.75;
  font-size: 0.93rem;
}

.gallery-callout {
  background: linear-gradient(135deg, #c6834c, #d9a873);
  padding: 54px 0;
  text-align: center;
}

.callout-content {
  color: #fff;
}

.callout-content h2 {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  line-height: 1.15;
  margin-bottom: 12px;
}

.callout-content p {
  color: rgba(255, 255, 255, 0.88);
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 28px;
}

.callout-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  color: #c6834c;
  padding: 14px 32px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  text-decoration: none;
  transition: 0.25s ease;
}

.callout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(17, 14, 13, 0.15);
}

@media (max-width: 980px) {
  .gallery-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .categories-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .gallery-hero {
    min-height: 430px;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-slide,
  .hero-dot {
    transition: none;
  }
}
</style>
