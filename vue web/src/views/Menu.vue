<template>
  <div class="menu-page">
    <section class="menu-hero">
      <div class="container hero-copy">
        <p class="section-label">Chef's selection</p>
        <h1>Seasonal plates, handcrafted cocktails, and indulgent desserts.</h1>
        <p>
          Crafted for slow mornings, lively lunches, and unforgettable evening dinners.
        </p>
      </div>
    </section>

    <div class="container">
      <div class="menu-tools">
        <div class="menu-search">
          <label for="menu-search">Search menu</label>
          <input id="menu-search" v-model="searchTerm" type="text" placeholder="Try pasta, taco, brunch, cocktails" />
        </div>
        <div class="menu-summary">
          <span>{{ filteredMenu.length }} dishes</span>
          <span>{{ selectedCategory }}</span>
          <select v-model="sortOrder" aria-label="Sort dishes by price">
            <option value="featured">Featured order</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
          <button type="button" class="print-menu" @click="printMenu">Print menu</button>
        </div>
      </div>

      <div class="category-tabs" aria-label="Menu categories">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="{ active: selectedCategory === category }"
          class="tab-btn"
        >
          {{ category }}
        </button>
      </div>

      <div class="dietary-filters" aria-label="Dietary filters">
        <button
          v-for="option in dietaryOptions"
          :key="option"
          type="button"
          class="dietary-filter"
          :class="{ active: selectedDietary === option }"
          @click="selectedDietary = option"
        >
          {{ option }}
        </button>
      </div>

      <div v-if="filteredMenu.length" class="menu-grid">
        <article v-for="item in filteredMenu" :key="item.id" class="menu-card" tabindex="0" @click="selectDish(item)" @keydown.enter="selectDish(item)">
          <div class="menu-image" :style="{ backgroundImage: `url(${item.image})` }" role="img" :aria-label="item.name"></div>

          <div class="menu-content">
            <div class="menu-topline">
              <h3>{{ item.name }}</h3>
              <span class="price">${{ item.price }}</span>
            </div>
            <p>{{ item.description }}</p>
            <div class="item-tags">
              <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <button type="button" class="details-link" @click.stop="selectDish(item)">View ingredients & pairings <span aria-hidden="true">↗</span></button>
          </div>
        </article>
      </div>

      <div v-else class="empty-state">
        <p>No dishes match your search. Try another ingredient or category.</p>
      </div>
    </div>

    <div v-if="selectedDish" class="dish-modal" role="dialog" aria-modal="true" aria-labelledby="dish-title" @click.self="selectedDish = null">
      <div class="dish-modal-card">
        <button type="button" class="dish-close" aria-label="Close dish details" @click="selectedDish = null">×</button>
        <img :src="selectedDish.image" :alt="selectedDish.name" @error="useFallbackImage" />
        <div class="dish-modal-copy">
          <p class="section-label">{{ selectedDish.category }}</p>
          <div class="dish-modal-heading"><h2 id="dish-title">{{ selectedDish.name }}</h2><strong>${{ selectedDish.price }}</strong></div>
          <p>{{ selectedDish.description }}</p>
          <div class="dish-detail-grid">
            <div><span>Ingredients</span><p>{{ selectedDish.ingredients }}</p></div>
            <div><span>Nutrition</span><p>{{ selectedDish.nutrition }}</p></div>
            <div><span>Allergens</span><p>{{ selectedDish.allergens }}</p></div>
            <div><span>Best with</span><p>{{ selectedDish.pairing }}</p></div>
          </div>
          <button type="button" class="chef-audio" @click="speakDish(selectedDish)">{{ isSpeaking ? 'Playing chef note...' : 'Listen to the chef note' }} <span aria-hidden="true">◉</span></button>
        </div>
      </div>
    </div>

    <section class="menu-note">
      <div class="container note-box">
        <p class="section-label">Dining notes</p>
        <h2>Need a recommendation?</h2>
        <p>Our team can guide you through the menu based on mood, occasion, and preferred pairing.</p>
      </div>
    </section>

    <section class="featured-section">
      <div class="container">
        <div class="section-heading center">
          <p class="section-label">Editor's choice</p>
          <h2>Dishes our guests order again and again.</h2>
        </div>

        <div class="featured-grid">
          <article class="featured-item">
            <div class="featured-badge">Most popular</div>
            <img src="https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=900&q=80" alt="Truffle pasta" />
            <div class="featured-copy">
              <h3>Truffle mushroom pasta</h3>
              <p class="featured-note">Chef Marco's signature dish. House-made pasta with wild mushrooms, parmesan cream, and black pepper.</p>
              <p class="featured-why">Why guests love it: Perfectly balanced, luxurious comfort in every bite.</p>
              <span class="featured-price">$24</span>
            </div>
          </article>

          <article class="featured-item">
            <div class="featured-badge">Chef's pick</div>
            <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80" alt="Seared beef" />
            <div class="featured-copy">
              <h3>Seared beef tenderloin</h3>
              <p class="featured-note">Prime cut, potato pavé, seasonal greens, and a silky red wine reduction.</p>
              <p class="featured-why">Why guests love it: Perfectly seared, melt-in-mouth tenderness.</p>
              <span class="featured-price">$32</span>
            </div>
          </article>

          <article class="featured-item">
            <div class="featured-badge">Evening favorite</div>
            <img src="https://images.unsplash.com/photo-11470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80" alt="Garden spritz" />
            <div class="featured-copy">
              <h3>Garden spritz</h3>
              <p class="featured-note">Gin, elderflower, cucumber, basil, sparkling tonic. Crisp and floral.</p>
              <p class="featured-why">Why guests love it: Refreshing, light, and perfectly balanced for any time.</p>
              <span class="featured-price">$14</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="dietary-section">
      <div class="container">
        <div class="section-heading center">
          <p class="section-label">Dietary preferences</p>
          <h2>We adapt. Just let us know.</h2>
        </div>

        <div class="dietary-grid">
          <div class="dietary-item">
            <h3>Vegetarian & vegan</h3>
            <p>Many dishes can be adapted. Ask your server for creative vegetable-forward options.</p>
          </div>
          <div class="dietary-item">
            <h3>Gluten-free</h3>
            <p>We offer gluten-free pasta and can modify most dishes. Our kitchen takes cross-contamination seriously.</p>
          </div>
          <div class="dietary-item">
            <h3>Allergies & restrictions</h3>
            <p>Please inform your server. Our team is trained to accommodate allergies and dietary restrictions with care.</p>
          </div>
          <div class="dietary-item">
            <h3>Pescatarian</h3>
            <p>Our seafood selection is extensive. Chef can create custom plates based on your preferences.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="pairings-section">
      <div class="container">
        <div class="section-heading">
          <p class="section-label">Wine & cocktails</p>
          <h2>Thoughtfully paired for every course.</h2>
        </div>

        <div class="pairings-info">
          <div class="pairing-block">
            <h3>By the glass</h3>
            <p>A rotating selection of boutique wines poured fresh. Ask your server for seasonal recommendations.</p>
          </div>
          <div class="pairing-block">
            <h3>Signature cocktails</h3>
            <p>Our bartenders craft original cocktails designed to pair with specific courses or stand alone.</p>
          </div>
          <div class="pairing-block">
            <h3>Wine pairings</h3>
            <p>Choose a flight with any course or pair the full menu. Professional guidance included.</p>
          </div>
          <div class="pairing-block">
            <h3>Non-alcoholic</h3>
            <p>House-made sodas, fresh juices, and sophisticated zero-proof cocktails available.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="pairing-guide-section">
      <div class="container pairing-guide">
        <div><p class="section-label">Pairing guide</p><h2>Choose a plate. We will pour the match.</h2></div>
        <label>Choose an entree<select v-model="pairingDish"><option v-for="item in menuItems.filter((item) => ['Lunch', 'Dinner'].includes(item.category))" :key="item.id" :value="item.id">{{ item.name }}</option></select></label>
        <div class="pairing-result"><span>Recommended pour</span><strong>{{ selectedPairing.pairing }}</strong><p>{{ selectedPairing.pairingNote }}</p></div>
      </div>
    </section>

    <section class="cocktail-builder-section">
      <div class="container cocktail-builder">
        <div><p class="section-label">Cocktail builder</p><h2>Tell us your mood. We will find your pour.</h2><p>Choose a flavor profile for a quick recommendation from the bar.</p></div>
        <div class="flavor-options"><button v-for="flavor in flavorProfiles" :key="flavor" type="button" :class="{ active: selectedFlavor === flavor }" @click="selectedFlavor = flavor">{{ flavor }}</button></div>
        <div class="cocktail-result"><span>Your match</span><strong>{{ cocktailRecommendation.name }}</strong><p>{{ cocktailRecommendation.description }}</p><small>{{ cocktailRecommendation.price }}</small></div>
      </div>
    </section>

    <section class="reserve-cta">
      <div class="container cta-content">
        <h2>Ready to experience 8AM?</h2>
        <p>Tables fill up quickly, especially for dinner and weekends. Reserve your spot to ensure a seamless evening.</p>
        <router-link to="/contact" class="cta-reserve-btn">Reserve now</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedCategory = ref('Breakfast')
const searchTerm = ref('')
const selectedDietary = ref('All')
const sortOrder = ref('featured')
const selectedDish = ref(null)
const isSpeaking = ref(false)
const pairingDish = ref(5)
const selectedFlavor = ref('Citrus')
const flavorProfiles = ['Citrus', 'Sweet', 'Smoky', 'Bitter']
const cocktailRecommendations = {
  Citrus: { name: 'Garden spritz', description: 'Gin, elderflower, cucumber, basil, and sparkling tonic.', price: '$14' },
  Sweet: { name: 'Berry champagne', description: 'Seasonal berries, vanilla, citrus, and sparkling wine.', price: '$15' },
  Smoky: { name: 'Smoked orange old fashioned', description: 'Bourbon, orange bitters, demerara, and charred citrus.', price: '$16' },
  Bitter: { name: 'Boulevardier', description: 'Bourbon, bitter aperitif, sweet vermouth, and orange oil.', price: '$15' }
}
const categories = ['Breakfast', 'Lunch', 'Dinner', 'Appetizers', 'Cocktails', 'Desserts']
const dietaryOptions = ['All', 'Vegetarian', 'Vegan', 'Gluten-free', 'Pescatarian', 'Nut-free', 'Dairy-free']
const dietaryById = {
  1: ['Vegetarian'],
  2: ['Vegetarian', 'Gluten-free'],
  3: ['Gluten-free', 'Pescatarian'],
  4: ['Vegetarian'],
  6: ['Gluten-free', 'Pescatarian'],
  8: ['Vegetarian', 'Gluten-free'],
  10: ['Vegan', 'Gluten-free'],
  11: ['Vegetarian'],
  12: ['Vegetarian', 'Gluten-free'],
  13: ['Gluten-free', 'Dairy-free'],
  14: ['Vegetarian', 'Gluten-free'],
  15: ['Gluten-free', 'Pescatarian']
}

const menuItems = [
  {
    id: 1,
    category: 'Breakfast',
    name: 'Avocado toast curation',
    price: 16,
    description: 'Sourdough, whipped feta, cherry tomatoes, chili oil, and a soft poached egg.',
    tags: ['Chef favorite', 'Fresh'],
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    category: 'Breakfast',
    name: 'Citrus brunch bowl',
    price: 14,
    description: 'Mango, granola, yogurt, berries, pistachio, and honeyed citrus drizzle.',
    tags: ['Light', 'Seasonal'],
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    category: 'Lunch',
    name: 'Grilled salmon salad',
    price: 22,
    description: 'Charred salmon, mixed greens, fennel, lemon vinaigrette, and toasted seeds.',
    tags: ['Popular', 'Healthy'],
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 4,
    category: 'Lunch',
    name: 'Truffle mushroom pasta',
    price: 24,
    description: 'House-made pasta, wild mushrooms, parmesan cream, and black pepper finish.',
    tags: ['Comfort', 'Signature'],
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 5,
    category: 'Dinner',
    name: 'Seared beef tenderloin',
    price: 32,
    description: 'Prime cut, potato pavé, seasonal greens, and a red wine reduction.',
    tags: ['Premium', 'Chef pick'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 6,
    category: 'Dinner',
    name: 'Cedar grilled fish',
    price: 28,
    description: 'Fresh catch with saffron rice, charred greens, and herb butter glaze.',
    tags: ['Seafood', 'Fresh'],
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 7,
    category: 'Appetizers',
    name: 'Crispy calamari',
    price: 13,
    description: 'Lightly fried squid with lemon aioli, herbs, and a spicy-sweet glaze.',
    tags: ['Shareable', 'Bar favorite'],
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 8,
    category: 'Appetizers',
    name: 'Charred burrata board',
    price: 15,
    description: 'Creamy burrata, grilled vegetables, basil oil, and artisan sourdough.',
    tags: ['Vegetarian', 'Elegant'],
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 9,
    category: 'Cocktails',
    name: 'Smoked orange old fashioned',
    price: 16,
    description: 'Bourbon, orange bitters, demerara, and a subtle charred citrus finish.',
    tags: ['Classic', 'Signature'],
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 10,
    category: 'Cocktails',
    name: 'Garden spritz',
    price: 14,
    description: 'Gin, elderflower, cucumber, basil, and sparkling tonic with a fresh floral note.',
    tags: ['Refreshing', 'Botanical'],
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 11,
    category: 'Desserts',
    name: 'Chocolate lava cake',
    price: 12,
    description: 'Warm dark chocolate center with vanilla bean ice cream and cocoa nib crunch.',
    tags: ['Classic', 'Decadent'],
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 12,
    category: 'Desserts',
    name: 'Vanilla crème brûlée',
    price: 11,
    description: 'Silky vanilla custard with a crisp caramelized sugar top and fresh berries.',
    tags: ['Elegant', 'Light'],
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 13,
    category: 'Dinner',
    name: 'Roasted half chicken',
    price: 26,
    description: 'Crisp skin, garlic jus, roasted carrots, and rosemary potatoes.',
    tags: ['Comfort', 'Gluten-free'],
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 14,
    category: 'Dinner',
    name: 'Wild mushroom risotto',
    price: 23,
    description: 'Arborio rice, forest mushrooms, parmesan, and fresh thyme.',
    tags: ['Vegetarian', 'Seasonal'],
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 15,
    category: 'Dinner',
    name: 'Citrus glazed sea bass',
    price: 30,
    description: 'Pan-seared sea bass, citrus beurre blanc, and shaved fennel.',
    tags: ['Seafood', 'Chef pick'],
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80'
  }
]

const dishDetails = {
  1: ['Sourdough, whipped feta, tomato, chili oil, poached egg.', '520 cal · 18g protein', 'Wheat, dairy, egg', 'Garden spritz', 'Cucumber and elderflower brighten the creamy feta.'],
  2: ['Mango, yogurt, berries, granola, pistachio, citrus.', '380 cal · 12g protein', 'Dairy, nuts', 'Citrus mimosa', 'Fresh citrus keeps this bright and balanced.'],
  3: ['Salmon, greens, fennel, lemon, toasted seeds.', '610 cal · 38g protein', 'Fish, sesame', 'Sauvignon blanc', 'Crisp acidity follows the lemon vinaigrette.'],
  4: ['House pasta, wild mushrooms, parmesan, black pepper.', '720 cal · 22g protein', 'Wheat, dairy', 'Pinot noir', 'Earthy red fruit mirrors the mushrooms.'],
  5: ['Beef tenderloin, potato, greens, red wine reduction.', '780 cal · 48g protein', 'Dairy', 'Cabernet sauvignon', 'A structured Cabernet stands up to the rich reduction.'],
  6: ['Fresh fish, saffron rice, greens, herb butter.', '590 cal · 36g protein', 'Fish, dairy', 'Chardonnay', 'Light oak complements the herb butter.'],
  7: ['Calamari, lemon aioli, herbs, chili glaze.', '440 cal · 24g protein', 'Shellfish, egg, wheat', 'Dry martini', 'A cold, bracing martini cuts through the crisp batter.'],
  8: ['Burrata, grilled vegetables, basil oil, sourdough.', '510 cal · 19g protein', 'Dairy, wheat', 'Rose spritz', 'Bubbles lift the creamy burrata.'],
  9: ['Bourbon, orange bitters, demerara, charred orange.', '210 cal', 'None', 'Dark chocolate lava cake', 'A classic after-dinner pairing.'],
  10: ['Gin, elderflower, cucumber, basil, sparkling tonic.', '160 cal', 'None', 'Grilled salmon salad', 'Botanical freshness echoes the fennel.'],
  11: ['Dark chocolate, vanilla ice cream, cocoa nibs.', '640 cal · 9g protein', 'Dairy, egg, soy', 'Smoked orange old fashioned', 'Orange bitters bring depth to dark chocolate.'],
  12: ['Vanilla custard, caramelized sugar, fresh berries.', '420 cal · 7g protein', 'Dairy, egg', 'Garden spritz', 'Herbal bubbles keep the finish refreshing.'],
  13: ['Chicken, carrots, potato, rosemary, garlic jus.', '690 cal · 46g protein', 'None', 'Chardonnay', 'Stone fruit and gentle oak soften the roasted garlic jus.'],
  14: ['Arborio rice, mushrooms, parmesan, thyme, vegetable stock.', '560 cal · 17g protein', 'Dairy', 'Pinot noir', 'Earthy red fruit complements the forest mushrooms.'],
  15: ['Sea bass, citrus, fennel, herbs, butter.', '480 cal · 41g protein', 'Fish, dairy', 'Sauvignon blanc', 'Bright acidity mirrors the citrus glaze.']
}

menuItems.forEach((item) => {
  const [ingredients, nutrition, allergens, pairing, pairingNote] = dishDetails[item.id]
  Object.assign(item, { ingredients, nutrition, allergens, pairing, pairingNote })
})

const filteredMenu = computed(() => {
  const query = searchTerm.value.trim().toLowerCase()

  const matchingItems = menuItems.filter((item) => {
    const matchesCategory = item.category === selectedCategory.value
    if (!matchesCategory) return false

    if (selectedDietary.value !== 'All' && !dietaryById[item.id]?.includes(selectedDietary.value)) {
      return false
    }

    if (!query) return true

    const searchableText = [
      item.name,
      item.description,
      item.tags.join(' '),
      item.category
    ].join(' ').toLowerCase()

    return searchableText.includes(query)
  })

  return [...matchingItems].sort((a, b) => {
    if (sortOrder.value === 'low') return a.price - b.price
    if (sortOrder.value === 'high') return b.price - a.price
    return a.id - b.id
  })
})

const selectedPairing = computed(() => menuItems.find((item) => item.id === Number(pairingDish.value)) || menuItems[4])
const cocktailRecommendation = computed(() => cocktailRecommendations[selectedFlavor.value])

function selectDish(item) {
  selectedDish.value = item
}

function useFallbackImage(event) {
  event.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
}

function speakDish(item) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const note = new SpeechSynthesisUtterance(`${item.name}. Chef's note: ${item.description} Best with ${item.pairing}.`)
  isSpeaking.value = true
  note.onend = () => { isSpeaking.value = false }
  window.speechSynthesis.speak(note)
}

function printMenu() {
  window.print()
}
</script>

<style scoped>
.menu-page {
  width: 100%;
}

.container {
  width: min(1200px, calc(100% - 40px));
  margin: 0 auto;
}

.menu-hero {
  background-image:
    linear-gradient(90deg, rgba(17, 14, 13, 0.72), rgba(17, 14, 13, 0.35)),
    url('https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1800&q=80');
  background-size: cover;
  background-position: center;
  min-height: 420px;
  display: flex;
  align-items: center;
}

.hero-copy {
  max-width: 740px;
  color: #fff;
  padding: 70px 0;
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
  margin-bottom: 14px;
}

.hero-copy p:last-child {
  color: rgba(255,255,255,0.82);
  font-size: 1.05rem;
  line-height: 1.8;
}

.menu-tools {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 42px;
  flex-wrap: wrap;
}

.menu-search {
  display: grid;
  gap: 8px;
  flex: 1 1 260px;
}

.menu-search label {
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #b87743;
  font-weight: 700;
}

.menu-search input {
  width: 100%;
  min-height: 48px;
  border-radius: 14px;
  border: 1px solid rgba(25, 21, 18, 0.14);
  background: #fff;
  padding: 0 16px;
  color: #171614;
  font: inherit;
}

.menu-search input:focus {
  outline: 2px solid rgba(184, 119, 67, 0.2);
  border-color: #c6834c;
}

.menu-summary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  color: #171614;
  font-weight: 700;
  max-width: 100%;
}

.menu-summary span {
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  padding: 0 14px;
  border-radius: 999px;
  background: #f5efe9;
  border: 1px solid rgba(25, 21, 18, 0.08);
}

.menu-summary select {
  max-width: 100%;
  min-height: 38px;
  padding: 0 12px;
  border: 1px solid rgba(25, 21, 18, 0.08);
  border-radius: 999px;
  background: #f5efe9;
  color: #171614;
  font-weight: 700;
}

.print-menu {
  min-height: 38px;
  padding: 0 12px;
  border: 1px solid rgba(25, 21, 18, 0.15);
  border-radius: 999px;
  background: transparent;
  color: #9d6233;
  font-weight: 700;
}

.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 22px 0 20px;
  justify-content: center;
}

.tab-btn {
  border: 1px solid rgba(25, 21, 18, 0.14);
  background: #fff;
  color: #171614;
  border-radius: 999px;
  padding: 10px 18px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s ease;
}

.tab-btn:hover,
.tab-btn.active {
  background: #171614;
  border-color: #171614;
  color: #fff;
}

.dietary-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  padding-bottom: 28px;
}

.dietary-filter {
  border: 1px solid rgba(184, 119, 67, 0.28);
  background: #fffaf5;
  color: #9d6233;
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 0.86rem;
  cursor: pointer;
}

.dietary-filter:hover,
.dietary-filter.active {
  background: #f3eadf;
  border-color: #c6834c;
  color: #171614;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 26px;
  padding-bottom: 70px;
}

.menu-card {
  display: grid;
  grid-template-columns: 180px 1fr;
  background: #fff;
  border: 1px solid rgba(25, 21, 18, 0.12);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 12px 24px rgba(17, 14, 13, 0.04);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.menu-card:hover,
.menu-card:focus-visible {
  transform: translateY(-5px);
  box-shadow: 0 18px 32px rgba(17, 14, 13, 0.12);
  outline: none;
}

.menu-image {
  min-height: 100%;
  background-size: cover;
  background-position: center;
}

.menu-content {
  padding: 22px 22px 18px;
}

.menu-topline {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  margin-bottom: 12px;
}

.menu-topline h3 {
  color: #171614;
  font-size: 1.5rem;
  line-height: 1.2;
}

.price {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 62px;
  padding: 7px 10px;
  border-radius: 999px;
  background: #f2e6d8;
  color: #9d6233;
  font-weight: 800;
  font-size: 1.08rem;
  letter-spacing: 0.01em;
}

.menu-content p {
  color: #51483f;
  line-height: 1.75;
  margin-bottom: 16px;
}

.item-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 7px 10px;
  border-radius: 999px;
  font-size: 0.68rem;
  letter-spacing: 0.04em;
  background: #f5efe9;
  color: #684f3d;
  font-weight: 700;
}

.details-link {
  margin-top: 18px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #9d6233;
  font-size: 0.82rem;
  font-weight: 800;
}

.dish-modal {
  position: fixed;
  inset: 0;
  z-index: 70;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(17, 14, 13, 0.78);
}

.dish-modal-card {
  position: relative;
  display: grid;
  grid-template-columns: minmax(240px, 0.8fr) 1.2fr;
  width: min(900px, 100%);
  max-height: calc(100vh - 40px);
  overflow: auto;
  border-radius: 24px;
  background: #fffaf5;
}

.dish-modal-card > img {
  width: 100%;
  height: 100%;
  min-height: 420px;
  object-fit: cover;
}

.dish-close {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 1;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 50%;
  background: rgba(255,255,255,0.88);
  color: #171614;
  font-size: 1.7rem;
}

.dish-modal-copy { padding: 42px 34px; }
.dish-modal-heading { display: flex; justify-content: space-between; gap: 16px; align-items: start; margin-bottom: 12px; }
.dish-modal-heading h2 { font-size: clamp(2rem, 4vw, 3rem); }
.dish-modal-heading strong { color: #9d6233; font-size: 1.3rem; }
.dish-modal-copy > p:not(.section-label) { color: #62584e; line-height: 1.75; }
.dish-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin: 28px 0; }
.dish-detail-grid span, .pairing-result span { display: block; margin-bottom: 5px; color: #b87743; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; }
.dish-detail-grid p { color: #62584e; line-height: 1.55; }
.chef-audio { min-height: 42px; padding: 0 16px; border: 1px solid rgba(157, 98, 51, 0.3); border-radius: 999px; background: transparent; color: #9d6233; font-weight: 700; }

.empty-state {
  background: #fff;
  border: 1px dashed rgba(25, 21, 18, 0.2);
  color: #62584e;
  border-radius: 20px;
  padding: 28px 22px;
  text-align: center;
  margin-bottom: 60px;
}

.menu-note {
  padding-bottom: 90px;
}

.note-box {
  background: linear-gradient(135deg, #171614, #2b241f);
  border-radius: 28px;
  padding: 42px 34px;
  color: #fff;
  text-align: center;
}

.note-box h2 {
  color: #fff;
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 10px;
}

.note-box p:last-child {
  color: rgba(255,255,255,0.76);
  font-size: 1.03rem;
}

.section-heading {
  text-align: left;
  margin-bottom: 42px;
}

.section-heading.center {
  text-align: center;
}

.section-heading h2 {
  color: #171614;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  line-height: 1.15;
  letter-spacing: -0.03em;
}

.featured-section {
  padding: 70px 0 60px;
  background: #faf8f5;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
}

.featured-item {
  background: #fff;
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 16px 32px rgba(17, 14, 13, 0.06);
  position: relative;
}

.featured-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: #c6834c;
  color: #fff;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  z-index: 10;
}

.featured-item img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  display: block;
}

.featured-copy {
  padding: 24px 22px;
}

.featured-copy h3 {
  color: #171614;
  font-size: 1.32rem;
  line-height: 1.2;
  margin-bottom: 12px;
}

.featured-note {
  color: #62584e;
  font-size: 0.95rem;
  line-height: 1.75;
  margin-bottom: 10px;
}

.featured-why {
  color: #b87743;
  font-size: 0.88rem;
  line-height: 1.7;
  font-style: italic;
  margin-bottom: 12px;
}

.featured-price {
  display: inline-block;
  color: #c6834c;
  font-weight: 700;
  font-size: 1.1rem;
}

.dietary-section {
  padding: 70px 0 60px;
}

.dietary-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
}

.dietary-item {
  background: #fff;
  padding: 28px 22px;
  border-radius: 20px;
  border: 1px solid rgba(25, 21, 18, 0.08);
}

.dietary-item h3 {
  color: #171614;
  font-size: 1.12rem;
  margin-bottom: 12px;
}

.dietary-item p {
  color: #62584e;
  line-height: 1.75;
  font-size: 0.95rem;
}

.pairings-section {
  padding: 70px 0;
  background: linear-gradient(135deg, rgba(198, 131, 76, 0.08), rgba(157, 98, 51, 0.06));
}

.pairings-info {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
}

.pairing-block {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  padding: 28px 24px;
  border-radius: 20px;
  border: 1px solid rgba(198, 131, 76, 0.12);
}

.pairing-block h3 {
  color: #171614;
  font-size: 1.08rem;
  margin-bottom: 10px;
}

.pairing-block p {
  color: #62584e;
  line-height: 1.75;
  font-size: 0.94rem;
}

.pairing-guide-section {
  padding: 72px 0;
  background: #efe5db;
}

.pairing-guide {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr 1fr;
  gap: 28px;
  align-items: end;
}

.pairing-guide h2 {
  max-width: 480px;
  font-size: clamp(1.8rem, 4vw, 2.7rem);
}

.pairing-guide label {
  display: grid;
  gap: 8px;
  color: #9d6233;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.pairing-guide select {
  width: 100%;
  min-width: 0;
  min-height: 48px;
  padding: 0 12px;
  border: 1px solid rgba(25, 21, 18, 0.15);
  border-radius: 10px;
  background: #fff;
  color: #171614;
  font-size: 1rem;
  letter-spacing: 0;
  text-transform: none;
}

.pairing-result {
  padding: 22px;
  border-left: 2px solid #c6834c;
}

.pairing-result strong {
  display: block;
  margin-bottom: 5px;
  font-size: 1.3rem;
}

.pairing-result p {
  color: #62584e;
}

.cocktail-builder-section {
  padding: 72px 0;
  background: #171614;
  color: #fff;
}

.cocktail-builder {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr 0.9fr;
  gap: 28px;
  align-items: center;
}

.cocktail-builder h2 {
  max-width: 520px;
  color: #fff;
  font-size: clamp(1.8rem, 4vw, 2.7rem);
}

.cocktail-builder p:not(.section-label) {
  color: rgba(255,255,255,0.72);
  line-height: 1.7;
}

.flavor-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.flavor-options button {
  min-height: 40px;
  padding: 0 14px;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 999px;
  background: transparent;
  color: #fff;
}

.flavor-options button.active,
.flavor-options button:hover {
  border-color: #d9a873;
  background: #c6834c;
  color: #171614;
}

.cocktail-result {
  padding: 24px;
  border-left: 2px solid #d9a873;
  background: rgba(255,255,255,0.06);
}

.cocktail-result span {
  color: #d9a873;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.cocktail-result strong {
  display: block;
  margin: 7px 0;
  font-size: 1.35rem;
}

.cocktail-result small {
  display: block;
  margin-top: 12px;
  color: #d9a873;
  font-weight: 800;
}

.reserve-cta {
  background: linear-gradient(135deg, #c6834c, #d9a873);
  padding: 54px 0;
}

.cta-content {
  text-align: center;
  color: #fff;
}

.cta-content h2 {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  line-height: 1.15;
  margin-bottom: 12px;
}

.cta-content p {
  color: rgba(255, 255, 255, 0.88);
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 28px;
}

.cta-reserve-btn {
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

.cta-reserve-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(17, 14, 13, 0.15);
}

@media (max-width: 960px) {
  .featured-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }

  .dietary-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .pairings-info {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .pairing-guide {
    grid-template-columns: 1fr 1fr;
  }

  .pairing-result {
    grid-column: 1 / -1;
  }

  .cocktail-builder {
    grid-template-columns: 1fr 1fr;
  }

  .cocktail-result {
    grid-column: 1 / -1;
  }
}

@media (max-width: 760px) {
  .menu-grid {
    grid-template-columns: 1fr;
  }

  .menu-card {
    grid-template-columns: 1fr;
  }

  .menu-image {
    min-height: 220px;
  }

  .featured-grid {
    grid-template-columns: 1fr;
  }

  .dietary-grid {
    grid-template-columns: 1fr;
  }

  .pairings-info {
    grid-template-columns: 1fr;
  }

  .menu-tools,
  .menu-summary {
    width: 100%;
  }

  .menu-summary {
    justify-content: flex-start;
  }

  .dish-modal-card {
    grid-template-columns: 1fr;
  }

  .dish-modal-card > img {
    min-height: 220px;
    max-height: 260px;
  }

  .dish-modal-copy {
    padding: 28px 22px;
  }

  .pairing-guide {
    grid-template-columns: 1fr;
  }

  .pairing-result {
    grid-column: auto;
  }

  .cocktail-builder {
    grid-template-columns: 1fr;
  }

  .cocktail-result {
    grid-column: auto;
  }
}
</style>
