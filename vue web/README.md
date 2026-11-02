# 8am Resto&Bar - Restaurant Website

A modern, responsive restaurant website built with Vue.js 3 and Vite. This website showcases the 8am Resto&Bar restaurant with sections for home, menu, gallery, about, and contact.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Home Page**: Hero section, features, special offers, testimonials, and statistics
- **Menu**: Comprehensive menu with 6 categories (Breakfast, Lunch, Dinner, Appetizers, Beverages, Desserts)
- **Gallery**: Image gallery with filter options for different categories
- **About**: Restaurant story, mission & values, team information, and achievements
- **Contact**: Contact form, location information, hours, and FAQ section

## Technology Stack

- **Vue.js 3**: Progressive JavaScript framework
- **Vite**: Next generation frontend build tool
- **Vue Router**: Official router for Vue.js
- **CSS3**: Modern styling with Flexbox and Grid layouts

## Project Structure

```
src/
├── App.vue                 # Main app component with navigation
├── main.js                # Entry point
├── router.js              # Vue Router configuration
├── assets/
│   ├── base.css          # Base styles
│   └── main.css          # Global styles
└── views/
    ├── Home.vue          # Home/Landing page
    ├── Menu.vue          # Restaurant menu
    ├── Gallery.vue       # Photo gallery
    ├── About.vue         # About the restaurant
    └── Contact.vue       # Contact and reservation form
```

## Installation & Setup

### Prerequisites
- Node.js 22.18.0 or higher
- npm or yarn

### Steps

1. **Navigate to project directory**
   ```bash
   cd "vue web"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173` (or the URL shown in terminal)

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## Menu Categories (36 Dishes Total)

### Breakfast (6 items)
- Classic Eggs Benedict
- Belgian Waffles
- Fluffy Pancakes
- Vegetable Omelet
- Smoked Salmon Bagel
- Morning Glory Bowl

### Lunch (6 items)
- Grilled Salmon Salad
- Truffle Mushroom Pasta
- Herb-Crusted Chicken
- Classic Caesar Wrap
- Mediterranean Quinoa Bowl
- Prime Rib Sandwich

### Dinner (6 items)
- Filet Mignon
- Pan-Seared Scallops
- Herb Roasted Lamb Chops
- Whole Branzino
- Slow-Cooked Short Ribs
- Lobster Tail

### Appetizers (6 items)
- Shrimp Cocktail
- Crispy Calamari
- Mozzarella Sticks
- Spinach and Artichoke Dip
- Truffle Fries
- Bruschetta Trio

### Beverages (6 items)
- Signature Mojito
- Craft Old Fashioned
- Espresso Martini
- Sangria Pitcher
- Fresh Lemonade
- Iced Cold Brew

### Desserts (6 items)
- Chocolate Lava Cake
- Crème Brûlée
- Tiramisu
- Strawberry Cheesecake
- Chocolate Mousse
- Fruit Sorbet

## Pages Overview

### Home Page
- Eye-catching hero section with call-to-action buttons
- Key features highlighting why customers should visit
- Special offers and promotions
- Customer testimonials
- Restaurant statistics

### Menu Page
- Interactive category tabs for filtering
- Detailed menu items with descriptions
- Price information
- Tag system for dietary preferences (Vegetarian, Vegan, Popular, etc.)

### Gallery Page
- Filterable image gallery (Interior, Food, Drinks, Events)
- Lightbox modal for enlarged image viewing
- Professional restaurant photography

### About Page
- Restaurant history and story
- Mission statement and core values
- Team member profiles
- Awards and achievements
- Community involvement highlights

### Contact Page
- Comprehensive contact form
- Location and hours information
- Phone numbers for different departments
- Social media links
- Frequently Asked Questions (FAQ)

## Color Scheme

- **Primary Color**: #ff6b35 (Orange)
- **Secondary Color**: #1a1a1a (Dark Gray/Black)
- **Accent Color**: #f7931e (Light Orange)
- **Background**: #f9f9f9 (Light Gray)
- **Text**: #333 or #666 (Dark Colors)

## Responsive Breakpoints

- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: Below 768px

## Contact Information (Demo)

- **Phone**: (555) 123-4567
- **Email**: info@8amrestobar.com
- **Address**: 123 Gourmet Street, Culinary District, City, State 12345
- **Hours**: Mon-Fri 8AM-11PM, Sat 7AM-12AM, Sun 7AM-11PM

## How to Customize

### Update Restaurant Information
- Edit restaurant details in `src/views/Contact.vue`
- Update menu items in `src/views/Menu.vue`
- Modify team information in `src/views/About.vue`

### Add Real Images
- Replace placeholder images in `Gallery.vue` with actual image URLs
- Update image paths in components

### Change Colors
- Modify color variables in component `<style>` sections
- Update global colors in `src/assets/main.css`

### Add More Menu Items
- Edit the `menuItems` array in `Menu.vue`
- Add new categories by extending the `categories` array

## Performance Optimization

- Vue 3 Composition API for better performance
- Lazy loading support with Vue Router
- CSS Grid and Flexbox for efficient layouts
- Optimized asset loading

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please contact:
- info@8amrestobar.com
- (555) 123-4567

---

Enjoy your dining experience at 8am Resto&Bar! 🍽️🥂
