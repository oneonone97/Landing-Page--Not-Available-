/**
 * Test script for imageUtils functions
 * Run with: node test-image-utils.js
 */

// Import the functions (using ES modules)
import { normalizeImagePath, normalizeImageGallery } from './src/utils/imageUtils.js';

// Test cases
const testCases = [
  // Test 1: Supabase Storage URL (should be preserved)
  {
    name: 'Supabase HTTPS URL',
    input: 'https://jvtbbtymefaolozvdpet.supabase.co/storage/v1/object/public/products/products/45/main.jpg',
    expected: 'https://jvtbbtymefaolozvdpet.supabase.co/storage/v1/object/public/products/products/45/main.jpg',
    function: normalizeImagePath
  },
  
  // Test 2: HTTP URL (should be preserved)
  {
    name: 'HTTP URL',
    input: 'http://example.com/image.jpg',
    expected: 'http://example.com/image.jpg',
    function: normalizeImagePath
  },
  
  // Test 3: Local path without leading slash (should add slash)
  {
    name: 'Local path without slash',
    input: 'products/WATER BOTTLE/water bottle silver.jpg',
    expected: '/products/WATER BOTTLE/water bottle silver.jpg',
    function: normalizeImagePath
  },
  
  // Test 4: Local path with leading slash (should remain unchanged)
  {
    name: 'Local path with slash',
    input: '/products/WATER BOTTLE/water bottle silver.jpg',
    expected: '/products/WATER BOTTLE/water bottle silver.jpg',
    function: normalizeImagePath
  },
  
  // Test 5: Null input (should return placeholder)
  {
    name: 'Null input',
    input: null,
    expected: '/placeholder.jpg',
    function: normalizeImagePath
  },
  
  // Test 6: Undefined input (should return placeholder)
  {
    name: 'Undefined input',
    input: undefined,
    expected: '/placeholder.jpg',
    function: normalizeImagePath
  },
  
  // Test 7: Empty string (should return placeholder)
  {
    name: 'Empty string',
    input: '',
    expected: '/placeholder.jpg',
    function: normalizeImagePath
  },
  
  // Test 8: Placeholder string (should return placeholder)
  {
    name: 'Placeholder string',
    input: 'placeholder.jpg',
    expected: '/placeholder.jpg',
    function: normalizeImagePath
  },
  
  // Test 9: Gallery with mixed URLs
  {
    name: 'Gallery with mixed URLs',
    input: [
      'https://supabase.co/img1.jpg',
      'products/img2.jpg',
      '/products/img3.jpg',
      'https://cdn.example.com/img4.jpg'
    ],
    expected: [
      'https://supabase.co/img1.jpg',
      '/products/img2.jpg',
      '/products/img3.jpg',
      'https://cdn.example.com/img4.jpg'
    ],
    function: normalizeImageGallery
  },
  
  // Test 10: Empty gallery array
  {
    name: 'Empty gallery array',
    input: [],
    expected: ['/placeholder.jpg'],
    function: normalizeImageGallery
  },
  
  // Test 11: Null gallery
  {
    name: 'Null gallery',
    input: null,
    expected: ['/placeholder.jpg'],
    function: normalizeImageGallery
  },
  
  // Test 12: Real Supabase URL format
  {
    name: 'Real Supabase Storage URL',
    input: 'https://jvtbbtymefaolozvdpet.supabase.co/storage/v1/object/public/products/products/45/main.jpg',
    expected: 'https://jvtbbtymefaolozvdpet.supabase.co/storage/v1/object/public/products/products/45/main.jpg',
    function: normalizeImagePath
  }
];

// Run tests
console.log('🧪 Testing Image URL Normalization Functions\n');
console.log('='.repeat(70));

let passed = 0;
let failed = 0;

testCases.forEach((testCase, index) => {
  try {
    const result = testCase.function(testCase.input);
    const isArray = Array.isArray(result) && Array.isArray(testCase.expected);
    
    let success;
    if (isArray) {
      success = JSON.stringify(result) === JSON.stringify(testCase.expected);
    } else {
      success = result === testCase.expected;
    }
    
    if (success) {
      console.log(`✅ Test ${index + 1}: ${testCase.name}`);
      passed++;
    } else {
      console.log(`❌ Test ${index + 1}: ${testCase.name}`);
      console.log(`   Expected: ${JSON.stringify(testCase.expected)}`);
      console.log(`   Got:      ${JSON.stringify(result)}`);
      failed++;
    }
  } catch (error) {
    console.log(`❌ Test ${index + 1}: ${testCase.name}`);
    console.log(`   Error: ${error.message}`);
    failed++;
  }
});

console.log('='.repeat(70));
console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('🎉 All tests passed! Image normalization is working correctly.\n');
  process.exit(0);
} else {
  console.log('⚠️  Some tests failed. Please review the output above.\n');
  process.exit(1);
}

