import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Form, 
  Alert,
  ListGroup,
  Badge
} from 'react-bootstrap';
import { 
  FaUtensils, 
  FaAppleAlt, 
  FaCarrot, 
  FaLeaf,
  FaFish,
  FaSeedling,
  FaChevronDown,
  FaChevronUp,
  FaPrint,
  FaHome,
  FaArrowLeft
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DietPlanGenerator = () => {
  const [selectedDisease, setSelectedDisease] = useState('diabetes');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [expandedDay, setExpandedDay] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Diet plans data for each disease
  const dietPlans = {
    diabetes: {
      title: "Diabetes Management Plan",
      description: "This plan helps regulate blood sugar levels through balanced nutrition",
      icon: <FaAppleAlt className="text-danger" />,
      days: {
        monday: {
          meals: {
            breakfast: "Bitter leaf tea + Whole grain toast with avocado",
            snack: "Hand of roasted peanuts",
            lunch: "Ugali with managu and grilled fish",
            dinner: "Garden egg stew with brown rice"
          },
          tips: "Drink plenty of water and avoid sugary drinks"
        },
        tuesday: {
          meals: {
            breakfast: "Moringa smoothie with chia seeds",
            snack: "Sliced cucumbers",
            lunch: "Sweet potato mash with sukuma wiki",
            dinner: "Chicken vegetable stir-fry"
          },
          tips: "Take a 15-minute walk after meals"
        }
      }
    },
    hypertension: {
      title: "Hypertension Control Plan",
      description: "Low-sodium diet rich in potassium to help lower blood pressure",
      icon: <FaLeaf className="text-primary" />,
      days: {
        monday: {
          meals: {
            breakfast: "Oatmeal with baobab fruit",
            snack: "Banana slices",
            lunch: "Amaranth leaves with ugali",
            dinner: "Grilled tilapia with steamed vegetables"
          },
          tips: "Limit salt intake to less than 1 teaspoon per day"
        }
      }
    },
    // Add other diseases similarly...
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const toggleDay = (day) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  const printPlan = () => {
    window.print();
  };

  const handleBackToHome = () => {
    navigate('/'); // Navigates to home page
  };

  return (
    <Container className="py-4 diet-plan-container">
      {/* Back button added to both form and results sections */}
      <Button 
        variant="outline-secondary" 
        onClick={handleBackToHome}
        className="mb-3"
      >
        <FaHome className="me-2" />
        Back to Home
      </Button>

      {!submitted ? (
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow">
              <Card.Header className="bg-success text-white">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">
                    <FaUtensils className="me-2" />
                    Get Your Personalized Diet Plan
                  </h4>
                </div>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                          type="number"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Weight (kg)</Form.Label>
                        <Form.Control
                          type="number"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label>Health Condition</Form.Label>
                    <Form.Select
                      value={selectedDisease}
                      onChange={(e) => setSelectedDisease(e.target.value)}
                    >
                      <option value="diabetes">Diabetes</option>
                      <option value="hypertension">Hypertension</option>
                      <option value="heart">Heart Disease</option>
                      <option value="digestive">Digestive Issues</option>
                      <option value="obesity">Weight Management</option>
                    </Form.Select>
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button variant="success" type="submit" size="lg">
                      Generate My Plan
                    </Button>
                    <Button 
                      variant="outline-secondary" 
                      onClick={handleBackToHome}
                    >
                      <FaArrowLeft className="me-2" />
                      Cancel and Return Home
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="text-success">
                {dietPlans[selectedDisease].icon} {dietPlans[selectedDisease].title}
              </h2>
              <p className="lead">{dietPlans[selectedDisease].description}</p>
              <p>
                <strong>Name:</strong> {name} | <strong>Age:</strong> {age} |{' '}
                <strong>Weight:</strong> {weight}kg
              </p>
            </div>
            <div>
              <Button variant="outline-success" onClick={printPlan} className="me-2">
                <FaPrint className="me-2" />
                Print Plan
              </Button>
              <Button variant="outline-primary" onClick={() => setSubmitted(false)}>
                <FaArrowLeft className="me-2" />
                Edit Details
              </Button>
            </div>
          </div>

          <Row>
            <Col lg={4} className="mb-4">
              <Card className="h-100">
                <Card.Header className="bg-light">
                  <h5 className="mb-0">Key Recommendations</h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <FaCarrot className="text-warning me-2" />
                      Eat 5-6 servings of vegetables daily
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FaFish className="text-info me-2" />
                      Include omega-3 rich foods 3x/week
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FaSeedling className="text-success me-2" />
                      Choose whole grains over refined
                    </ListGroup.Item>
                    {selectedDisease === 'diabetes' && (
                      <>
                        <ListGroup.Item>
                          Monitor blood sugar levels regularly
                        </ListGroup.Item>
                        <ListGroup.Item>
                          Limit fruit intake to 2-3 servings/day
                        </ListGroup.Item>
                      </>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={8}>
              <Card>
                <Card.Header className="bg-light">
                  <h5 className="mb-0">7-Day Meal Plan</h5>
                </Card.Header>
                <Card.Body>
                  {Object.entries(dietPlans[selectedDisease].days).map(([day, plan]) => (
                    <div key={day} className="mb-3">
                      <div 
                        className="d-flex justify-content-between align-items-center p-3 bg-light rounded"
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleDay(day)}
                      >
                        <h5 className="mb-0 text-capitalize">
                          <Badge bg="success" className="me-2">
                            Day {(day === 'monday') ? 1 : 2}
                          </Badge>
                          {day}
                        </h5>
                        {expandedDay === day ? <FaChevronUp /> : <FaChevronDown />}
                      </div>

                      {expandedDay === day && (
                        <div className="p-3 border rounded">
                          <Row>
                            <Col md={6}>
                              <h6>Breakfast</h6>
                              <p>{plan.meals.breakfast}</p>
                            </Col>
                            <Col md={6}>
                              <h6>Morning Snack</h6>
                              <p>{plan.meals.snack}</p>
                            </Col>
                            <Col md={6}>
                              <h6>Lunch</h6>
                              <p>{plan.meals.lunch}</p>
                            </Col>
                            <Col md={6}>
                              <h6>Dinner</h6>
                              <p>{plan.meals.dinner}</p>
                            </Col>
                            <Col xs={12}>
                              <div className="mt-3 p-2 bg-warning bg-opacity-10 rounded">
                                <strong>Daily Tip:</strong> {plan.tips}
                              </div>
                            </Col>
                          </Row>
                        </div>
                      )}
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .diet-plan-container, .diet-plan-container * {
            visibility: visible;
          }
          .diet-plan-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </Container>
  );
};

export default DietPlanGenerator;