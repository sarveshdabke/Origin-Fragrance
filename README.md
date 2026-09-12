# Origin Fragrance

Origin Fragrance is a premium, high-performance luxury e-commerce frontend prototype. Designed with a dark, sophisticated aesthetic, it leverages cutting-edge web animation techniques to deliver an immersive and cinematic user experience.

## ✨ Features

- **Cinematic Scroll Animation:** A highly optimized 300-frame image sequence powered by GSAP ScrollTrigger that scrubs seamlessly as the user scrolls through the hero section.
- **Buttery Smooth Scrolling:** Integrated with Lenis smooth scroll for a premium, fluid navigation experience across all devices and input methods.
- **Global Cart Management:** A slide-out shopping cart drawer with full state management (increase/decrease quantities, remove items) powered by Zustand.
- **Micro-Interactions & Animations:** Page preloader, mobile menus, and product card hover effects built with Framer Motion.
- **Sleek Notifications:** Non-intrusive toast notifications for cart actions using React Hot Toast.
- **Fully Responsive & Accessible:** Tailored for both desktop and mobile screens with ARIA labels and focus trapping for modals.

## 🛠 Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS (Custom dark theme with gold accents)
- **Animations:** 
  - GSAP & `@gsap/react` (ScrollTrigger)
  - Framer Motion
- **Scroll Hijacking:** Lenis (`@studio-freight/lenis`)
- **State Management:** Zustand
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository or extract the project folder.
2. Navigate to the project directory:
   ```bash
   cd extracted
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the development server, run:
```bash
npm run dev
```
The application will be available at `http://localhost:5173/`.

### Building for Production

To create an optimized production build, run:
```bash
npm run build
```
The bundled files will be output to the `dist/` directory.

## 📂 Project Structure

```
├── public/                 # Static assets (images, logos, frame sequences)
│   ├── frames/             # 300-frame sequence for the hero animation
│   └── ...                 # Product images and branding
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── CartDrawer.tsx  # Slide-out shopping cart
│   │   ├── HeroFrames.tsx  # GSAP Canvas frame sequence animation
│   │   ├── Navbar.tsx      # Top navigation and mobile menu
│   │   ├── Preloader.tsx   # Initial loading screen
│   │   └── ProductCard.tsx # Hover-animated product display
│   ├── store/
│   │   └── cartStore.ts    # Zustand global state for the cart
│   ├── App.tsx             # Main layout and page sections
│   ├── index.css           # Global Tailwind and custom CSS
│   └── main.tsx            # React entry point
└── package.json            # Dependencies and scripts
```

## 🎨 Design System
- **Backgrounds:** Pure Black (`bg-black`), Deep Dark (`bg-dark`, `bg-darker`)
- **Typography:** Serif for headings (classic luxury feel), clean Sans-serif for body text.
- **Accents:** Gold (`#D4AF37`) used for borders, hover states, and critical text emphasis.
