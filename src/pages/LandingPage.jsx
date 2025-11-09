import React, { useEffect } from 'react';
import forkImage from '../../images/2 in 1 fork angle 2.jpg';
import bambooBrushImage from '../../images/bamboo brush top view.jpg';
import fruitSlicerImage1 from '../../images/fruit slicer banner 4.jpg';
import fruitSlicerImage2 from '../../images/fruit slicer banner 4 copy.jpg';

function LandingPage() {
  const featuredProducts = [
    { 
      id: 1, 
      name: '2-in-1 Fork', 
      description: 'Versatile and elegant design for modern dining',
      image: forkImage
    },
    { 
      id: 2, 
      name: 'Bamboo Brush', 
      description: 'Eco-friendly and sustainable cleaning solution',
      image: bambooBrushImage
    },
    { 
      id: 3, 
      name: 'Fruit Slicer', 
      description: 'Precision cutting for perfect fruit preparation',
      image: fruitSlicerImage1
    },
    { 
      id: 4, 
      name: 'Premium Fruit Slicer', 
      description: 'Professional-grade kitchen essential',
      image: fruitSlicerImage2
    }
  ];

  useEffect(() => {
    // Add fade-in animation to product cards on mount
    const cards = document.querySelectorAll('.product-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
            }, index * 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content fade-in-up">
            <h1 className="hero-title">Not Available</h1>
            <p className="hero-tagline">Minimal ecommerce, maximum impact</p>
            <button className="cta-button" aria-label="Explore our products">Explore Products</button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products section-padding">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                  />
                </div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <button className="product-button" aria-label={`View details for ${product.name}`}>
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about section-padding">
        <div className="container">
          <h2 className="section-title">About Us</h2>
          <div className="about-content">
            <p className="about-text">
              Not Available is committed to providing a minimal, clean ecommerce experience. 
              We focus on quality products and exceptional service, stripped of unnecessary complexity.
            </p>
            <p className="about-text">
              Our mission is to deliver simplicity and elegance in every interaction, ensuring 
              that your shopping experience is both effortless and enjoyable.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact section-padding">
        <div className="container">
          <h2 className="section-title">Contact Us</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <strong>Email:</strong>
                <a href="mailto:wesourceb2c@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                  wesourceb2c@gmail.com
                </a>
              </div>
              <div className="contact-item">
                <strong>Phone:</strong>
                <a href="tel:+917982572738" style={{ color: 'inherit', textDecoration: 'none' }}>
                  +91-7982572738
                </a>
              </div>
              <div className="contact-item">
                <strong>Address:</strong>
                <span>PK-78, Sector - 122, Noida - 201301, Uttar Pradesh, India</span>
              </div>
            </div>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="form-input" 
                  aria-label="Your name"
                  required
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="form-input" 
                  aria-label="Your email"
                  required
                />
              </div>
              <div className="form-group">
                <textarea 
                  placeholder="Your Message" 
                  rows="5" 
                  className="form-textarea"
                  aria-label="Your message"
                  required
                ></textarea>
              </div>
              <button type="submit" className="form-button">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;

