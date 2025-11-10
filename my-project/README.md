# MyShop - Premium E-commerce Website

A professional, full-featured e-commerce website built with React, designed with a modern UI/UX based on the html_simen theme.

## Features

### Pages
- **Login Page**: Beautiful authentication page with login/signup toggle, social login options, and form validation
- **Homepage**: Feature-rich landing page with hero section, product grids, categories, and newsletter subscription

### Components
- **Header**: Sticky navigation with search bar, account dropdown, cart, and responsive mobile menu
- **Footer**: Multi-column footer with links, contact info, and social media
- **ProductCard**: Professional product display with images, pricing, ratings, and actions
- **Button**: Reusable button component with multiple variants (primary, secondary, outline)
- **Input**: Form input component with label, validation, and error states

### Design System
- **Theme Constants**: Centralized color palette, typography, spacing, and breakpoints
- **Responsive Design**: Mobile-first approach with optimized layouts for all screen sizes
- **Global Styles**: Consistent styling using Poppins font and professional aesthetics

## Design Theme

The design is based on the html_simen e-commerce template with:
- **Primary Color**: #e34444 (Red)
- **Accent Color**: #5492db (Blue)
- **Typography**: Poppins font family
- **Layout**: Bootstrap-inspired grid system
- **Components**: Modern, clean, and user-friendly interface

## Technology Stack

**Frontend:**
- **React 19.1.1**: Latest React with hooks
- **React Router DOM**: Client-side routing
- **Axios**: HTTP client for API calls
- **Context API**: State management (Auth & Cart)
- **Vite**: Fast build tool and dev server
- **ESLint**: Code quality and consistency

**Backend Integration:**
- **Node.js + Express**: REST API server
- **SQLite/Sequelize**: Database and ORM
- **JWT**: Token-based authentication
- **bcryptjs**: Password hashing
- **Redis**: Session management

See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for full backend integration details.

## Project Structure

```
myshopReact/my-project/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── ProductCard.jsx
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   └── Login.jsx
│   ├── services/           # API service layer
│   │   ├── api.js          # Axios instance
│   │   ├── authService.js  # Authentication
│   │   ├── productService.js # Products
│   │   └── cartService.js  # Shopping cart
│   ├── context/            # React Context (State)
│   │   ├── AuthContext.jsx # Auth state
│   │   └── CartContext.jsx # Cart state
│   ├── constants/          # Theme and configuration
│   │   └── theme.js
│   ├── styles/             # Global styles
│   │   └── global.css
│   ├── data/               # Fallback data
│   │   └── products.json
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── .env                    # Environment variables
├── .env.example            # Environment template
├── INTEGRATION_GUIDE.md    # Backend integration guide
├── index.html              # HTML template
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd "c:\Users\rohan\Rohan\Ecommerce Website\myshopReact\my-project"
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:5175
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Running with Backend

For full functionality with backend integration:

**1. Start Backend Server:**
```bash
cd "../MyShop-backend"
npm run dev
```
Backend will run on: http://localhost:5000

**2. Start Frontend Server (in new terminal):**
```bash
cd "myshopReact/my-project"
npm run dev
```
Frontend will run on: http://localhost:5175

**3. Features Available with Backend:**
- User registration & login
- Persistent authentication with JWT tokens
- Shopping cart with database persistence
- Product management
- Order processing
- User profile management

See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for detailed integration documentation and API endpoints.

## Product Catalog

The application includes 8 sample products across multiple categories:
- **Drinkware**: Water Bottles, Whisky Glass
- **Personal Care**: Bamboo Hair Brush
- **Religious Items**: Dhoop Dani
- **Bags**: Waterproof Tote Bag
- **Electronics**: Gaming Mouse
- **Cleaning**: Bamboo Dish Scrub
- **Kitchen**: Stainless Steel Ladle

Products are sourced from the ezyZip catalog structure with proper categorization.

## Features Implemented

### Authentication System ✅
- User registration with backend integration
- Email/password login with JWT tokens
- Auto token refresh mechanism
- Persistent sessions
- Protected routes
- Logout functionality
- Form validation with error messages

### Login/Register Page ✅
- Dual-mode form (Login/Signup toggle)
- Real-time backend validation
- Error handling and user feedback
- Remember me functionality
- Social login UI (Google, Facebook)
- Fully responsive design

### Homepage ✅
- Hero section with call-to-action
- Policy highlights section
- Featured products (backend or fallback)
- New arrivals section
- Category browsing grid
- Newsletter subscription
- Product cards with full functionality

### Product Management ✅
- Backend API integration
- Fallback to local data if backend unavailable
- Product search capability
- Category filtering
- Featured and new product sections
- Product ratings and reviews display

### Shopping Cart ✅
- Add to cart (authenticated users)
- Backend cart persistence
- Cart count badge in header
- Context-based state management
- Real-time cart updates

### Header Component ✅
- Dynamic user menu (shows name when logged in)
- Logout functionality
- Cart count badge
- Search functionality
- Language and currency switchers
- Mobile hamburger menu
- Responsive mega menu

### Footer Component ✅
- Multi-column layout
- Social media links
- Quick links and customer service
- Contact information
- Payment method icons

## Responsive Design

All components are fully responsive with breakpoints:
- **Mobile**: 480px and below
- **Tablet**: 768px
- **Desktop**: 1024px and above

## Color Palette

```css
Primary Colors:
- Primary Red: #e34444
- Primary Dark: #a81919
- White: #ffffff

Secondary Colors:
- Light Gray: #ededed
- Border Gray: #eaeaea
- Text Dark: #333333
- Text Medium: #666666

Accent Colors:
- Blue Accent: #5492db
- Dark Background: #2f2f2f
```

## Backend Integration Status

### ✅ Completed
- User authentication (register/login/logout)
- JWT token management with auto-refresh
- Product listing from backend API
- Shopping cart with backend persistence
- Context-based state management (Auth & Cart)
- API service layer with Axios
- Environment configuration
- Error handling and fallbacks

### 🚧 Ready to Implement (Backend Already Supports)
1. **Product Detail Page**: Backend endpoint exists (`GET /api/products/:id`)
2. **Cart Page**: View and manage cart (`GET /api/cart`, `PUT /api/cart/:itemId`)
3. **Checkout Process**: Order creation (`POST /api/orders`)
4. **Wishlist**: Full CRUD operations (`/api/wishlists`)
5. **User Profile**: View and edit (`GET /api/users/me`)
6. **Order History**: View past orders (`GET /api/orders`)
7. **Product Search**: Advanced search (`GET /api/products/search`)
8. **Reviews**: Product reviews (`/api/reviews`)

### 🔜 Future Enhancements
1. **Payment Gateway**: Stripe/Razorpay integration
2. **Admin Panel**: Product and order management
3. **Real Product Images**: Upload from ezyZip folder
4. **Email Notifications**: Order confirmations
5. **Advanced Filtering**: Multi-criteria product filters
6. **Analytics Dashboard**: Sales and user analytics

## Design Reference

The design is inspired by:
- **HTML Template**: html_simen/index.html, html_simen/detail.html
- **Product Catalog**: ezyZip folder (42 product categories)
- **Color Scheme**: Professional e-commerce aesthetic
- **Typography**: Clean, modern Poppins font

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for educational and development purposes.

## Contact

For questions or support, please contact the development team.

---

**Built with React + Vite + Professional Design Patterns**
