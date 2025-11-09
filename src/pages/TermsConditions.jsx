import React from 'react';

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
              Welcome to Not Available. These Terms and Conditions ("Terms") govern your access to and 
              use of our e-commerce website and services. By accessing or using our website, you agree 
              to be bound by these Terms. If you do not agree with any part of these Terms, you must 
              not use our website.
            </p>
            <p>
              These Terms are in compliance with the Consumer Protection Act, 2019, Consumer Protection 
              (E-Commerce) Rules, 2020, and other applicable Indian laws and regulations.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Definitions</h2>
            <ul>
              <li><strong>"Company," "we," "us," or "our"</strong> refers to Not Available</li>
              <li><strong>"You" or "your"</strong> refers to the individual accessing or using our website</li>
              <li><strong>"Website"</strong> refers to our ecommerce platform</li>
              <li><strong>"Products"</strong> refers to goods and services offered for sale on our website</li>
              <li><strong>"Order"</strong> refers to a purchase made through our website</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. Use of Website</h2>
            <h3>3.1 Eligibility</h3>
            <p>You must be at least 18 years old to use our website and make purchases.</p>

            <h3>3.2 Account Registration</h3>
            <p>
              You may be required to create an account to access certain features. You are responsible 
              for maintaining the confidentiality of your account credentials and for all activities 
              that occur under your account.
            </p>

            <h3>3.3 Prohibited Activities</h3>
            <p>You agree not to:</p>
            <ul>
              <li>Use the website for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the website</li>
              <li>Transmit any viruses, malware, or harmful code</li>
              <li>Interfere with or disrupt the website's operation</li>
              <li>Use automated systems to access the website without permission</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Products and Pricing</h2>
            <h3>4.1 Product Information</h3>
            <p>
              We strive to provide accurate product descriptions and images. However, we do not warrant 
              that product descriptions, images, or other content on the website are accurate, complete, 
              reliable, current, or error-free.
            </p>

            <h3>4.2 Pricing</h3>
            <p>
              All prices are displayed in Indian Rupees (INR) and are subject to change without notice. 
              Prices include applicable taxes unless otherwise stated. Prices <strong>exclude shipping 
              charges</strong> unless explicitly stated as "free shipping" or "shipping included". Shipping 
              charges, if applicable, will be displayed separately at checkout. We reserve the right to 
              correct any pricing errors.
            </p>

            <h3>4.3 Availability</h3>
            <p>
              Product availability is subject to change. We reserve the right to limit quantities and 
              refuse or cancel orders at our discretion.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Orders and Payment</h2>
            <h3>5.1 Order Process</h3>
            <p>
              When you place an order, you are making an offer to purchase products. We reserve the 
              right to accept or reject your order. An order confirmation does not constitute acceptance 
              of your order.
            </p>

            <h3>5.2 Payment</h3>
            <p>
              Payment must be made at the time of order placement. We accept various payment methods 
              including credit cards, debit cards, net banking, and digital wallets. All payments are 
              processed securely through <strong>PCI-DSS compliant</strong> third-party payment gateways 
              to ensure the highest level of security for your financial information.
            </p>

            <h3>5.3 Order Cancellation</h3>
            <p>
              You may cancel your order before it is shipped. Once an order is shipped, cancellation 
              may not be possible, and you may need to follow the return process instead.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Shipping and Delivery</h2>
            <h3>6.1 Shipping</h3>
            <p>
              We ship products to addresses within India. Shipping charges, if applicable, will be 
              displayed at checkout. <strong>Expected delivery time:</strong> 3-7 business days in metro 
              cities, 5-10 business days in other locations. Delivery times are estimates and not guaranteed. 
              Actual delivery may vary based on location, weather conditions, and carrier schedules.
            </p>

            <h3>6.2 Delivery</h3>
            <p>
              Risk of loss and title for products pass to you upon delivery to the carrier. You are 
              responsible for providing accurate delivery information.
            </p>

            <h3>6.3 Delayed or Failed Delivery</h3>
            <p>
              If delivery is delayed or fails due to incorrect address information provided by you, 
              we are not liable. You may be charged additional fees for re-delivery.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Returns and Refunds</h2>
            <h3>7.1 Return Policy</h3>
            <p>
              We offer a <strong>voluntary 7-day return policy</strong> for non-defective items. Please note 
              that returns are <strong>not a legal right</strong> under the Consumer Protection (E-Commerce) 
              Rules, 2020 unless the product is defective, wrong, or damaged. Our return policy is a customer 
              service benefit and is subject to the following conditions:
            </p>
            <ul>
              <li>Products must be unused, unopened, and in their original packaging</li>
              <li>Products must not be damaged or altered</li>
              <li>Return request must be initiated within 7 days of delivery</li>
              <li>Certain products may not be eligible for return (e.g., perishable goods, personalized items, intimate apparel)</li>
            </ul>
            <p>
              <strong>Legal Right to Return:</strong> You have a <strong>statutory right</strong> to return 
              or seek replacement/refund only if the product is defective, damaged, incorrect, or does not 
              match the description provided on our website, as per the Consumer Protection Act, 2019.
            </p>

            <h3>7.2 Refund Process</h3>
            <p>
              Upon acceptance of your return, we will process a refund to your original payment method 
              within 7-14 business days. Shipping charges are non-refundable unless the product is 
              defective or incorrect.
            </p>

            <h3>7.3 Defective Products</h3>
            <p>
              If you receive a defective or damaged product, please contact us immediately. We will 
              arrange for replacement or full refund, including shipping charges.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, images, and software, is 
              the property of Not Available or its content suppliers and is protected by Indian and 
              international copyright laws.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Not Available shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages, or any loss of profits or revenues, 
              whether incurred directly or indirectly, or any loss of data, use, goodwill, or other 
              intangible losses resulting from your use of the website.
            </p>
            <p>
              Our total liability for any claim arising out of or relating to these Terms or the website 
              shall not exceed the amount you paid to us in the 12 months preceding the claim.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Not Available, its officers, directors, employees, 
              and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) 
              arising out of your use of the website or violation of these Terms.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Dispute Resolution</h2>
            <h3>11.1 Grievance Redressal</h3>
            <p>
              In case of any grievance or dispute, you may contact our customer service team. We will 
              attempt to resolve disputes amicably within 30 days.
            </p>

            <h3>11.2 Jurisdiction</h3>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. 
              Any disputes arising out of or relating to these Terms shall be subject to the exclusive 
              jurisdiction of the courts in Noida, Uttar Pradesh, India.
            </p>

            <h3>11.3 Consumer Forum</h3>
            <p>
              As per the Consumer Protection Act, 2019, you have the right to file a complaint with 
              the appropriate Consumer Disputes Redressal Commission if your grievance is not resolved 
              satisfactorily. You may also approach the <strong>National Consumer Helpline</strong> at 
              <strong> 1915</strong> (toll-free) or file a complaint online at 
              <a href="https://consumerhelpline.gov.in" target="_blank" rel="noopener noreferrer"> consumerhelpline.gov.in</a> 
              for assistance with consumer disputes.
            </p>
          </section>

          <section className="legal-section">
            <h2>12. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately 
              upon posting on the website. Your continued use of the website after changes are posted 
              constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section className="legal-section">
            <h2>13. Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining 
              provisions shall continue in full force and effect.
            </p>
          </section>

          <section className="legal-section">
            <h2>14. Contact Information</h2>
            <p>For any questions or concerns regarding these Terms, please contact us:</p>
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

export default TermsConditions;

