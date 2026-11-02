<script setup>
import { computed, ref } from 'vue'

const isMenuOpen = ref(false)
const isReservationOpen = ref(false)
const reservationStatus = ref('')
const newsletterEmail = ref('')
const newsletterStatus = ref('')
const reservation = ref({ name: '', email: '', date: '', time: '', guests: '2', occasion: '' })
const isDarkMode = ref(false)
const isSoundOn = ref(false)
const selectedLanguage = ref('EN')
const selectedCurrency = ref('USD')
const openGiftCard = ref(false)
const seasonalDaysLeft = ref(14)
const orderUrl = import.meta.env.VITE_ORDER_URL || 'https://www.toasttab.com/'
const playlistUrl = import.meta.env.VITE_SPOTIFY_PLAYLIST_URL || 'https://open.spotify.com/'
const minReservationDate = new Date().toISOString().slice(0, 10)
let audioContext
let ambientOscillator

const operationalStatus = computed(() => {
  const hour = new Date().getHours()
  if (hour >= 16 && hour < 19) return { label: 'Open now · Happy hour until 7 PM', tone: 'happy' }
  if (hour >= 8 && hour < 23) return { label: 'Open now · Taking reservations', tone: 'open' }
  return { label: 'Closed now · Opens at 8 AM', tone: 'closed' }
})

function closeMenu() {
  isMenuOpen.value = false
}

function openReservation() {
  closeMenu()
  reservationStatus.value = ''
  isReservationOpen.value = true
}

function closeReservation() {
  isReservationOpen.value = false
}

function submitReservation() {
  reservationStatus.value = `Thanks, ${reservation.value.name}. Your request for ${reservation.value.guests} guests has been received.`
}

function subscribeToNewsletter() {
  if (!newsletterEmail.value) return
  newsletterStatus.value = 'You are on the list. Watch your inbox for the next 8AM note.'
  newsletterEmail.value = ''
}

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark-mode', isDarkMode.value)
}

function toggleAmbientSound() {
  isSoundOn.value = !isSoundOn.value
  if (!isSoundOn.value) {
    ambientOscillator?.stop()
    audioContext?.close()
    ambientOscillator = null
    audioContext = null
    return
  }

  audioContext = new window.AudioContext()
  ambientOscillator = audioContext.createOscillator()
  const gain = audioContext.createGain()
  ambientOscillator.type = 'sine'
  ambientOscillator.frequency.value = 174
  gain.gain.value = 0.012
  ambientOscillator.connect(gain)
  gain.connect(audioContext.destination)
  ambientOscillator.start()
}
</script>

<template>
  <div id="app" class="app-shell">
    <header class="topbar">
      <div class="container nav-wrap">
        <div class="brand-block">
          <span class="brand-mark">8AM</span>
          <div><span class="brand-name">Resto & Bar</span></div>
        </div>
        <button class="menu-toggle" type="button" :aria-expanded="isMenuOpen" aria-controls="main-navigation" aria-label="Toggle navigation" @click="isMenuOpen = !isMenuOpen">
          <span></span><span></span><span></span>
        </button>
        <nav id="main-navigation" class="main-nav" :class="{ open: isMenuOpen }" aria-label="Main navigation">
          <router-link to="/" class="nav-link" @click="closeMenu">Home</router-link>
          <router-link to="/menu" class="nav-link" @click="closeMenu">Menu</router-link>
          <router-link to="/gallery" class="nav-link" @click="closeMenu">Gallery</router-link>
          <router-link to="/about" class="nav-link" @click="closeMenu">About</router-link>
          <router-link to="/contact" class="nav-link" @click="closeMenu">Contact</router-link>
          <router-link to="/careers" class="nav-link" @click="closeMenu">Careers</router-link>
          <button type="button" class="nav-reserve" @click="openReservation">Reserve a table</button>
          <a class="order-link" :href="orderUrl" target="_blank" rel="noreferrer">Order pickup</a>
        </nav>
      </div>
    </header>

    <main class="page-shell"><router-view /></main>

    <footer class="site-footer">
      <div class="container footer-grid">
        <div><p class="footer-title">8AM Resto & Bar</p><p>Fine dining, handcrafted cocktails, and a warm, elevated evening experience.</p><button type="button" class="footer-reserve" @click="openReservation">Reserve a table <span aria-hidden="true">↗</span></button></div>
        <div><p class="footer-title">Visit</p><p>123 Gourmet Avenue</p><p>Downtown District</p></div>
        <div><p class="footer-title">Hours</p><p>Mon–Thu: 8:00 AM – 11:00 PM</p><p>Fri–Sun: 8:00 AM – 12:00 AM</p></div>
        <div><p class="footer-title">Stay in the know</p><p>Seasonal menus, events, and table releases.</p><form class="newsletter-form" @submit.prevent="subscribeToNewsletter"><label class="sr-only" for="newsletter-email">Email address</label><input id="newsletter-email" v-model="newsletterEmail" type="email" required placeholder="Your email address" /><button type="submit" aria-label="Subscribe to newsletter">↗</button></form><p v-if="newsletterStatus" class="newsletter-status">{{ newsletterStatus }}</p></div>
      </div>
      <div class="container footer-tools">
        <label class="locale-control"><span class="sr-only">Language</span><select v-model="selectedLanguage"><option>EN</option><option>FR</option><option>ES</option></select><select v-model="selectedCurrency" aria-label="Currency"><option>USD</option><option>EUR</option><option>GBP</option></select></label>
      </div>
      <div class="container footer-bottom"><p>© 2026 8AM Resto & Bar. All rights reserved.</p></div>
    </footer>

    <div v-if="isReservationOpen" class="reservation-modal" role="dialog" aria-modal="true" aria-labelledby="reservation-title" @click.self="closeReservation">
      <div class="reservation-modal-card">
        <button type="button" class="modal-close" aria-label="Close reservation form" @click="closeReservation">×</button>
        <p class="modal-kicker">A table is waiting</p>
        <h2 id="reservation-title">Reserve your 8AM moment.</h2>
        <p class="modal-intro">Tell us when you would like to join us. Our host team will confirm your request shortly.</p>
        <form class="modal-form" @submit.prevent="submitReservation">
          <label>Name<input v-model="reservation.name" type="text" required placeholder="Your full name" /></label>
          <label>Email<input v-model="reservation.email" type="email" required placeholder="you@example.com" /></label>
          <label>Date<input v-model="reservation.date" type="date" :min="minReservationDate" required /></label>
          <label>Time<input v-model="reservation.time" type="time" required /></label>
          <label>Guests<select v-model="reservation.guests"><option v-for="count in 12" :key="count" :value="String(count)">{{ count }} {{ count === 1 ? 'guest' : 'guests' }}</option></select></label>
          <label>Occasion<select v-model="reservation.occasion"><option value="">No special occasion</option><option>Birthday</option><option>Date night</option><option>Business dinner</option><option>Celebration</option></select></label>
          <button type="submit" class="modal-submit">Request reservation <span aria-hidden="true">↗</span></button>
          <p v-if="reservationStatus" class="modal-success" role="status">{{ reservationStatus }}</p>
        </form>
      </div>
    </div>

    <div v-if="openGiftCard" class="reservation-modal" role="dialog" aria-modal="true" aria-labelledby="gift-card-title" @click.self="openGiftCard = false">
      <div class="reservation-modal-card gift-card-modal">
        <button type="button" class="modal-close" aria-label="Close gift card dialog" @click="openGiftCard = false">×</button>
        <p class="modal-kicker">Give the good kind of night</p>
        <h2 id="gift-card-title">Digital gift cards are coming soon.</h2>
        <p class="modal-intro">Leave your email and we will notify you when 8AM gift cards are ready to send.</p>
        <form class="modal-form" @submit.prevent="openGiftCard = false">
          <label class="gift-email">Email<input type="email" required placeholder="you@example.com" /></label>
          <button type="submit" class="modal-submit">Notify me <span aria-hidden="true">↗</span></button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-shell { min-height: 100vh; background: #f5f1eb; }
.container { width: min(1200px, calc(100% - 40px)); margin: 0 auto; }
.announcement-bar { background: #c6834c; color: #171614; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
.announcement-inner { display: flex; justify-content: center; align-items: center; gap: 16px; min-height: 32px; }
.announcement-inner button { border: 0; background: transparent; color: inherit; font: inherit; text-transform: inherit; letter-spacing: inherit; text-decoration: underline; text-underline-offset: 3px; }
.status-badge { display: inline-flex; align-items: center; gap: 6px; letter-spacing: 0.04em; }
.status-badge i { width: 7px; height: 7px; border-radius: 50%; background: #2f6c3d; }
.status-badge.happy i { background: #fff; }
.status-badge.closed i { background: #8a2d2d; }
.topbar { position: sticky; top: 0; z-index: 40; background: rgba(17, 14, 13, 0.86); backdrop-filter: blur(16px) saturate(1.15); -webkit-backdrop-filter: blur(16px) saturate(1.15); border-bottom: 1px solid rgba(255,255,255,0.1); box-shadow: 0 10px 24px rgba(17,14,13,0.12); }
.nav-wrap { display: flex; justify-content: space-between; align-items: center; min-height: 72px; }
.brand-block { display: flex; align-items: center; gap: 12px; }
.brand-mark { display: inline-flex; align-items: center; justify-content: center; width: 54px; height: 54px; border-radius: 50%; background: linear-gradient(135deg, #b87743, #d9a873); color: #151515; font-size: 0.86rem; font-weight: 800; letter-spacing: 0.08em; }
.brand-name { color: #f5f5f5; letter-spacing: 0.14em; text-transform: uppercase; font-size: 0.78rem; font-weight: 600; }
.main-nav { display: flex; align-items: center; gap: 30px; }
.nav-link { color: rgba(255,255,255,0.85); text-decoration: none; font-size: 0.92rem; letter-spacing: 0.04em; text-transform: uppercase; font-weight: 500; position: relative; }
.nav-link::after { content: ""; position: absolute; left: 0; bottom: -8px; width: 100%; height: 1px; background: #d9a873; transform: scaleX(0); transform-origin: center; transition: transform 0.25s ease; }
.nav-link:hover, .nav-link.router-link-active { color: #f5d7b0; }
.nav-link:hover::after, .nav-link.router-link-active::after { transform: scaleX(1); }
.nav-reserve { display: inline-flex; align-items: center; justify-content: center; min-height: 40px; padding: 0 16px; border: 0; border-radius: 999px; background: #c6834c; color: #171614; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
.order-link { color: #d9a873; font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
.menu-toggle { display: none; width: 44px; height: 44px; border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; background: transparent; padding: 10px; }
.menu-toggle span { display: block; height: 2px; margin: 4px 0; background: #fff; }
.page-shell { min-height: calc(100vh - 160px); }
.site-footer { background: #171614; color: #e4ddd5; padding: 50px 0 24px; }
.footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 28px; padding-bottom: 22px; border-bottom: 1px solid rgba(255,255,255,0.12); }
.footer-title { font-size: 0.76rem; text-transform: uppercase; letter-spacing: 0.14em; color: #d9a873; margin-bottom: 12px; font-weight: 700; }
.footer-grid p { margin: 0 0 8px; color: rgba(255,255,255,0.72); line-height: 1.7; }
.footer-reserve { margin-top: 12px; padding: 0; border: 0; background: transparent; color: #d9a873; font-weight: 700; }
.newsletter-form { display: flex; max-width: 260px; margin-top: 14px; border-bottom: 1px solid rgba(255,255,255,0.38); }
.newsletter-form input { min-width: 0; flex: 1; padding: 9px 0; border: 0; outline: 0; background: transparent; color: #fff; }
.newsletter-form input::placeholder { color: rgba(255,255,255,0.58); }
.newsletter-form button { border: 0; background: transparent; color: #d9a873; font-size: 1.3rem; }
.newsletter-status, .modal-success { color: #b9e4bb !important; font-size: 0.85rem; }
.footer-bottom { padding-top: 22px; color: rgba(255,255,255,0.62); text-align: center; font-size: 0.9rem; }
.footer-tools { display: flex; flex-wrap: wrap; gap: 10px 18px; padding: 22px 0; border-bottom: 1px solid rgba(255,255,255,0.12); }
.footer-tools a, .footer-tools button { border: 0; padding: 0; background: transparent; color: rgba(255,255,255,0.72); font-size: 0.82rem; }
.footer-tools a:hover, .footer-tools button:hover { color: #d9a873; }
.locale-control { display: inline-flex; gap: 5px; margin-left: auto; }
.locale-control select { border: 1px solid rgba(255,255,255,0.2); border-radius: 5px; background: #24211e; color: #fff; padding: 3px 5px; font-size: 0.75rem; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
.reservation-modal { position: fixed; inset: 0; z-index: 80; display: grid; place-items: center; padding: 20px; background: rgba(17, 14, 13, 0.78); }
.reservation-modal-card { position: relative; width: min(640px, 100%); max-height: calc(100vh - 40px); overflow-y: auto; padding: 42px; background: #fffaf5; border: 1px solid rgba(25, 21, 18, 0.12); border-radius: 24px; box-shadow: 0 30px 80px rgba(0,0,0,0.28); }
.modal-close { position: absolute; top: 15px; right: 18px; width: 38px; height: 38px; border: 0; border-radius: 50%; background: #f0e6dc; color: #171614; font-size: 1.7rem; line-height: 1; }
.modal-kicker { margin-bottom: 10px; color: #b87743; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; }
.reservation-modal h2 { max-width: 460px; margin-bottom: 10px; font-size: clamp(2rem, 5vw, 3.2rem); }
.modal-intro { margin-bottom: 24px; color: #62584e; }
.modal-form { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
.modal-form label { display: grid; gap: 7px; color: #171614; font-size: 0.78rem; font-weight: 700; }
.modal-form input, .modal-form select { width: 100%; min-height: 46px; padding: 0 12px; border: 1px solid rgba(25,21,18,0.16); border-radius: 10px; background: #fff; color: #171614; font: inherit; }
.modal-submit { grid-column: 1 / -1; min-height: 50px; margin-top: 5px; border: 0; border-radius: 999px; background: #171614; color: #fff; font-weight: 700; }
.modal-success { grid-column: 1 / -1; margin-top: 2px; color: #2f6c3d !important; }
.gift-email { grid-column: 1 / -1; }
 :global(html.dark-mode) body { background: #11100f; color: #f4eee8; }
 :global(html.dark-mode) .app-shell { background: #11100f; }
 :global(html.dark-mode) .page-shell { filter: saturate(0.88) brightness(0.82); }
@media (max-width: 820px) {
  .nav-wrap { position: relative; min-height: 72px; }
  .menu-toggle { display: block; }
  .main-nav { position: absolute; top: calc(100% + 1px); left: 0; right: 0; display: none; flex-direction: column; align-items: stretch; gap: 0; padding: 10px 20px 18px; background: rgba(17,14,13,0.92); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
  .main-nav.open { display: flex; }
  .nav-link, .nav-reserve { padding: 14px 0; }
  .nav-reserve { margin-top: 8px; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 620px) { .announcement-inner { justify-content: space-between; font-size: 0.65rem; } .reservation-modal-card { padding: 34px 22px 24px; } .modal-form { grid-template-columns: 1fr; } .modal-submit, .modal-success { grid-column: auto; } }
@media (max-width: 520px) { .footer-grid { grid-template-columns: 1fr; } .brand-name { letter-spacing: 0.08em; } }
</style>
