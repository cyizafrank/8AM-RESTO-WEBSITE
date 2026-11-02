<template>
  <div class="careers-page">
    <section class="careers-hero">
      <div class="container hero-copy">
        <p class="section-label">Join the team</p>
        <h1>Good food needs good people.</h1>
        <p>Bring your craft, curiosity, and care to a restaurant built around thoughtful hospitality.</p>
      </div>
    </section>

    <main class="container careers-content">
      <section class="careers-intro">
        <div><p class="section-label">Open roles</p><h2>Find your place at 8AM.</h2></div>
        <p>We hire people who notice the details, support one another, and want guests to leave feeling better than when they arrived.</p>
      </section>

      <section class="role-list" aria-label="Open positions">
        <article v-for="role in roles" :key="role.title" class="role-card">
          <div><span>{{ role.type }}</span><h3>{{ role.title }}</h3><p>{{ role.description }}</p></div>
          <a :href="`mailto:careers@8amrestobar.com?subject=Application for ${role.title}`">Apply by email ↗</a>
        </article>
      </section>

      <section class="careers-apply">
        <div><p class="section-label">Keep in touch</p><h2>Do not see your role?</h2><p>Send us your resume and a short note about what you would love to bring to the room.</p></div>
        <a class="careers-button" href="mailto:careers@8amrestobar.com?subject=General careers inquiry">Send your resume ↗</a>
      </section>
    </main>
  </div>
</template>

<script setup>
const roles = [
  { title: 'Line cook', type: 'Kitchen · Full time', description: 'Support a seasonal kitchen with strong prep, station ownership, and a love of clean execution.' },
  { title: 'Mixologist', type: 'Bar · Full time', description: 'Build a thoughtful cocktail program and make every guest feel at home at the bar.' },
  { title: 'Server', type: 'Front of house · Part time', description: 'Lead warm, informed service across breakfast, lunch, dinner, and private events.' }
]
</script>

<style scoped>
.careers-page { min-height: 100%; }
.container { width: min(1200px, calc(100% - 40px)); margin: 0 auto; }
.careers-hero { min-height: 390px; display: flex; align-items: center; background: linear-gradient(90deg, rgba(17,14,13,0.8), rgba(17,14,13,0.35)), url('https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1800&q=80') center/cover; }
.hero-copy { max-width: 720px; color: #fff; }
.section-label { display: inline-block; margin-bottom: 12px; color: #d9a873; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; }
.hero-copy h1 { color: #fff; font-size: clamp(2.8rem, 5vw, 4.7rem); line-height: 1.02; }
.hero-copy p:last-child { max-width: 560px; margin-top: 18px; color: rgba(255,255,255,0.8); font-size: 1.08rem; line-height: 1.7; }
.careers-content { padding: 80px 0 100px; }
.careers-intro { display: grid; grid-template-columns: 1fr 0.8fr; gap: 40px; align-items: end; margin-bottom: 36px; }
.careers-intro h2, .careers-apply h2 { font-size: clamp(2rem, 4vw, 3.2rem); }
.careers-intro > p, .careers-apply p { color: #62584e; line-height: 1.8; }
.role-list { display: grid; gap: 14px; }
.role-card { display: flex; justify-content: space-between; gap: 24px; align-items: center; padding: 24px; border: 1px solid rgba(25,21,18,0.12); border-radius: 16px; background: #fff; }
.role-card span { color: #b87743; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
.role-card h3 { margin: 7px 0; font-size: 1.45rem; }
.role-card p { color: #62584e; line-height: 1.6; }
.role-card a, .careers-button { color: #9d6233; font-weight: 800; white-space: nowrap; }
.careers-apply { display: flex; justify-content: space-between; gap: 24px; align-items: center; margin-top: 70px; padding: 34px; border-radius: 20px; background: #efe5db; }
@media (max-width: 700px) { .careers-intro, .role-card, .careers-apply { grid-template-columns: 1fr; display: grid; } .role-card a { margin-top: 8px; } }
</style>
