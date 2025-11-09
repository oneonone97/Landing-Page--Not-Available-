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
              Not Available ("we," "our," or "us") operates the e-commerce website and is committed 
              to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, 
              and safeguard your information when you visit our website, in compliance with the Information 
              Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures 
              and Sensitive Personal Data or Information) Rules, 2011, and the Digital Personal Data 
              Protection Act, 2023.
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
              As per the IT Rules, 2011, we may collect sensitive personal data including password, 
              financial information such as bank account or credit card details, physical, physiological, 
              and mental health condition, sexual orientation, medical records and history, and biometric 
              information. We collect sensitive personal data only with your <strong>prior written consent</strong> 
              as required under Rule 5(3) of SPDI Rules. The purpose of collection and consent mechanism 
              will be clearly communicated to you at the time of collection.
            </p>

            <h3>2.3 Automatically Collected Information</h3>
            <p>We may automatically collect certain information about your device, including:</p>
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
            <p>We use the information we collect for the following purposes:</p>
            <ul>
              <li>To process and fulfill your orders</li>
              <li>To communicate with you about your orders, products, services, and promotional offers</li>
              <li>To improve our website, products, and services</li>
              <li>To prevent fraudulent transactions and ensure security</li>
              <li>To comply with legal obligations</li>
              <li>To send you marketing communications (with your consent)</li>
            </ul>
            <p>
              <strong>Important:</strong> We do not use your data for profiling or automated decision-making 
              that affects your legal rights or significantly impacts you.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Disclosure of Information</h2>
            <p>We may disclose your information in the following circumstances:</p>
            <ul>
              <li><strong>Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf. We execute <strong>data processing agreements</strong> with all third parties to ensure compliance with SPDI Rules and protect your data.</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid requests by public authorities</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
              <li><strong>With Your Consent:</strong> We may share information with your explicit consent</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>5. Data Security</h2>
            <p>
              We implement reasonable security practices and procedures as required under Section 43A of the 
              IT Act, 2000 and the IT Rules, 2011 to protect your personal information from unauthorized 
              access, alteration, disclosure, or destruction. We follow <strong>ISO 27001 / SPDI-compliant 
              security controls</strong> including encryption, access control, and audit logs. However, no 
              method of transmission over the Internet or electronic storage is 100% secure.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Your Rights</h2>
            <p>Under the IT Act, 2000, IT Rules, 2011, and the Digital Personal Data Protection Act, 2023, you have the following rights:</p>
            <ul>
              <li><strong>Right to Access:</strong> You can request access to your personal information</li>
              <li><strong>Right to Correction:</strong> You can request correction of inaccurate or incomplete information</li>
              <li><strong>Right to Withdraw Consent:</strong> You can withdraw your consent for data processing at any time</li>
              <li><strong>Right to Deletion:</strong> You may request deletion of your data, subject to legal retention obligations (e.g., tax records, legal disputes)</li>
              <li><strong>Right to Data Portability:</strong> You have the right to receive your data in a structured, commonly used format</li>
            </ul>
            <p>
              <strong>Digital Personal Data Protection Act, 2023:</strong> We comply with the Digital Personal 
              Data Protection Act, 2023. For any data protection concerns, please contact us using the contact 
              information provided in Section 11.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and store 
              certain information. We use <strong>essential cookies</strong> (required for website functionality), 
              <strong> analytics cookies</strong> (to understand website usage), and <strong>marketing cookies</strong> 
              (for personalized advertising, with your consent). You can manage your cookie preferences via your 
              browser settings or our cookie preference center. You can instruct your browser to refuse all cookies 
              or to indicate when a cookie is being sent.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined 
              in this Privacy Policy, unless a longer retention period is required or permitted by law. 
              Specifically:
            </p>
            <ul>
              <li><strong>Order Data:</strong> We retain order and transaction data for <strong>7 years</strong> as required under Indian tax laws (Income Tax Act, GST Act)</li>
              <li><strong>Account Data:</strong> Account data will be deleted within <strong>30 days</strong> of receiving an account closure request, subject to legal retention obligations</li>
              <li><strong>Marketing Data:</strong> Marketing preferences and consent records are retained until you withdraw consent or request deletion</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>9. Children's Privacy</h2>
            <p>
              Our website is not intended for children under the age of 18. We do not knowingly collect 
              personal information from children. If you are a parent or guardian and believe your child 
              has provided us with personal information, please contact us.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "Last Updated" date. You are 
              advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <div className="contact-details">
              <p><strong>Email:</strong> wesourceb2c@gmail.com</p>
              <p><strong>Phone:</strong> +91-7982572738</p>
              <p><strong>Address:</strong> PK-78, Sector - 122, Noida - 201301, Uttar Pradesh, India</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;

