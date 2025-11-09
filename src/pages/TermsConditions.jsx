import React from 'react';
import { Link } from 'react-router-dom';

function TermsConditions() {
  return (
    <div className="legal-page">
      <div className="container">
        <h1 className="legal-title">Terms and Conditions</h1>
        <p className="legal-updated">Last Updated: {new Date().toLocaleDateString('en-IN')}</p>

        <div className="legal-content">
          <section className="legal-section">
            <h2>1. Introduction</h2>
            <p>
              Welcome to <strong>Not Available</strong> operating at <strong>www.notavailable.co.in</strong>. These Terms govern your use of our website and services. By using our site, you agree to these Terms.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Definitions</h2>
            <ul>
              <li>"Company," "we," "us," or "our" refers to <strong>Not Available</strong></li>
              <li>"Website" refers to <strong>www.notavailable.co.in</strong></li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. Use of Website</h2>
            <p>
              You must be <strong>18+</strong>. No unlawful use, hacking, or malware.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Products and Pricing</h2>
            <p>
              Prices in INR, exclude shipping unless stated. We may correct errors.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Orders and Payment</h2>
            <p>
              Payments via <strong>PCI-DSS compliant gateways</strong>. Order confirmation ≠ acceptance.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Shipping and Delivery</h2>
            <p>
              India only. 3–10 business days. Risk passes to you on carrier handover.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Returns and Refunds</h2>
            <p>
              <strong>Voluntary 7-day return</strong> for non-defective items. Statutory right only for defective/damaged goods.
            </p>
            <p>
              Refunds: <strong>7 days (UPI) / 10 days (cards)</strong>.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Intellectual Property</h2>
            <p>
              All content © Not Available.
            </p>
          </section>

          <section className="legal-section">
            <h2>9–10. Liability & Indemnification</h2>
            <p>
              Liability capped at amount paid in last 12 months.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Dispute Resolution</h2>
            <p>
              Contact us → Noida courts → Consumer Forum (1915 or consumerhelpline.gov.in).
            </p>
          </section>

          <section className="legal-section">
            <h2>12–13. Modifications & Severability</h2>
            <p>
              Changes posted here. Invalid clauses don't affect others.
            </p>
          </section>

          <section className="legal-section">
            <h2>14. Contact Information</h2>
            <ul>
              <li>Email: wesourceb2c@gmail.com</li>
              <li>Phone: +91-7982572738</li>
              <li>Address: PK-78, Sector - 122, Noida - 201301, Uttar Pradesh, India</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>15. Separate Refund Policy</h2>
            <p>
              Full refund policy: <Link to="/refund-policy"><strong>https://www.notavailable.co.in/refund-policy</strong></Link>
            </p>
          </section>
        </div>
        <hr />
        <p>
          <strong>Not Available</strong><br />
          © {new Date().getFullYear()} Not Available. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default TermsConditions;

