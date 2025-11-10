import React from 'react';
import './RefundPolicy.css';

const RefundPolicy = () => {
  return (
    <div className="refund-policy-container">
      <div className="policy-content">
        <h1>Refund & Cancellation Policy</h1>
        
        <section className="policy-section">
          <h2>Refund and Cancellation Policy</h2>
          <p>
            This refund and cancellation policy outlines how you can cancel or seek a refund for a product / service 
            that you have purchased through the Platform. Under this policy:
          </p>

          <h3>Cancellation Policy</h3>
          <ol>
            <li>
              Cancellations will only be considered if the request is made within <strong>7 days</strong> of placing the order. 
              However, cancellation requests may not be entertained if the orders have been communicated to such sellers / 
              merchant(s) listed on the Platform and they have initiated the process of shipping them, or the 
              product is out for delivery. In such an event, you may choose to reject the product at the doorstep.
            </li>
            <li>
              Not Available does not accept cancellation requests for perishable items like flowers, eatables, etc. 
              However, the refund / replacement can be made if the user establishes that the quality of the 
              product delivered is not good.
            </li>
            <li>
              In case of receipt of damaged or defective items, please report to our customer service team. The 
              request would be entertained once the seller/merchant listed on the Platform, has checked and 
              determined the same at its own end. This should be reported within <strong>7 days</strong> of receipt of products.
            </li>
            <li>
              In case you feel that the product received is not as shown on the site or as per your expectations, 
              you must bring it to the notice of our customer service within <strong>7 days</strong> of receiving the product. 
              The customer service team after looking into your complaint will take an appropriate decision.
            </li>
            <li>
              In case of complaints regarding the products that come with a warranty from the manufacturers, 
              please refer the issue to them.
            </li>
          </ol>
        </section>

        <section className="policy-section">
          <h3>Refund Process</h3>
          <p>
            In case of any refunds approved by Not Available, it will take <strong>5 days</strong> for the refund to be 
            processed to you.
          </p>
        </section>

        <section className="policy-section">
          <h2>Return Policy</h2>
          <p>
            We offer refund / exchange within first <strong>2 days</strong> from the date of your purchase. If 
            <strong>2 days</strong> have passed since your purchase, you will not be offered a return, exchange or refund of any kind.
          </p>

          <h3>Eligibility for Return/Exchange</h3>
          <p>In order to become eligible for a return or an exchange:</p>
          <ul>
            <li>The purchased item should be unused and in the same condition as you received it</li>
            <li>The item must have original packaging</li>
            <li>If the item that you purchased is on a sale, then the item may not be eligible for a return / exchange</li>
            <li>Only items found defective or damaged will be replaced based on an exchange request</li>
          </ul>

          <h3>Return Process</h3>
          <p>
            You agree that there may be a certain category of products / items that are exempted from returns or 
            refunds. Such categories of the products would be identified to you at the time of purchase.
          </p>
          <p>
            For exchange / return accepted request(s) (as applicable), once your returned product / item is received 
            and inspected by us, we will send you an email to notify you about receipt of the returned / exchanged product. 
            If the same has been approved after the quality check at our end, your request (i.e. return / exchange) will 
            be processed in accordance with our policies.
          </p>
        </section>

        <section className="policy-section">
          <h2>Shipping Policy</h2>
          <p>
            The orders for the user are shipped through registered domestic courier companies and/or speed post 
            only. Orders are shipped within <strong>3 days</strong> from the date of the order and/or payment or as per the 
            delivery date agreed at the time of order confirmation and delivering of the shipment, subject to courier company / 
            post office norms.
          </p>
          <p>
            Platform Owner shall not be liable for any delay in delivery by the courier company / postal authority. 
            Delivery of all orders will be made to the address provided by the buyer at the time of purchase.
          </p>
          <p>
            If there are any shipping cost(s) levied by the seller or the Platform Owner (as the case be), 
            the same is not refundable.
          </p>
        </section>

        <section className="policy-section">
          <h2>Contact Us</h2>
          <p>
            For any questions or concerns regarding this Refund Policy, please contact our customer service team 
            using the contact information provided on this website.
          </p>
        </section>
      </div>
    </div>
  );
};

export default RefundPolicy;
