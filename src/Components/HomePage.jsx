import React, { useEffect, useState } from 'react';
import { FaSyringe, FaHeartbeat, FaHeart, FaWeight, FaTint, FaBone, FaShieldVirus } from 'react-icons/fa';
import { GiStomach, GiCancer } from 'react-icons/gi';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleDiseaseClick = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginRedirect = () => {
    setShowLoginModal(false);
    navigate('/login');
  };

  return (
    <div className="health-page">
      {/* Login Required Modal */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You need to be logged in to view this content. Please login or register to continue.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLoginRedirect}>
            Go to Login
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Hero Section */}
      <section className="hero-section mb-5" style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)',
        backgroundSize: 'cover',
        color: 'white',
        padding: '100px 0',
        textAlign: 'center'
      }}>
        <Container>
          <h1 className="display-4 fw-bold mb-3">Traditional Healing Through Kienyeji Foods</h1>
          <p className="lead mb-4">Discover how indigenous African foods can help manage chronic diseases naturally</p>
          <Button variant="success" size="lg" className="btn-kienyeji" href="#diseases">
            Explore Solutions
          </Button>
        </Container>
      </section>

      {/* Diseases Grid */}
      <section id="diseases" className="container mb-5">
        <h2 className="text-center mb-5">Diseases Managed by Kienyeji Foods</h2>
        
        <Row className="g-4">
          {/* Diabetes */}
          <Col md={4} sm={6}>
            <Card className="disease-card h-100 text-center p-4">
              <FaSyringe className="disease-icon" style={{ fontSize: '2.5rem', color: '#28a745' }} />
              <Card.Body>
                <Card.Title>Diabetes</Card.Title>
                <Card.Text>Control blood sugar with bitter leaf, moringa & garden eggs</Card.Text>
                <Button 
                  variant="outline-success" 
                  onClick={() => handleDiseaseClick('/diabetes')}
                >
                  View Foods
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Hypertension */}
          <Col md={4} sm={6}>
            <Card className="disease-card h-100 text-center p-4">
              <FaHeartbeat className="disease-icon" style={{ fontSize: '2.5rem', color: '#28a745' }} />
              <Card.Body>
                <Card.Title>Hypertension</Card.Title>
                <Card.Text>Lower blood pressure with amaranth, garlic & hibiscus tea</Card.Text>
                <Button 
                  variant="outline-success" 
                  onClick={() => handleDiseaseClick('/hypertension')}
                >
                  View Foods
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Heart Disease */}
          <Col md={4} sm={6}>
            <Card className="disease-card h-100 text-center p-4">
              <FaHeart className="disease-icon" style={{ fontSize: '2.5rem', color: '#28a745' }} />
              <Card.Body>
                <Card.Title>Heart Disease</Card.Title>
                <Card.Text>Boost heart health with avocado, omena & groundnuts</Card.Text>
                <Button 
                  variant="outline-success" 
                  onClick={() => handleDiseaseClick('/heartDisease')}
                >
                  View Foods
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Digestive Issues */}
          <Col md={4} sm={6}>
            <Card className="disease-card h-100 text-center p-4">
              <GiStomach className="disease-icon" style={{ fontSize: '2.5rem', color: '#28a745' }} />
              <Card.Body>
                <Card.Title>Digestive Health</Card.Title>
                <Card.Text>Heal ulcers and IBS with aloe vera, bananas & fermented foods</Card.Text>
                <Button 
                  variant="outline-success" 
                  onClick={() => handleDiseaseClick('/digestiveHealth')}
                >
                  View Foods
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Obesity */}
          <Col md={4} sm={6}>
            <Card className="disease-card h-100 text-center p-4">
              <FaWeight className="disease-icon" style={{ fontSize: '2.5rem', color: '#28a745' }} />
              <Card.Body>
                <Card.Title>Obesity</Card.Title>
                <Card.Text>Lose weight with cassava, coconut & guava</Card.Text>
                <Button 
                  variant="outline-success" 
                  onClick={() => handleDiseaseClick('/Obesity')}
                >
                  View Foods
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Anemia */}
          <Col md={4} sm={6}>
            <Card className="disease-card h-100 text-center p-4">
              <FaTint className="disease-icon" style={{ fontSize: '2.5rem', color: '#28a745' }} />
              <Card.Body>
                <Card.Title>Anemia</Card.Title>
                <Card.Text>Boost iron with black lentils, amaranth & liver</Card.Text>
                <Button 
                  variant="outline-success" 
                  onClick={() => handleDiseaseClick('/anemia')}
                >
                  View Foods
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Arthritis */}
          <Col md={4} sm={6}>
            <Card className="disease-card h-100 text-center p-4">
              <FaBone className="disease-icon" style={{ fontSize: '2.5rem', color: '#28a745' }} />
              <Card.Body>
                <Card.Title>Arthritis</Card.Title>
                <Card.Text>Reduce joint pain with turmeric, ginger & bone broth</Card.Text>
                <Button 
                  variant="outline-success" 
                  onClick={() => handleDiseaseClick('/arthritis')}
                >
                  View Foods
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Cancer */}
          <Col md={4} sm={6}>
            <Card className="disease-card h-100 text-center p-4">
              <GiCancer className="disease-icon" style={{ fontSize: '2.5rem', color: '#28a745' }} />
              <Card.Body>
                <Card.Title>Cancer Prevention</Card.Title>
                <Card.Text>Fight cells with nightshade, turmeric & mushrooms</Card.Text>
                <Button 
                  variant="outline-success" 
                  onClick={() => handleDiseaseClick('/CancerPrevention')}
                >
                  View Foods
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Immunity */}
          <Col md={4} sm={6}>
            <Card className="disease-card h-100 text-center p-4">
              <FaShieldVirus className="disease-icon" style={{ fontSize: '2.5rem', color: '#28a745' }} />
              <Card.Body>
                <Card.Title>Weak Immunity</Card.Title>
                <Card.Text>Strengthen with moringa, baobab & garlic</Card.Text>
                <Button 
                  variant="outline-success" 
                  onClick={() => handleDiseaseClick('/weakImmunity')}
                >
                  View Foods
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Call to Action */}
      <section className="bg-success text-white py-5">
        <Container className="text-center">
          <h2 className="mb-4">Ready to Transform Your Health?</h2>
          <p className="lead mb-4">Get personalized kienyeji food plans for your condition</p>
          <Button 
            variant="light" 
            size="lg"
            onClick={() => handleDiseaseClick('/DietPlanGenerator')}
          >
            Get Your Plan
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;