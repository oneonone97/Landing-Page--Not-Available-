import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <div className="container">
        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-updated">Last Updated: {new Date().toLocaleDateString('en-IN')}</p>

        <div className="legal-content">
          <section className="legal-section">
            <h2>1. Introduction</h2>
            <p>
              <strong>Not Available</strong> ("we," "our," or "us") operates the e-commerce website <strong>www.notavailable.co.in</strong> and is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, in compliance with the <strong>Information Technology Act, 2000</strong>, the <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong>, and the <strong>Digital Personal Data Protection Act, 2023</strong>.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Information We Collect</h2>
            <h3>2.1 Personal Information</h3>
            <p>We may collect the following types of personal information:</p>
            <ul>
              <li>Name and contact details (email address, phone number, postal address)</li>
              <li>Payment information (credit/debit card details, billing address)</li>
              <li>Account credentials (username, password)</li>
              <li>Order history and purchase preferences</li>
            </ul>

            <h3>2.2 Sensitive Personal Data or Information</h3>
            <p>
              As per the IT Rules, 2011, we may collect sensitive personal data including password, financial information, physical, physiological, and mental health condition, sexual orientation, medical records and history, and biometric information. <strong>We collect sensitive personal data only with your explicit prior consent in writing as required under Rule 5(3) of the SPDI Rules, 2011.</strong> The purpose and consent mechanism will be clearly communicated at the time of collection.
            </p>

            <h3>2.3 Automatically Collected Information</h3>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. How We Use Your Information</h2>
            <ul>
              <li>To process and fulfill your orders</li>
              <li>To communicate with you about your orders, products, services, and promotional offers</li>
              <li>To improve our website, products, and services</li>
              <li>To prevent fraudulent transactions and ensure security</li>
              <li>To comply with legal obligations</li>
              <li>To send you marketing communications (with your consent)</li>
            </ul>
            <p>
              <strong>Important:</strong> We do not use your data for profiling or automated decision-making that affects your legal rights or significantly impacts you.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Disclosure of Information</h2>
            <ul>
              <li><strong>Service Providers:</strong> We share data with third-party providers under data processing agreements compliant with SPDI Rules.</li>
              <li><strong>Legal Requirements:</strong> As required by law or public authorities.</li>
              <li><strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale.</li>
              <li><strong>With Your Consent:</strong> Only with explicit consent.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>5. Data Security</h2>
            <p>
              We implement <strong>ISO 27001 / SPDI-compliant security controls</strong> including encryption, access control, and audit logs. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Your Rights</h2>
            <ul>
              <li><strong>Right to Access, Correction, Deletion, Portability</strong></li>
              <li><strong>Right to Withdraw Consent</strong> at any time</li>
            </ul>
            <p>
              We comply with the <strong>Digital Personal Data Protection Act, 2023</strong>.
            </p>
            <h3>6.1 Grievance Officer (Mandatory under SPDI Rule 5(9))</h3>
            <ul>
              <li><strong>Name:</strong> Grievance Officer</li>
              <li><strong>Email:</strong> wesourceb2c@gmail.com</li>
              <li><strong>Phone:</strong> +91-7982572738</li>
              <li><strong>Address:</strong> PK-78, Sector - 122, Noida - 201301, Uttar Pradesh, India</li>
            </ul>
            <p>
              We will respond within <strong>one month</strong> from receipt of complaint.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Cookies and Tracking Technologies</h2>
            <p>
              We use essential, analytics, and marketing cookies (with consent). Manage preferences via browser or our cookie center.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Data Retention</h2>
            <ul>
              <li><strong>Order Data:</strong> 7 years (tax laws)</li>
              <li><strong>Account Data:</strong> Deleted within 30 days of closure request</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>9. Children's Privacy</h2>
            <p>
              Not intended for children under 18.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Changes to This Policy</h2>
            <p>
              We will post updates here with revised "Last Updated" date.
            </p>
          </section>
        </div>
        <hr />
        <p>
          <strong>Not Available</strong><br />
          Email: wesourceb2c@gmail.com | Phone: +91-7982572738<br />
          © {new Date().getFullYear()} Not Available. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;

