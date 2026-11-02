# 🍽️ 8am Resto&Bar - Quick Start Guide

Welcome! Your complete restaurant website is ready. Follow these steps to get it running.

## ✅ Prerequisites Checklist
- [ ] Node.js installed (v22.18.0 or higher)
- [ ] npm installed
- [ ] VS Code with Vue extension (recommended)

## 🚀 Quick Start (3 Steps)

### Step 1: Navigate to Project
```bash
cd "vue web"
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

Then open your browser to the URL shown (usually http://localhost:5173)

---

## 📋 What's Included

### Pages (5 Total)
1. **Home** - Landing page with hero, features, offers, testimonials
2. **Menu** - 36 dishes across 6 categories with interactive filtering
3. **Gallery** - Photo gallery with filter and lightbox viewer
4. **About** - Restaurant story, mission, team, awards
5. **Contact** - Contact form, location, hours, FAQs

### Features
✨ Fully responsive (mobile, tablet, desktop)
✨ Modern Vue.js 3 Composition API
✨ Beautiful orange/dark theme (#ff6b35)
✨ Smooth animations & transitions
✨ Interactive menu filtering
✨ Gallery lightbox modal
✨ Contact form with validation

---

## 🎨 Customization Guide

### Change Restaurant Name
- Update "8am Resto&Bar" text in `src/App.vue` (line 5)

### Update Contact Information
Edit `src/views/Contact.vue`:
- Phone: Line 34-36
- Email: Line 38-40
- Address: Line 23-26
- Hours: Line 44-48

### Modify Menu Items
Edit `src/views/Menu.vue`:
- Find `menuItems` array (line ~53)
- Add/remove/edit menu items with name, price, description

### Add Real Images to Gallery
Edit `src/views/Gallery.vue`:
- Replace placeholder SVG URLs with real image URLs
- Update `galleryImages` array (line ~43)

### Change Color Theme
Search for `#ff6b35` in component files and replace with your color

---

## 📁 Project Structure

```
vue web/
├── src/
│   ├── App.vue              ← Main layout
│   ├── main.js              ← App entry point
│   ├── router.js            ← Navigation routing
│   ├── assets/
│   │   ├── base.css
│   │   └── main.css         ← Global styles
│   └── views/               ← Page components
│       ├── Home.vue
│       ├── Menu.vue
│       ├── Gallery.vue
│       ├── About.vue
│       └── Contact.vue
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔧 Common Tasks

### Build for Production
```bash
npm run build
```
Creates optimized files in `dist/` folder

### Preview Production Build
```bash
npm run preview
```

### Add New Menu Item
1. Open `src/views/Menu.vue`
2. Find `menuItems` array
3. Add new item object with id, category, name, price, description, tags

### Add New Gallery Category
1. Open `src/views/Gallery.vue`
2. Add category name to `filters` array (line ~13)
3. Add images with matching category

---

## 🎯 Demo Content

### Menu Highlights
- **Breakfast**: 6 items (Eggs Benedict, Waffles, Pancakes, etc.)
- **Lunch**: 6 items (Salmon Salad, Pasta, Chicken, etc.)
- **Dinner**: 6 items (Filet Mignon, Scallops, Lobster, etc.)
- **Appetizers**: 6 items (Calamari, Mozzarella Sticks, etc.)
- **Beverages**: 6 items (Mojito, Old Fashioned, Wine, etc.)
- **Desserts**: 6 items (Lava Cake, Crème Brûlée, etc.)

### Gallery Content
- Interior photos (4)
- Food dishes (5)
- Drinks (4)
- Events (4)

---

## 💡 Tips

✨ **Use Vue DevTools** - Install Vue.js devtools browser extension for debugging
✨ **Hot Reload** - Changes save automatically while dev server runs
✨ **Mobile Testing** - Your laptop IP:5173 to test on phone
✨ **Color Scheme** - Theme color: #ff6b35 (orange) appears throughout

---

## 📞 Contact Information (Demo)

Restaurant: 8am Resto&Bar
- Phone: (555) 123-4567
- Email: info@8amrestobar.com
- Address: 123 Gourmet Street, Culinary District

---

## 🆘 Troubleshooting

**Port 5173 already in use?**
```bash
npm run dev -- --port 3000
```

**Dependencies not installing?**
```bash
npm install --force
```

**Page not showing?**
- Check browser console for errors (F12)
- Ensure Vue Router is imported in main.js

---

## 📚 Next Steps

1. ✅ Start dev server (`npm run dev`)
2. 🎨 Customize colors in components
3. 📝 Update menu with real items
4. 📸 Add real restaurant photos
5. ☎️ Update contact information
6. 🚀 Build for production (`npm run build`)

---

**Everything is ready! Start your dev server and explore your website.** 🎉

Questions? Check the main README.md for detailed documentation.
