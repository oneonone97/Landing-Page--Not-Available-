# MyShop - Products Setup Guide

This guide explains how real products from the ezyZip catalog have been integrated into the application.

## Product Images Setup

### Image Location
All product images are located in: `public/products/`

### Products Included

1. **WATER BOTTLE** - Premium stainless steel water bottles (multiple colors)
2. **DHOOP DANI** - Traditional brass incense holders
3. **WATERPROOF TOTE BAG** - Large waterproof shopping bags (orange, pink, yellow)
4. **BAMBOO HAIR BRUSH** - Eco-friendly bamboo hair brushes
5. **WHISKY GLASS** - Crystal whisky glasses (320ml)
6. **STAINLESS STEEL WATER BOTTLE** - Insulated water bottles (multiple finishes)
7. **GAMING MOUSE** - Professional gaming mouse with RGB
8. **BAMBOO DISH SCRUB** - Eco-friendly kitchen scrubbers
9. **TOWEL** - Premium microfiber towels (multiple colors)
10. **TUMBLER** - Insulated tumblers with lids

### Image Directory Structure

```
public/products/
├── WATER BOTTLE/
│   ├── water bottle silver.jpg
│   ├── water bottle silver angle 1.jpg
│   ├── water bottle silver banner.jpg
│   ├── Wter bottle black.jpg
│   ├── Wter bottle blue.jpg
│   └── Wter bottle red.jpg
├── DHOOP DANI/
│   ├── black dhoop dhani.jpg
│   ├── black dhoop dani angle 1.jpg
│   ├── dhoop dani brown.jpg
│   └── dhoop dani brown angle 1.jpg
├── WATERPROOF TOTE BAG/
│   ├── tote bag orange.jpg
│   ├── tote bag orange banner.jpg
│   ├── tote bag pink.jpg
│   └── tote bag yellow.jpg
├── BAMBOO HAIR BRUSH/
│   ├── bamboo brush.jpg
│   ├── bamboo brush angle 1.jpg
│   └── bamboo brush banner.jpg
├── WHISKY GLASS/
│   ├── Whiskey glass.jpg
│   ├── whisky glass 320ml.jpg
│   └── whisky glass angle 1.jpg
├── STAINLESS STEEL WATER BOTTLE/
│   ├── blue glaze water bottle.jpg
│   ├── ferra brown water bottle.jpg
│   ├── greyish pink water bottle.jpg
│   └── steeple grey water bottle.jpg
├── GAMING MOUSE/
│   ├── gaming mouse.jpg
│   ├── gaming mouse angle 1.jpg
│   └── gaming mouse banner.jpg
├── BAMBOO DISH SCRUB/
│   ├── bamboo dish scrub.jpg
│   ├── bamboo dish scrub angle 1.jpg
│   └── bamboo dish scrub banner.jpg
├── TOWEL/
│   ├── grey towel.jpg
│   ├── dark blue towel.jpg
│   └── pink towel.jpg
└── TUMBLER/
    ├── tumbler.jpg
    ├── tumbler angle 1.jpg
    └── tumbler angle 2.jpg
```

## Product Data Structure

### Local Products JSON

File: `src/data/products.json`

Each product contains:
```json
{
  "id": "prod_001",
  "name": "Product Name",
  "slug": "product-slug",
  "category": "Category Name",
  "subcategory": "Subcategory",
  "description": "Full description",
  "shortDescription": "Brief description",
  "images": {
    "main": "/products/FOLDER/main-image.jpg",
    "thumbnail": "/products/FOLDER/thumb-image.jpg",
    "gallery": [
      "/products/FOLDER/image1.jpg",
      "/products/FOLDER/image2.jpg"
    ]
  },
  "pricing": {
    "basePrice": 399,
    "discount": 100,
    "discountPercentage": 25,
    "finalPrice": 299,
    "currency": "INR"
  },
  "inventory": {
    "stock": 150,
    "inStock": true
  },
  "reviews": {
    "average": 4.5,
    "count": 128
  },
  "metadata": {
    "isActive": true,
    "isFeatured": true,
    "isNew": true
  },
  "specifications": {
    "material": "Stainless Steel",
    "capacity": "1L",
    "color": "Silver"
  }
}
```

## How Images Are Served

### Frontend (React)
Images are referenced using absolute paths from the `public` folder:

```javascript
// In component
<img src="/products/WATER BOTTLE/water bottle silver.jpg" alt="Water Bottle" />

// Or from product data
<img src={product.images.main} alt={product.name} />
```

### Backend Integration
When the backend is running and has products in the database, images should be:
1. Uploaded to a cloud storage (AWS S3, Cloudinary)
2. Or served from backend public folder
3. URLs stored in database

For now, frontend serves images directly from `public/products/`

## Adding More Products

### Step 1: Copy Images

```bash
# From ezyZip folder, copy product images
cp -r "ezyZip/PRODUCT_NAME" "myshopReact/my-project/public/products/"
```

### Step 2: Add to products.json

```json
{
  "id": "prod_new",
  "name": "New Product Name",
  "images": {
    "main": "/products/PRODUCT_NAME/main-image.jpg",
    "gallery": ["/products/PRODUCT_NAME/image1.jpg"]
  },
  // ... other fields
}
```

### Step 3: Update Backend (if using)

Add product to backend database via:
1. Admin panel (when built)
2. API endpoint: `POST /api/products`
3. Database seeder script

## Product Categories

Current categories in use:

1. **Drinkware**
   - Water Bottles
   - Tumblers
   - Glassware

2. **Personal Care**
   - Hair Brushes
   - Body Massagers
   - Grooming Tools

3. **Religious Items**
   - Incense Holders
   - Brass Items
   - Pooja Accessories

4. **Bags**
   - Tote Bags
   - Laptop Bags
   - Travel Bags

5. **Cleaning**
   - Kitchen Scrubbers
   - Cleaning Cloths
   - Dish Cleaners

6. **Electronics**
   - Gaming Accessories
   - Computer Peripherals
   - Keyboards & Mice

7. **Textiles**
   - Towels
   - Cloths
   - Fabrics

8. **Kitchen**
   - Utensils
   - Storage
   - Cookware

## Image Optimization Tips

### For Production:

1. **Compress Images**
   ```bash
   # Using imagemagick or similar tool
   mogrify -quality 85 -resize 800x800 *.jpg
   ```

2. **Use WebP Format**
   ```bash
   # Convert to WebP for better compression
   cwebp -q 85 input.jpg -o output.webp
   ```

3. **Lazy Loading**
   ```jsx
   <img
     src={product.images.main}
     loading="lazy"
     alt={product.name}
   />
   ```

4. **Responsive Images**
   ```jsx
   <picture>
     <source srcset="/products/ITEM/image-small.jpg" media="(max-width: 600px)" />
     <source srcset="/products/ITEM/image-medium.jpg" media="(max-width: 1200px)" />
     <img src="/products/ITEM/image-large.jpg" alt="Product" />
   </picture>
   ```

## Backend Product Seeder

To seed backend database with products (when backend is running):

### Option 1: Via API Script

Create `scripts/seed-products.js`:
```javascript
const axios = require('axios');
const products = require('../src/data/products.json');

async function seedProducts() {
  for (const product of products) {
    try {
      await axios.post('http://localhost:5000/api/products', product, {
        headers: {
          'Authorization': `Bearer ${ADMIN_TOKEN}`
        }
      });
      console.log(`Added: ${product.name}`);
    } catch (error) {
      console.error(`Failed: ${product.name}`, error.message);
    }
  }
}

seedProducts();
```

### Option 2: Direct Database Insert

In backend, create seeder:
```javascript
// MyShop-backend/scripts/seedProducts.js
const Product = require('../models/Product');
const products = require('./products-data.json');

async function seed() {
  await Product.bulkCreate(products);
  console.log('Products seeded!');
}

seed();
```

## Image URL Conventions

### Local Development
```
http://localhost:5175/products/WATER BOTTLE/water bottle silver.jpg
```

### Production (with CDN)
```
https://cdn.myshop.com/products/water-bottle-silver.jpg
```

## All Available Products

| ID | Name | Category | Stock | Price |
|----|------|----------|-------|-------|
| prod_001 | Premium Water Bottle - Silver | Drinkware | 150 | ₹299 |
| prod_002 | Brass Dhoop Dani - Black | Religious Items | 85 | ₹449 |
| prod_003 | Waterproof Tote Bag - Orange | Bags | 65 | ₹599 |
| prod_004 | Bamboo Hair Brush | Personal Care | 120 | ₹379 |
| prod_005 | Premium Whisky Glass | Glassware | 200 | ₹219 |
| prod_006 | Stainless Steel Bottle - Blue | Drinkware | 95 | ₹649 |
| prod_007 | Professional Gaming Mouse | Electronics | 75 | ₹1,099 |
| prod_008 | Bamboo Dish Scrubber | Cleaning | 180 | ₹149 |
| prod_009 | Luxury Microfiber Towel | Textiles | 110 | ₹529 |
| prod_010 | Insulated Tumbler | Drinkware | 140 | ₹599 |

## Accessing Products in Code

### In React Components

```jsx
import productsData from '../data/products.json';

function ProductList() {
  return (
    <div>
      {productsData.map(product => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
```

### With Backend API

```jsx
import { useEffect, useState } from 'react';
import productService from '../services/productService';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await productService.getProducts();
      setProducts(response.products);
    }
    loadProducts();
  }, []);

  // Render products...
}
```

## Product Variants

Some products have multiple color variants:

**Water Bottle:**
- Silver
- Black
- Blue
- Red

**Dhoop Dani:**
- Black
- Brown

**Tote Bag:**
- Orange
- Pink
- Yellow

**Stainless Steel Bottle:**
- Blue Glaze
- Ferra Brown
- Greyish Pink
- Steeple Grey

**Towel:**
- Grey
- Dark Blue
- Pink

## Future Enhancements

1. **Product Variants System**: Proper variant management with size/color options
2. **Inventory Tracking**: Real-time stock updates
3. **Image CDN**: Move images to cloud storage (Cloudinary/S3)
4. **Image Transformations**: Dynamic resizing and optimization
5. **Product Reviews**: User review and rating system
6. **Related Products**: Product recommendations
7. **Product Search**: Full-text search with filters
8. **Bulk Import**: CSV/Excel product import tool

---

**Note:** All product images are sourced from the ezyZip catalog and are now available in the application with real product names and details!
