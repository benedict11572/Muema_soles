import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  Modal,
  ProgressBar
} from 'react-bootstrap';
import axios from 'axios';
import { FaMobileAlt, FaShieldAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MpesaPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State management
  const { product } = location.state || {};
  const [formData, setFormData] = useState({
    phoneNumber: '',
    amount: product ? product.price.toFixed(2) : '0.00',
    productName: product?.name || '',
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [progress, setProgress] = useState(0);
  const [checkoutId, setCheckoutId] = useState('');

  // Validate phone number format
  const validatePhoneNumber = (number) => {
    const regex = /^0[17]\d{8}$/;
    return regex.test(number);
  };

  // Redirect if no product data
  useEffect(() => {
    if (!product) {
      navigate('/MpesaPayment', { replace: true }); // Redirect to products page if no product selected
    }
  }, [product, navigate]);

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Simulate payment processing with progress updates
  const simulatePaymentProcessing = async () => {
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setProgress(i);
    }
  };

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePhoneNumber(formData.phoneNumber)) {
      setErrorMsg('Please enter a valid Safaricom phone number (format: 07XXXXXXXX or 01XXXXXXXX)');
      return;
    }

    if (!product || formData.amount <= 0) {
      setErrorMsg('Invalid product or amount');
      return;
    }

    setShowConfirmation(true);
  };

  // Confirm and process payment
  const confirmPayment = async () => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    setShowConfirmation(false);
    setPaymentStatus('processing');
    
    try {
      // Start progress simulation
      simulatePaymentProcessing();

      const response = await axios.post('https://ttok.pythonanywhere.com/api/mpesa_payment', {
        phone_number: formData.phoneNumber,
        amount: formData.amount,
        product_name: formData.productName,
        checkout_request_id: `TTOK${Date.now()}`
      });

      setCheckoutId(response.data.checkout_id);
      setSuccessMsg('Payment initiated successfully. Please check your phone to complete the payment.');
      setPaymentStatus('success');
      setFormData(prev => ({ ...prev, phoneNumber: '' }));
    } catch (error) {
      setErrorMsg(error.response?.data?.error || 'Payment initiation failed. Please try again.');
      setPaymentStatus('failed');
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="warning">
          No product selected. Please go back and select a product to purchase.
        </Alert>
        <Button variant="primary" onClick={() => navigate('/MpesaPayment')}>
          Browse Products
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card className="shadow-lg border-0 rounded-lg overflow-hidden">
              <Card.Header className="bg-success text-white py-3">
                <h3 className="mb-0 text-center">
                  <FaMobileAlt className="me-2" />
                  M-Pesa Payment Gateway
                </h3>
              </Card.Header>
              
              <Card.Body className="p-4">
                <Alert variant="light" className="border border-success">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Product:</strong> {product.name}
                      <br />
                      <strong>Unit Price:</strong> Ksh {product.price.toFixed(2)}
                    </div>
                  </div>
                  <hr />
                  <h5 className="text-end text-success">
                    Total: Ksh {formData.amount}
                  </h5>
                </Alert>

                {errorMsg && (
                  <Alert variant="danger" className="d-flex align-items-center">
                    <FaTimesCircle className="me-2 flex-shrink-0" />
                    {errorMsg}
                  </Alert>
                )}

                {successMsg && (
                  <Alert variant="success" className="d-flex align-items-center">
                    <FaCheckCircle className="me-2 flex-shrink-0" />
                    {successMsg}
                  </Alert>
                )}

                {paymentStatus === 'processing' && (
                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Processing payment...</span>
                      <span>{progress}%</span>
                    </div>
                    <ProgressBar 
                      now={progress} 
                      animated 
                      variant="success" 
                      className="mb-3"
                    />
                  </div>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">
                      <FaMobileAlt className="me-2 text-success" />
                      Safaricom Phone Number
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="e.g., 07XXXXXXXX"
                      required
                      className="py-2"
                    />
                    <Form.Text className="text-muted">
                      Enter your Safaricom number registered with M-Pesa
                    </Form.Text>
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button
                      type="submit"
                      variant="success"
                      size="lg"
                      disabled={loading}
                      className="py-3 fw-bold"
                    >
                      {loading ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <FaShieldAlt className="me-2" />
                          Pay Ksh {formData.amount} via M-Pesa
                        </>
                      )}
                    </Button>
                  </div>
                </Form>

                <div className="mt-4 pt-3 border-top text-center">
                  <small className="text-muted">
                    <FaShieldAlt className="me-1" />
                    Your payment is securely processed by M-Pesa
                  </small>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="text-success">Confirm Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You are about to initiate an M-Pesa payment of:</p>
          <h4 className="text-center my-4">Ksh {formData.amount}</h4>
          <p>for {product.name}</p>
          <p>to phone number: <strong>{formData.phoneNumber}</strong></p>
          <p className="small text-muted">
            You will receive an M-Pesa prompt on your phone to complete the payment.
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="outline-secondary" onClick={() => setShowConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={confirmPayment}>
            Confirm Payment
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MpesaPayment;