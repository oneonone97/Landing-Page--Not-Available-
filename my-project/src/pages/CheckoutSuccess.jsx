import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import checkoutService from '../services/checkoutService';
import toast from 'react-hot-toast';
import './CheckoutSuccess.css';

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [verificationResult, setVerificationResult] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Extract payment data from URL parameters (PhonePE redirect)
        const merchantTransactionId = searchParams.get('merchantTransactionId') || searchParams.get('transactionId');
        const transactionId = searchParams.get('transactionId');
        const code = searchParams.get('code');
        const response = searchParams.get('response');
        const xVerify = searchParams.get('X-VERIFY') || searchParams.get('xVerify');

        // Also check for orderId
        const orderId = searchParams.get('orderId');

        if (!merchantTransactionId && !orderId) {
          toast.error('Payment information not found');
          navigate('/cart');
          return;
        }

        // If we have orderId, verify payment
        if (orderId && (merchantTransactionId || transactionId)) {
          const paymentData = {
            merchantTransactionId: merchantTransactionId,
            transactionId: transactionId,
            code: code,
            response: response,
            xVerify: xVerify
          };

          const result = await checkoutService.verifyPayment(paymentData, parseInt(orderId));

          setVerificationResult(result);

          if (result.success) {
            toast.success('Payment verified successfully!');
            // Clear saved address after successful payment
            try {
              localStorage.removeItem('checkout_address');
              console.log('✅ Cleared saved address after successful payment');
            } catch (error) {
              console.warn('Failed to clear saved address:', error);
            }
          } else {
            toast.error(result.message || 'Payment verification failed');
            // Keep saved address if payment failed - user might want to retry
          }
        } else if (merchantTransactionId) {
          // Check payment status if we only have merchant transaction ID
          const statusResult = await checkoutService.checkPaymentStatus(merchantTransactionId);
          setVerificationResult(statusResult);

          if (statusResult.success) {
            toast.success('Payment successful!');
            // Clear saved address after successful payment
            try {
              localStorage.removeItem('checkout_address');
              console.log('✅ Cleared saved address after successful payment');
            } catch (error) {
              console.warn('Failed to clear saved address:', error);
            }
          } else {
            toast.error('Payment verification failed');
            // Keep saved address if payment failed - user might want to retry
          }
        } else {
          toast.error('Incomplete payment information');
          navigate('/cart');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        toast.error('Error verifying payment. Please contact support.');
        setVerificationResult({
          success: false,
          message: 'Verification error'
        });
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  const handleViewOrders = () => {
    navigate('/orders');
  };

  if (verifying) {
    return (
      <div className="container checkout-success-page">
        <div className="verifying">
          <div className="spinner"></div>
          <h2>Verifying Payment...</h2>
          <p>Please wait while we verify your payment.</p>
        </div>
      </div>
    );
  }

  const isSuccess = verificationResult?.success;

  return (
    <div className="container checkout-success-page">
      <div className={`success-card ${isSuccess ? 'success' : 'error'}`}>
        {isSuccess ? (
          <>
            <div className="success-icon">✓</div>
            <h2>Payment Successful!</h2>
            <p className="success-message">
              Your order has been confirmed and payment has been processed successfully.
            </p>
            {verificationResult?.data?.orderId && (
              <div className="order-info">
                <p><strong>Order ID:</strong> {verificationResult.data.orderId}</p>
                {verificationResult?.data?.merchantTransactionId && (
                  <p><strong>Transaction ID:</strong> {verificationResult.data.merchantTransactionId}</p>
                )}
              </div>
            )}
            <div className="success-actions">
              <button className="btn btn-primary" onClick={handleViewOrders}>
                View Orders
              </button>
              <button className="btn btn-secondary" onClick={handleContinueShopping}>
                Continue Shopping
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="error-icon">✗</div>
            <h2>Payment Failed</h2>
            <p className="error-message">
              {verificationResult?.message || 'Your payment could not be processed. Please try again.'}
            </p>
            <div className="error-actions">
              <button className="btn btn-primary" onClick={() => navigate('/checkout')}>
                Retry Payment
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/cart')}>
                Return to Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutSuccess;

