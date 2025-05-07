import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Form, 
  Button, 
  Alert, 
  Card, 
  ListGroup,
  Badge 
} from 'react-bootstrap';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaClock, 
  FaPaperPlane,
  FaCheckCircle
} from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      try {
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } catch (err) {
        setError('Failed to submit form. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  const contactMethods = [
    {
      icon: <FaEnvelope className="text-primary" size={24} />,
      title: "Email Us",
      details: "ngumbaobenedict@gmail.com",
      description: "We typically respond within 24 hours"
    },
    {
      icon: <FaPhone className="text-success" size={24} />,
      title: "Call Us",
      details: "+254797152000 ",
      description: "Mon-Fri, 9am-5pm EST"
    },
    {
      icon: <FaMapMarkerAlt className="text-danger" size={24} />,
      title: "Visit Us",
      details: "techno house, nairobi, MA 02108",
      description: "By appointment only"
    }
  ];

  return (
    <Container className="py-5">
      <Row className="mb-5 text-center">
        <Col>
          <h1 className="display-5 fw-bold">Contact Us</h1>
          <p className="lead">We're here to help with your herbal remedy questions</p>
        </Col>
      </Row>

      <Row className="g-4 mb-5">
        {contactMethods.map((method, index) => (
          <Col key={index} md={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-4">
              <div className="mb-3">{method.icon}</div>
              <h4>{method.title}</h4>
              <p className="fw-bold">{method.details}</p>
              <p className="text-muted small">{method.description}</p>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="g-4">
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <h3 className="mb-4">Send Us a Message</h3>
              
              {submitted ? (
                <Alert variant="success" className="d-flex align-items-center">
                  <FaCheckCircle className="me-2" size={24} />
                  <div>
                    <h5>Thank you for your message!</h5>
                    <p className="mb-0">We'll get back to you within 24 hours.</p>
                  </div>
                </Alert>
              ) : (
                <Form onSubmit={handleSubmit}>
                  {error && <Alert variant="danger">{error}</Alert>}
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Button 
                    variant="success" 
                    type="submit" 
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : (
                      <>
                        <FaPaperPlane className="me-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <h3 className="mb-4">Additional Information</h3>
              
              <div className="mb-4">
                <h5>Business Hours</h5>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <span className="d-flex align-items-center">
                      <FaClock className="me-2 text-muted" />
                      Monday - Friday
                    </span>
                    <Badge bg="light" text="dark">9:00 AM - 5:00 PM</Badge>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <span className="d-flex align-items-center">
                      <FaClock className="me-2 text-muted" />
                      Saturday
                    </span>
                    <Badge bg="light" text="dark">10:00 AM - 2:00 PM</Badge>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <span className="d-flex align-items-center">
                      <FaClock className="me-2 text-muted" />
                      Sunday
                    </span>
                    <Badge bg="light" text="dark">Closed</Badge>
                  </ListGroup.Item>
                </ListGroup>
              </div>

            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <Card className="border-0 bg-light">
            <Card.Body className="text-center">
              <h4>Connect With Us</h4>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <Button variant="outline-primary">Facebook</Button>
                <Button variant="outline-info">Twitter</Button>
                <Button variant="outline-danger">Instagram</Button>
                <Button variant="outline-dark">LinkedIn</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;