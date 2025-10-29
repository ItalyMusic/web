# 🚀 Quick Start Guide
## Imperial College Egypt Website

### Prerequisites
Make sure you have **pnpm** installed. If not, install it:
```bash
npm install -g pnpm
```

---

## 🏃 Running the Development Server

### Step 1: Install Dependencies (First Time Only)
```bash
pnpm install
```

### Step 2: Start the Development Server
```bash
pnpm dev
```

This will start the Vite development server and display:

```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

### Step 3: Open in Browser
- **On your computer**: Open `http://localhost:5173`
- **On mobile/other devices**: Use the Network URL (e.g., `http://192.168.x.x:5173`)

---

## 📱 Testing on Mobile Devices

1. Make sure your mobile device is on the **same WiFi network** as your computer
2. Note the **Network URL** from the terminal (e.g., `http://192.168.1.100:5173`)
3. Open that URL in your mobile browser
4. Test the responsive design and touch interactions!

---

## 🛠️ Other Commands

### Build for Production
```bash
pnpm build
```
Creates an optimized production build in the `dist/` folder.

### Preview Production Build
```bash
pnpm preview
```
Serves the production build locally for testing.

---

## 🎨 What to Expect

When you open the site, you'll see:

✨ **Glassmorphism Design**
- Beautiful gradient background (#732638 to #1e0a0f)
- Frosted glass panels with blur effects
- Smooth animations and transitions

🍔 **Hamburger Menu**
- Click the ☰ icon in the top-right
- Glass overlay menu with hover effects
- Bottom-to-top animation on menu items
- Color changes from white to burgundy on hover

📱 **Responsive Layout**
- Works perfectly on mobile, tablet, and desktop
- Touch-friendly interactive elements
- Optimized typography for all screen sizes

🔗 **Clickable Contact Info**
- Phone numbers open your phone app
- Email opens your email client
- Floating contact button for quick access

---

## 🌐 Pages Available

1. **Home** (`/`) - Welcome, features, news
2. **About Us** (`/about`) - Philosophy, faculty, facilities
3. **Academics** (`/academics`) - Curriculum, programs
4. **News & Events** (`/news`) - Latest updates, calendar
5. **Contact** (`/contact`) - Contact form and information

---

## 🎯 Key Features to Test

### Navigation
- [ ] Click hamburger menu (☰)
- [ ] Hover over menu items (watch the animation!)
- [ ] Navigate between pages
- [ ] Press Escape to close menu
- [ ] Use Tab key for keyboard navigation

### Interactions
- [ ] Hover over glass panels (they glow!)
- [ ] Click the floating contact button
- [ ] Try the contact form
- [ ] Click phone numbers and email links
- [ ] Scroll through all pages

### Responsive Design
- [ ] Resize browser window
- [ ] Test on mobile device
- [ ] Check tablet view
- [ ] Verify all content is readable

---

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is busy, Vite will automatically use the next available port (5174, 5175, etc.)

### Network URL Not Working
- Check firewall settings
- Ensure devices are on the same network
- Try using your computer's IP address manually

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules
pnpm install
```

---

## 📚 Learn More

- **Vite Documentation**: https://vitejs.dev
- **React Documentation**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com

---

## 💡 Tips

1. **Hot Module Replacement**: Changes you make to the code will instantly reflect in the browser!
2. **Network Testing**: Share the Network URL with friends to show off the site
3. **Performance**: The glassmorphism effects are optimized for smooth 60fps animations
4. **Accessibility**: Try navigating with just your keyboard (Tab, Enter, Escape)

---

**Enjoy exploring the modern Imperial College Egypt website! 🎓✨**
