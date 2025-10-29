# Imperial College Egypt - Modern Website Rebuild

A modern, glassmorphism-themed rebuild of the Imperial College Egypt website with improved UX and responsive design.

## 🎨 Design Features

### Glassmorphism Theme
- **Background Gradient**: Smooth blend from `#732638` (Imperial Burgundy) to `#1e0a0f` (Dark)
- **Glass Panels**: Frosted glass effect with `backdrop-filter: blur(6px)`
- **Subtle Animations**: Smooth transitions and micro-interactions
- **Responsive Design**: Mobile-first approach with breakpoints for all devices

### Navigation
- **Hamburger Menu (☰)**: Persistent top-right position on all pages
- **Glass Overlay**: Blur backdrop when menu is open
- **Hover Effects**: 
  - Bottom-to-top animation on menu items
  - Color transition from white to `#732638`
  - Transform: `translateY(-6px)` with smooth easing
- **Keyboard Accessible**: Full Tab, Enter, Escape support
- **ARIA Labels**: Complete accessibility implementation

## 📋 Content Extraction

### Source
All content extracted from: **https://imperialcollegeegypt.edu.eg**

### Contact Information
Extracted from homepage footer and contact sections:

- **Email**: info@imperialcollegeegypt.edu.eg
- **Phone Numbers**:
  - 01033313248
  - 01050239226
  - 01050239227

All phone numbers are clickable with `tel:` links, and email is clickable with `mailto:` link.

### Pages Included
1. **Home** - Welcome, announcements, why choose ICE, academics overview, latest news
2. **About Us** - Educational philosophy, faculty, facilities
3. **Academics** - Curriculum overview, British & American programs, extracurricular activities
4. **News & Events** - Latest news, school calendar, upcoming events
5. **Contact** - Contact form, contact information, quick actions

### Assets
Due to website access limitations, placeholder emojis are used instead of original images. The following assets were attempted to be extracted:

- Logo files (attempted from common WordPress paths)
- Hero/banner images
- Facility photos
- Favicon

**Note**: A download script (`download_assets.js`) was created to extract images, but actual image downloads may require manual intervention due to website protection or different URL structures.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Installation

1. Navigate to the project directory:
```bash
cd imperial-college-site
```

2. Install dependencies:
```bash
pnpm install
```

### Running the Development Server

To start the development server with both local and network URLs:

```bash
pnpm dev
```

This will display:
- **Local URL**: `http://localhost:5173` (or next available port)
- **Network URL**: `http://[your-ip]:5173` (accessible from other devices on the same network)

The server is configured to listen on all network interfaces, allowing you to:
- Preview on mobile devices
- Share with friends on the same network
- Test responsive design on multiple devices simultaneously

### Building for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## 🛠️ Technology Stack

- **Framework**: React 18
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM 7
- **Language**: JavaScript (ES6+)

## 📁 Project Structure

```
imperial-college-site/
├── public/
│   └── assets/
│       ├── images/      # Extracted images (if available)
│       └── logos/       # Logo files (if available)
├── src/
│   ├── components/
│   │   ├── Navigation.jsx      # Hamburger menu with glassmorphism
│   │   ├── Layout.jsx          # Main layout wrapper
│   │   └── FloatingContact.jsx # Floating contact button
│   ├── pages/
│   │   ├── Home.jsx            # Homepage
│   │   ├── About.jsx           # About Us page
│   │   ├── Academics.jsx       # Academics & Curriculum
│   │   ├── News.jsx            # News & Events
│   │   └── Contact.jsx         # Contact page
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles with glassmorphism
├── index.html                  # HTML template with SEO meta tags
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── vite.config.js              # Vite configuration
└── package.json                # Dependencies and scripts
```

## ✨ Key Features

### Accessibility
- ✅ Keyboard navigation support
- ✅ ARIA labels and roles
- ✅ Focus visible indicators
- ✅ Semantic HTML structure
- ✅ Reduced motion support for users with motion sensitivity

### Performance
- ✅ Lazy loading for images (when implemented)
- ✅ Optimized animations with CSS transforms
- ✅ Minimal JavaScript bundle
- ✅ Fast page transitions

### SEO
- ✅ Meta tags for description and keywords
- ✅ Open Graph tags for social media
- ✅ Structured data (JSON-LD) for contact information
- ✅ Semantic HTML for better crawling

### Responsive Design
- ✅ Mobile-first approach
- ✅ Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- ✅ Touch-friendly interactive elements
- ✅ Optimized typography for all screen sizes

## 🎯 Design Specifications

### Colors
- **Primary**: `#732638` (Imperial Burgundy)
- **Dark**: `#1e0a0f` (Imperial Dark)
- **Text**: White with varying opacity (90%, 80%, 60%)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900

### Animations
- **Menu Open/Close**: 300ms ease-out
- **Menu Item Hover**: 280ms cubic-bezier(0.22, 0.9, 0.33, 1)
- **Color Transition**: 220ms ease
- **Transform Effects**: translateY(-6px) on hover

### Glass Effect
```css
background: rgba(255, 255, 255, 0.06);
backdrop-filter: blur(6px);
-webkit-backdrop-filter: blur(6px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

## 📝 Content Attribution

All visible text content, structure, and contact information have been extracted from the public-facing pages of **https://imperialcollegeegypt.edu.eg**. This rebuild is for demonstration purposes and respects the original content while presenting it in a modern, accessible format.

### Content Sources by Page:
- **Home**: Main homepage sections, announcements, features
- **About**: Educational philosophy (inferred from homepage content)
- **Academics**: Curriculum information from homepage academics section
- **News**: News items and events from homepage calendar
- **Contact**: Contact details from footer and contact sections

## 🔧 Customization

### Changing Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      'imperial-burgundy': '#732638',
      'imperial-dark': '#1e0a0f',
    },
  },
}
```

### Modifying Animations
Edit `src/index.css` in the `@layer utilities` section.

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add menu item in `src/components/Navigation.jsx`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Known Limitations

1. **Images**: Original images from the website could not be automatically downloaded due to access restrictions. Placeholder emojis are used instead.
2. **Dynamic Content**: News items and events are static. A CMS integration would be needed for dynamic updates.
3. **Forms**: Contact form submission is currently a client-side demo. Backend integration required for actual functionality.

## 📄 License

This is a demonstration project. All content belongs to Imperial College Egypt. The code structure and design implementation are provided as-is for educational purposes.

## 🤝 Contributing

This is a demonstration project. For the official Imperial College Egypt website, please visit: https://imperialcollegeegypt.edu.eg

## 📞 Contact

For questions about Imperial College Egypt, please use the contact information provided on the website:
- Email: info@imperialcollegeegypt.edu.eg
- Phone: 01033313248, 01050239226, 01050239227

---

**Built with ❤️ using Vite + React + Tailwind CSS**
