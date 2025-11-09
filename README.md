# Not Available - Ecommerce Landing Page

A minimal, clean React-based single-page application (SPA) for an ecommerce website landing page. This project features a modern, responsive design with neutral color scheme and includes Privacy Policy and Terms & Conditions pages compliant with Indian Government regulations.

## Features

- **Minimal Design**: Clean, modern interface with neutral color palette (whites and grays)
- **Responsive Layout**: Mobile-friendly design that works on all devices
- **React SPA**: Built with React and React Router for smooth navigation
- **Legal Compliance**: Privacy Policy and Terms & Conditions pages compliant with:
  - Information Technology Act, 2000
  - Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011
  - Consumer Protection Act, 2019

## Project Structure

```
├── index.html                 # Main HTML entry point
├── package.json               # Project dependencies and scripts
├── vite.config.js            # Vite configuration
├── .env.example              # Environment variables template
├── src/
│   ├── index.jsx             # React entry point
│   ├── App.jsx               # Main app component with routing
│   ├── components/
│   │   ├── Layout.jsx        # Shared layout wrapper
│   │   ├── Header.jsx        # Navigation header
│   │   └── Footer.jsx        # Footer component
│   ├── pages/
│   │   ├── LandingPage.jsx   # Main landing page
│   │   ├── PrivacyPolicy.jsx # Privacy Policy page
│   │   └── TermsConditions.jsx # Terms & Conditions page
│   └── styles/
│       └── App.css           # Main stylesheet
└── README.md                 # This file
```

## Requirements

### Prerequisites

- **Node.js**: Version 16.x or higher
- **npm**: Version 7.x or higher (comes with Node.js)

### Dependencies

- **react**: ^18.2.0 - React library
- **react-dom**: ^18.2.0 - React DOM rendering
- **react-router-dom**: ^6.20.0 - Client-side routing

### Development Dependencies

- **vite**: ^5.0.0 - Build tool and development server
- **@vitejs/plugin-react**: ^4.2.0 - Vite plugin for React

## Installation

### Step 1: Install Dependencies

Open a terminal in the project directory and run:

```bash
npm install
```

This will install all required dependencies listed in `package.json`.

### Step 2: Configure Environment Variables

1. Copy the `.env.example` file to `.env`:

```bash
copy .env.example .env
```

2. Edit the `.env` file and fill in your actual values:
   - Contact email and phone
   - Company address
   - Grievance officer details (for Privacy Policy compliance)

### Step 3: Start Development Server

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or the port specified in `vite.config.js`).

## Available Scripts

- **`npm run dev`**: Start the development server with hot module replacement
- **`npm run build`**: Build the project for production (outputs to `dist/` folder)
- **`npm run preview`**: Preview the production build locally

## Building for Production

To create a production build:

```bash
npm run build
```

The optimized files will be in the `dist/` directory, ready to be deployed to any static hosting service.

## Pages

### Landing Page (`/`)

The main landing page includes:
- **Hero Section**: Company name, tagline, and call-to-action button
- **Featured Products**: Grid of product cards with placeholders
- **About Section**: Company description
- **Contact Section**: Contact information and contact form

### Privacy Policy (`/privacy-policy`)

Comprehensive privacy policy compliant with Indian IT Act 2000 and IT Rules 2011, including:
- Information collection practices
- Data usage and disclosure
- User rights
- Grievance officer details
- Security measures

### Terms & Conditions (`/terms-conditions`)

Terms and conditions compliant with Consumer Protection Act 2019, including:
- Website usage terms
- Product and pricing information
- Order and payment terms
- Shipping and delivery policies
- Returns and refunds policy
- Dispute resolution procedures

## Customization

### Updating Company Information

1. Update company name in:
   - `src/components/Header.jsx` (logo)
   - `src/components/Footer.jsx` (footer title)
   - `src/pages/LandingPage.jsx` (hero section)

2. Update contact information in:
   - `src/pages/LandingPage.jsx` (contact section)
   - `src/pages/PrivacyPolicy.jsx` (contact and grievance officer details)
   - `src/pages/TermsConditions.jsx` (contact information)

### Styling

All styles are in `src/styles/App.css`. The design uses:
- Neutral color palette (#ffffff, #f8f8f8, #e5e5e5, #666, #333)
- Clean typography
- Responsive grid layouts
- Subtle hover effects

### Adding Products

Edit the `featuredProducts` array in `src/pages/LandingPage.jsx` to add or modify products.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Security Notes

- Never commit `.env` file to version control
- Keep dependencies updated for security patches
- Follow OWASP guidelines for production deployment
- Use HTTPS in production
- Implement proper authentication and authorization for admin features

## Compliance

This project includes legal pages that comply with:
- **IT Act 2000**: Privacy Policy includes required disclosures
- **IT Rules 2011**: Includes grievance officer details and data protection measures
- **Consumer Protection Act 2019**: Terms include refund policies and dispute resolution

**Note**: Review and customize the legal pages with a qualified legal professional to ensure full compliance with your specific business requirements and any updates to Indian regulations.

## License

This project is private and proprietary.

## Support

For questions or issues, please contact:
- Email: contact@notavailable.com
- Phone: +91-XXXXXXXXXX

