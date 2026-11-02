<template>
  <div class="contact-page">
    <section class="contact-hero">
      <div class="container hero-copy">
        <p class="section-label">Visit or contact</p>
        <h1>We’d love to welcome you in person.</h1>
      </div>
    </section>

    <section class="reservation-panel container">
      <div class="reservation-copy">
        <p class="section-label">Reserve your table</p>
        <h2>Make time for something memorable.</h2>
        <p>Send your preferred date and time. Our team will confirm availability by phone or email.</p>
      </div>

      <form class="reservation-form" novalidate @submit.prevent="submitReservation">
        <div class="reservation-field" :class="{ invalid: reservationAttempted && !reservation.name }">
          <label for="reservation-name">Name</label>
          <input id="reservation-name" v-model="reservation.name" type="text" required placeholder="Your full name" />
        </div>
        <div class="reservation-field" :class="{ invalid: reservationAttempted && !reservation.contact }">
          <label for="reservation-phone">Phone or email</label>
          <input id="reservation-phone" v-model="reservation.contact" type="text" required placeholder="How should we reach you?" />
        </div>
        <div class="reservation-field" :class="{ invalid: reservationAttempted && !reservation.date }">
          <label for="reservation-date">Date</label>
          <input id="reservation-date" v-model="reservation.date" type="date" :min="minReservationDate" required />
        </div>
        <div class="reservation-field" :class="{ invalid: reservationAttempted && !reservation.time }">
          <label for="reservation-time">Time</label>
          <input id="reservation-time" v-model="reservation.time" type="time" required />
        </div>
        <div class="reservation-field" :class="{ invalid: reservationAttempted && !reservation.guests }">
          <label for="reservation-guests">Guests</label>
          <select id="reservation-guests" v-model="reservation.guests" required>
            <option value="">Select guests</option>
            <option v-for="count in 12" :key="count" :value="count">{{ count }} {{ count === 1 ? 'guest' : 'guests' }}</option>
          </select>
        </div>
        <div class="reservation-field">
          <label for="reservation-occasion">Occasion</label>
          <select id="reservation-occasion" v-model="reservation.occasion">
            <option value="">No special occasion</option>
            <option>Birthday</option>
            <option>Date night</option>
            <option>Business dinner</option>
            <option>Celebration</option>
          </select>
        </div>
        <div class="reservation-field">
          <label for="reservation-seating">Table preference</label>
          <select id="reservation-seating" v-model="reservation.seating">
            <option value="">No preference</option>
            <option>Outdoor terrace</option>
            <option>Bar high-tops</option>
            <option>Quiet booth</option>
            <option>Near window</option>
          </select>
        </div>
        <div class="reservation-field reservation-field-wide">
          <label for="reservation-notes">Dietary needs or pre-order notes</label>
          <input id="reservation-notes" v-model="reservation.notes" type="text" placeholder="Allergies, dietary needs, or dishes to prepare" />
        </div>
        <button type="submit" class="reservation-submit">Request reservation</button>
        <p v-if="reservationError" class="field-error" role="alert">{{ reservationError }}</p>
        <p v-if="reservationStatus" class="reservation-status">{{ reservationStatus }}</p>
      </form>
    </section>

    <div class="container contact-layout">
      <section class="info-panel">
        <div class="panel-block">
          <p class="section-label">Location</p>
          <h2>Find us in the city centre.</h2>
          <p>123 Gourmet Avenue<br />Downtown District<br />City Centre, CA 90210</p>
        </div>

        <div class="panel-block">
          <p class="section-label">Reservations</p>
          <ul class="stack-list">
            <li><a href="tel:+15551234567">(555) 123-4567</a></li>
            <li><a href="mailto:reservations@8amrestobar.com">reservations@8amrestobar.com</a></li>
            <li>Mon–Thu: 8:00 AM – 11:00 PM</li>
            <li>Fri–Sun: 8:00 AM – 12:00 AM</li>
          </ul>
        </div>

        <div class="panel-block">
          <p class="section-label">Follow</p>
          <div class="social-row">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">Instagram</a>
            <a href="https://wa.me/15551234567" target="_blank" rel="noreferrer" aria-label="WhatsApp">WhatsApp</a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">Facebook</a>
          </div>
        </div>
        <div class="panel-block">
          <p class="section-label">Guest-friendly space</p>
          <div class="accessibility-badges"><span>Wheelchair access</span><span>Outdoor heating</span><span>Pet-friendly patio</span><span>Valet weekends</span></div>
          <a class="playlist-link" :href="playlistUrl" target="_blank" rel="noreferrer">Listen to the 8AM vibe on Spotify ↗</a>
        </div>
      </section>

      <section class="form-panel">
        <div class="form-header">
          <p class="section-label">Send a note</p>
          <h2>Plan your visit.</h2>
        </div>

        <form @submit.prevent="submitForm" class="contact-form">
          <div class="field-row">
            <label for="name">Full name</label>
            <input v-model="form.name" id="name" type="text" required placeholder="Your full name" />
          </div>

          <div class="field-row">
            <label for="email">Email</label>
            <input v-model="form.email" id="email" type="email" required placeholder="you@example.com" />
          </div>

          <div class="field-row">
            <label for="phone">Phone</label>
            <input v-model="form.phone" id="phone" type="tel" placeholder="(555) 123-4567" />
          </div>

          <div class="field-row">
            <label for="subject">Subject</label>
            <select v-model="form.subject" id="subject" required>
              <option value="">Select a topic</option>
              <option value="reservation">Reservation</option>
              <option value="private-event">Private event</option>
              <option value="catering">Catering</option>
              <option value="feedback">Feedback</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="field-row">
            <label for="message">Message</label>
            <textarea v-model="form.message" id="message" rows="5" required placeholder="Tell us how we can help..."></textarea>
          </div>

          <div v-if="formStatus" :class="['form-status', formStatus.type]">
            {{ formStatus.message }}
          </div>

          <button type="submit" class="submit-btn">Send inquiry</button>
        </form>
      </section>
    </div>

    <section class="event-section container">
      <div class="event-copy"><p class="section-label">Private dining & events</p><h2>Make the room yours.</h2><p>Tell us about your celebration, corporate dinner, or full-venue idea and our events team will shape a proposal around it.</p></div>
      <form class="event-form" novalidate @submit.prevent="submitEventInquiry">
        <label :class="{ invalid: eventAttempted && !eventInquiry.name }">Name<input v-model="eventInquiry.name" type="text" required placeholder="Your name" /></label>
        <label :class="{ invalid: eventAttempted && !eventInquiry.email }">Email<input v-model="eventInquiry.email" type="email" required placeholder="you@example.com" /></label>
        <label>Event type<select v-model="eventInquiry.type"><option>Private dinner</option><option>Corporate gathering</option><option>Birthday or celebration</option><option>Full venue hire</option></select></label>
        <label>Estimated guests<select v-model="eventInquiry.guests"><option>10–20</option><option>21–50</option><option>51–100</option><option>100+</option></select></label>
        <label class="event-field-wide">Tell us more<textarea v-model="eventInquiry.message" rows="3" placeholder="Date, budget, menu style, and anything else we should know"></textarea></label>
        <button type="submit" class="submit-btn event-field-wide">Request event proposal <span aria-hidden="true">↗</span></button>
        <p v-if="eventError" class="field-error event-field-wide" role="alert">{{ eventError }}</p>
        <p v-if="eventStatus" class="form-status success event-field-wide" role="status">{{ eventStatus }}</p>
      </form>
    </section>

    <section class="map-section container">
      <div class="section-heading center">
        <p class="section-label">Find us</p>
        <h2>Easy to reach in the city centre.</h2>
      </div>
      <div class="map-frame">
        <iframe
          title="Map showing 8AM Resto & Bar"
          src="https://www.google.com/maps?q=123%20Gourmet%20Avenue%2C%20Downtown%20District&output=embed"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <a class="directions-link" href="https://www.google.com/maps/dir/?api=1&destination=123%20Gourmet%20Avenue%2C%20Downtown%20District" target="_blank" rel="noreferrer">Get directions in Google Maps ↗</a>
    </section>

    <section class="faq-section container">
      <div class="section-heading center">
        <p class="section-label">Frequently asked</p>
        <h2>Helpful details before you arrive.</h2>
      </div>

      <div class="faq-grid">
        <article v-for="(item, index) in faqs" :key="item.question" class="faq-item" :class="{ open: openFaq === index }">
          <button type="button" :aria-expanded="openFaq === index" @click="openFaq = openFaq === index ? null : index">
            <span>{{ item.question }}</span><span class="faq-icon" aria-hidden="true">+</span>
          </button>
          <p v-show="openFaq === index">{{ item.answer }}</p>
        </article>
      </div>
    </section>

    <section class="events-section container">
      <div class="section-heading center"><p class="section-label">Coming up</p><h2>Gather around the calendar.</h2></div>
      <div class="events-grid"><article v-for="event in events" :key="event.title"><span>{{ event.date }}</span><h3>{{ event.title }}</h3><p>{{ event.detail }}</p><a href="mailto:events@8amrestobar.com">Reserve a place ↗</a></article></div>
    </section>

    <section class="tour-section container">
      <div class="section-heading center"><p class="section-label">See before you arrive</p><h2>Take a look around 8AM.</h2></div>
      <div v-if="tourUrl" class="tour-frame"><iframe :src="tourUrl" title="360 degree virtual tour of 8AM Resto and Bar" loading="lazy" allowfullscreen></iframe></div>
      <div v-else class="tour-placeholder"><p>Our 360-degree tour will be available here soon.</p><a href="/gallery">Explore the gallery instead ↗</a></div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const reservation = ref({
  name: '',
  contact: '',
  date: '',
  time: '',
  guests: '',
  occasion: '',
  seating: '',
  notes: ''
})
const reservationStatus = ref('')

const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const formStatus = ref(null)
const openFaq = ref(0)
const faqs = [
  { question: 'How do I reserve a table?', answer: 'Use the reservation form here or call us directly. We recommend booking in advance for dinner and weekends.' },
  { question: 'Do you host private events?', answer: 'Yes. We offer intimate dining and private event setups for celebrations, launches, and family gatherings.' },
  { question: 'Can you accommodate dietary preferences?', answer: 'Absolutely. Our team can guide you through vegetarian, vegan, gluten-free, and allergy-conscious options.' }
  ,{ question: 'What is the dress code?', answer: 'Smart casual. Come comfortable, but many guests dress up for dinner and celebrations.' }
  ,{ question: 'Do you offer parking or valet?', answer: 'Validated parking is available nearby, with valet service offered Friday and Saturday evenings.' }
  ,{ question: 'What is your cancellation policy?', answer: 'Please give us 24 hours notice for changes or cancellations so we can release the table to another guest.' }
]

const eventInquiry = ref({ name: '', email: '', type: 'Private dinner', guests: '10–20', message: '' })
const eventStatus = ref('')
const reservationAttempted = ref(false)
const reservationError = ref('')
const eventAttempted = ref(false)
const eventError = ref('')
const minReservationDate = new Date().toISOString().slice(0, 10)
const closedDates = ['01-01', '12-25']
const tourUrl = import.meta.env.VITE_VIRTUAL_TOUR_URL || ''
const playlistUrl = import.meta.env.VITE_SPOTIFY_PLAYLIST_URL || 'https://open.spotify.com/'
const events = [
  { date: 'Every Friday · 6 PM', title: 'Happy hour sessions', detail: 'Half-price signature pours and small plates at the bar.' },
  { date: 'First Sunday · 11 AM', title: 'Long-table brunch', detail: 'A relaxed brunch menu with live acoustic sets.' },
  { date: 'September 28 · 7 PM', title: 'Wine maker dinner', detail: 'Four seasonal courses with a guided boutique wine flight.' }
]

function submitReservation() {
  reservationAttempted.value = true
  reservationError.value = ''
  if (!reservation.value.name || !reservation.value.contact || !reservation.value.date || !reservation.value.time || !reservation.value.guests) {
    reservationError.value = 'Please complete the highlighted fields.'
    return
  }
  if (reservation.value.date < minReservationDate) {
    reservationError.value = 'Please choose a future date.'
    return
  }
  if (closedDates.includes(reservation.value.date.slice(5))) {
    reservationError.value = 'We are closed on that holiday. Please choose another date.'
    return
  }
  reservationStatus.value = `Thanks, ${reservation.value.name}. We received your request for ${reservation.value.guests} guests and will confirm it shortly.`
}

function submitForm() {
  if (form.value.name && form.value.email && form.value.message && form.value.subject) {
    formStatus.value = {
      type: 'success',
      message: 'Thank you. Your message has been received and our team will contact you shortly.'
    }

    setTimeout(() => {
      form.value = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }
      formStatus.value = null
    }, 3000)
  } else {
    formStatus.value = {
      type: 'error',
      message: 'Please complete all required fields before sending.'
    }
  }
}

function submitEventInquiry() {
  eventAttempted.value = true
  eventError.value = ''
  if (!eventInquiry.value.name || !eventInquiry.value.email) {
    eventError.value = 'Please complete the highlighted fields.'
    return
  }
  eventStatus.value = `Thanks, ${eventInquiry.value.name}. We will send your ${eventInquiry.value.type.toLowerCase()} proposal shortly.`
}
</script>

<style scoped>
.contact-page {
  width: 100%;
}

.container {
  width: min(1200px, calc(100% - 40px));
  margin: 0 auto;
}

.contact-hero {
  min-height: 360px;
  display: flex;
  align-items: center;
  background:
    linear-gradient(90deg, rgba(17, 14, 13, 0.72), rgba(17, 14, 13, 0.42)),
    url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80');
  background-size: cover;
  background-position: center;
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
  font-size: clamp(2.6rem, 5vw, 4.5rem);
  line-height: 1.02;
  letter-spacing: -0.05em;
}

.reservation-panel {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 36px;
  align-items: center;
  margin-top: 52px;
  padding: 34px;
  background: #171614;
  border-radius: 24px;
  color: #fff;
}

.reservation-copy h2 {
  color: #fff;
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  line-height: 1.1;
  margin-bottom: 12px;
}

.reservation-copy p:last-child {
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.7;
}

.reservation-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.reservation-field {
  display: grid;
  gap: 6px;
}

.reservation-field label {
  color: #d9a873;
  font-size: 0.78rem;
  font-weight: 700;
}

.reservation-field input,
.reservation-field select {
  width: 100%;
  min-height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  padding: 0 12px;
  font: inherit;
}

.reservation-field.invalid input,
.reservation-field.invalid select,
.event-form label.invalid input,
.event-form label.invalid select {
  border-color: #b64141;
  box-shadow: 0 0 0 3px rgba(182, 65, 65, 0.12);
}

.field-error {
  grid-column: 1 / -1;
  color: #9b3030;
  font-size: 0.88rem;
  font-weight: 700;
}

.reservation-field select option {
  color: #171614;
}

.reservation-field-wide {
  grid-column: 1 / -1;
}

.reservation-submit {
  min-height: 46px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, #c6834c, #d9a873);
  color: #171614;
  font-weight: 700;
  cursor: pointer;
}

.reservation-status {
  grid-column: 1 / -1;
  color: #d9a873;
  line-height: 1.5;
}

.contact-layout {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 28px;
  padding: 80px 0 24px;
}

.info-panel,
.form-panel {
  background: #fff;
  border: 1px solid rgba(25, 21, 18, 0.12);
  border-radius: 24px;
  box-shadow: 0 12px 24px rgba(17, 14, 13, 0.05);
}

.info-panel {
  padding: 28px 24px;
}

.panel-block + .panel-block {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(25, 21, 18, 0.08);
}

.info-panel h2,
.form-header h2,
.section-heading h2 {
  color: #171614;
  font-size: clamp(2rem, 3vw, 2.8rem);
  line-height: 1.15;
  margin-bottom: 10px;
}

.info-panel p,
.stack-list,
.faq-item p {
  color: #51483f;
  line-height: 1.8;
}

.stack-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.stack-list li + li {
  margin-top: 8px;
}

.social-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.social-row a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 16px;
  border-radius: 999px;
  background: #f3eadf;
  color: #171614;
  font-weight: 600;
  text-decoration: none;
}

.accessibility-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 10px 0 16px;
}

.accessibility-badges span {
  padding: 7px 9px;
  border-radius: 8px;
  background: #f3eadf;
  color: #684f3d;
  font-size: 0.75rem;
  font-weight: 700;
}

.playlist-link {
  color: #9d6233;
  font-weight: 700;
}

.form-panel {
  padding: 28px 24px 30px;
}

.form-header {
  margin-bottom: 20px;
}

.contact-form {
  display: grid;
  gap: 18px;
}

.field-row {
  display: grid;
  gap: 8px;
}

.field-row label {
  color: #171614;
  font-weight: 600;
}

.field-row input,
.field-row select,
.field-row textarea {
  width: 100%;
  border: 1px solid rgba(25, 21, 18, 0.14);
  border-radius: 14px;
  background: #fff;
  padding: 14px 16px;
  color: #171614;
  font: inherit;
}

.field-row input:focus,
.field-row select:focus,
.field-row textarea:focus {
  outline: 2px solid rgba(184, 119, 67, 0.2);
  border-color: #c6834c;
}

.form-status {
  border-radius: 14px;
  padding: 14px 16px;
  font-weight: 600;
}

.form-status.success {
  background: #edf8ee;
  color: #1f5a2f;
}

.form-status.error {
  background: #fdecec;
  color: #8a2d2d;
}

.submit-btn {
  background: linear-gradient(135deg, #c6834c, #d9a873);
  color: #171614;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  min-height: 54px;
  font-weight: 700;
  font-size: 1rem;
}

.faq-section {
  padding: 80px 0 90px;
}

.map-section {
  padding: 62px 0 0;
}

.map-frame {
  height: 340px;
  contain: layout paint;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid rgba(25, 21, 18, 0.12);
  box-shadow: 0 12px 24px rgba(17, 14, 13, 0.05);
}

.map-frame iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}

.directions-link {
  display: inline-block;
  margin-top: 14px;
  color: #9d6233;
  font-weight: 700;
}

.event-section {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 36px;
  align-items: start;
  margin-top: 70px;
  padding: 42px 34px;
  border-radius: 24px;
  background: #efe5db;
}

.event-copy h2 {
  margin-bottom: 12px;
  font-size: clamp(2rem, 4vw, 3rem);
}

.event-copy > p:last-child {
  color: #62584e;
  line-height: 1.75;
}

.event-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.event-form label {
  display: grid;
  gap: 7px;
  color: #171614;
  font-size: 0.8rem;
  font-weight: 700;
}

.event-form input,
.event-form select,
.event-form textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(25, 21, 18, 0.14);
  border-radius: 10px;
  background: #fff;
  color: #171614;
  font: inherit;
}

.event-form label.invalid input {
  border-color: #b64141;
  box-shadow: 0 0 0 3px rgba(182, 65, 65, 0.12);
}

.event-field-wide {
  grid-column: 1 / -1;
}

.center {
  text-align: center;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.faq-item {
  background: #fff;
  border: 1px solid rgba(25, 21, 18, 0.12);
  border-radius: 22px;
  padding: 24px 22px;
}

.faq-item button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
  border: 0;
  padding: 0;
  background: transparent;
  color: #171614;
  text-align: left;
  font-weight: 700;
  font-size: 1.3rem;
}

.faq-icon {
  flex: 0 0 auto;
  color: #b87743;
  font-size: 1.6rem;
  font-weight: 400;
  transition: transform 0.2s ease;
}

.faq-item.open .faq-icon {
  transform: rotate(45deg);
}

.faq-item p {
  margin-top: 14px;
  color: #171614;
  line-height: 1.8;
}

.events-section {
  padding: 30px 0 90px;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.events-grid article {
  padding: 24px;
  border-top: 2px solid #c6834c;
  background: #fff;
}

.events-grid span {
  color: #b87743;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.events-grid h3 {
  margin: 10px 0;
  font-size: 1.35rem;
}

.events-grid p {
  min-height: 54px;
  color: #62584e;
  line-height: 1.7;
}

.events-grid a {
  display: inline-block;
  margin-top: 16px;
  color: #9d6233;
  font-weight: 700;
}

.tour-section { padding: 20px 0 90px; }
.tour-frame, .tour-placeholder { min-height: 320px; overflow: hidden; border: 1px solid rgba(25,21,18,0.12); border-radius: 20px; background: #171614; }
.tour-frame iframe { width: 100%; height: 420px; border: 0; }
.tour-placeholder { display: grid; place-items: center; align-content: center; gap: 10px; color: rgba(255,255,255,0.78); text-align: center; }
.tour-placeholder a { color: #d9a873; font-weight: 700; }

@media (max-width: 900px) {
  .reservation-panel,
  .contact-layout,
  .faq-grid,
  .event-section,
  .events-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .reservation-panel {
    padding: 24px 20px;
  }

  .reservation-form {
    grid-template-columns: 1fr;
  }

  .reservation-field-wide,
  .event-field-wide {
    grid-column: auto;
  }

  .event-form {
    grid-template-columns: 1fr;
  }
}
</style>
