import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Added for navigation
import { 
  Container,
  Form,
  Button,
  Alert,
  Spinner,
  InputGroup,
  Card,
  Row,
  Col
} from 'react-bootstrap';
import { 
  CurrencyDollar, 
  Telephone,
  CheckCircle,
  XCircle,
  ArrowLeft // Added back arrow icon
} from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const MpesaPayment = () => {
  const navigate = useNavigate(); // Initialize navigation
  const [formData, setFormData] = useState({
    amount: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: '', variant: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Function to handle back navigation
  const handleBack = () => {
    navigate('/'); // Navigates to home page
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^(\+?254|0)[17]\d{8}$/; // Kenyan phone number validation

    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (parseFloat(formData.amount) < 10) {
      newErrors.amount = 'Minimum amount is KSh 10';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid Kenyan phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setMessage({ text: '', variant: '' });
    setPaymentSuccess(false);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Format phone number to 254 format if needed
      let formattedPhone = formData.phone;
      if (formattedPhone.startsWith('0')) {
        formattedPhone = `254${formattedPhone.substring(1)}`;
      } else if (formattedPhone.startsWith('+254')) {
        formattedPhone = formattedPhone.substring(1);
      }

      const response = await axios.post(
        'https://ttok.pythonanywhere.com/api/mpesa_payment',
        {
          amount: formData.amount,
          phone: formattedPhone
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          timeout: 15000
        }
      );

      setMessage({ 
        text: response.data.message || 'Payment initiated successfully. Please check your phone to complete the transaction.', 
        variant: 'success' 
      });
      setPaymentSuccess(true);
      
      // Reset form after successful payment
      setFormData({
        amount: '',
        phone: ''
      });

    } catch (error) {
      let errorMessage = 'Payment failed. Please try again.';
      
      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = error.response.data?.error || 'Invalid request';
            break;
          case 401:
            errorMessage = 'Session expired. Please login again.';
            break;
          case 429:
            errorMessage = 'Too many attempts. Please try again later.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage = error.response.data?.error || errorMessage;
        }
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection.';
      }

      setMessage({ text: errorMessage, variant: 'danger' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          {/* Back Button - moved outside the form */}
          <Button 
            variant="outline-secondary" 
            onClick={handleBack}
            className="mb-3"
          >
            <ArrowLeft className="me-2" />
            Back to Home
          </Button>

          <Card className="shadow">
            <Card.Header className="bg-white py-3">
              <h2 className="mb-0 text-center">M-Pesa Payment</h2>
            </Card.Header>
            <Card.Body>
              {message.text && (
                <Alert variant={message.variant} onClose={() => setMessage({ text: '', variant: '' })} dismissible>
                  <div className="d-flex align-items-center">
                    {message.variant === 'success' ? (
                      <CheckCircle className="me-2" size={20} />
                    ) : (
                      <XCircle className="me-2" size={20} />
                    )}
                    {message.text}
                  </div>
                </Alert>
              )}

              <Form onSubmit={handlePayment}>
                <Form.Group className="mb-4">
                  <Form.Label>Amount (KSh) <span className="text-danger">*</span></Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <CurrencyDollar />
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      isInvalid={!!errors.amount}
                      placeholder="Enter amount"
                      min="10"
                      step="1"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.amount}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <Telephone />
                    </InputGroup.Text>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      isInvalid={!!errors.phone}
                      placeholder="e.g., 0712345678 or 254712345678"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phone}
                    </Form.Control.Feedback>
                  </InputGroup>
                  <Form.Text className="text-muted">
                    Enter your M-Pesa registered phone number
                  </Form.Text>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button
                    variant={paymentSuccess ? "success" : "primary"}
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Processing...
                      </>
                    ) : paymentSuccess ? (
                      <>
                        <CheckCircle className="me-2" />
                        Payment Initiated
                      </>
                    ) : (
                      <>
                        <CurrencyDollar className="me-2" />
                        Pay with M-Pesa
                      </>
                    )}
                  </Button>
                </div>
              </Form>

              {paymentSuccess && (
                <div className="mt-4 p-3 bg-light rounded">
                  <h5 className="mb-3">What to Expect:</h5>
                  <ol>
                    <li>You will receive an M-Pesa push notification</li>
                    <li>Enter your M-Pesa PIN when prompted</li>
                    <li>Wait for payment confirmation SMS</li>
                  </ol>
                  <p className="mb-0 text-muted">
                    If you don't receive the prompt, dial *234*1# to initiate the payment manually.
                  </p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MpesaPayment;