import React from 'react';
import { Container, Row, Col, Card, Badge, ListGroup } from 'react-bootstrap';
import { FaShoppingCart, FaLeaf, FaFlask, FaMobileAlt, FaServer, FaCode } from 'react-icons/fa';

const AboutProject = () => {
  const features = [
    {
      icon: <FaShoppingCart className="text-primary" size={24} />,
      title: "E-Commerce Platform",
      description: "Complete online shopping experience with product browsing, search, and ordering"
    },
    {
      icon: <FaLeaf className="text-success" size={24} />,
      title: "Health-Focused",
      description: "Specialized in natural remedies for specific health conditions"
    },
    {
      icon: <FaFlask className="text-info" size={24} />,
      title: "Science-Backed",
      description: "Products curated based on traditional knowledge and modern research"
    },
    {
      icon: <FaMobileAlt className="text-warning" size={24} />,
      title: "Responsive Design",
      description: "Fully optimized for all devices from desktop to mobile"
    }
  ];

  const techStack = [
    { name: "React", purpose: "Frontend framework" },
    { name: "React Bootstrap", purpose: "UI components and styling" },
    { name: "Axios", purpose: "API communication" },
    { name: "React Router", purpose: "Navigation and routing" },
    { name: "Python/Flask", purpose: "Backend API (based on your API URL)" },
  ];

  return (
    <Container className="py-5">
      <Row className="mb-5 text-center">
        <Col>
          <h1 className="display-5 fw-bold">About Our Platform</h1>
          <p className="lead">Traditional Remedies Meets Modern E-Commerce</p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col lg={6}>
          <h2 className="mb-4">Project Overview</h2>
          <p>
            Our platform is a specialized e-commerce solution designed to bridge traditional 
            herbal remedies with modern web technology. We've created a seamless shopping 
            experience focused on authentic, health-supportive products.
          </p>
          <p>
            The system currently features specialized categories like hypertension management, 
            with plans to expand to other wellness areas while maintaining our commitment to 
            scientific validation and traditional wisdom.
          </p>
        </Col>
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body>
              <h5 className="card-title">Key Features</h5>
              <ListGroup variant="flush">
                {features.map((feature, index) => (
                  <ListGroup.Item key={index} className="d-flex align-items-center">
                    <div className="me-3">{feature.icon}</div>
                    <div>
                      <strong>{feature.title}</strong>
                      <div className="text-muted small">{feature.description}</div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>


      <Row className="bg-dark rounded p-5 mb-4">
        <Col className="text-center">
          <h2>Our Mission</h2>
          <p className="lead mb-0">
            To make traditional, scientifically-validated remedies accessible through 
            modern technology while maintaining authenticity and quality.
          </p>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Card className="h-100 border-0">
            <Card.Body>
              <h5>For Consumers</h5>
              <p>
                Access to carefully vetted traditional remedies with transparent 
                information about benefits and usage.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 border-0">
            <Card.Body>
              <h5>For Practitioners</h5>
              <p>
                A reliable source of quality products to recommend to patients, 
                with detailed product information.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 border-0">
            <Card.Body>
              <h5>For Developers</h5>
              <p>
                A case study in building specialized e-commerce platforms with 
                React and modern web technologies.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutProject;