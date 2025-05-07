import React, { useState, useEffect } from 'react';
import { 
  Navbar, 
  Nav, 
  Container, 
  Button, 
  Dropdown,
  Image,
  Badge,
  Modal,
  Form
} from 'react-bootstrap';
import { 
  PersonFill, 
  BoxArrowInRight, 
  PersonPlus,
  Cart3,
  Speedometer2
} from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppNavbar = () => {
  const [user, setUser] = useState(null);
  const [showDashboardModal, setShowDashboardModal] = useState(false);
  const [dashboardPassword, setDashboardPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const storedCartCount = localStorage.getItem('cartCount') || 0;
    setCartCount(parseInt(storedCartCount, 10));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('hasDashboardAccess');
    setUser(null);
    navigate('/');
  };

  const handleDashboardClick = () => {
    setShowDashboardModal(true);
  };

  const handleDashboardAccess = () => {
    const correctPassword = "Muema1254";
    if (dashboardPassword === correctPassword) {
      setPasswordError(false);
      setShowDashboardModal(false);
      localStorage.setItem('hasDashboardAccess', 'true');
      if (user) {
        navigate('/admin'); // Redirect to dashboard if logged in
      } else {
        navigate('/login'); // Redirect to login if not logged in
      }
    } else {
      setPasswordError(true);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <Image 
              src={process.env.PUBLIC_URL + '/1.png'} 
              alt="Company Logo" 
              width="40" 
              height="40" 
              className="me-2"
              onError={(e) => e.target.src = '/placeholder-logo.png'}
            />
            <span className="fw-bold">health diets</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>

            <Nav className="align-items-center">
              <Nav.Link 
                as="button"
                onClick={handleDashboardClick}
                className="me-3 btn btn-link text-white p-0"
                title="User Dashboard"
              >
                <Speedometer2 size={20} />
              </Nav.Link>

              {user ? (
                <>
                  {/* <Nav.Link href="/cart" className="position-relative me-3">
                    <Cart3 size={20} />
                    {cartCount > 0 && (
                      <Badge 
                        pill 
                        bg="danger" 
                        className="position-absolute top-0 start-100 translate-middle"
                        style={{ fontSize: '0.6rem' }}
                      >
                        {cartCount}
                      </Badge>
                    )}
                  </Nav.Link> */}

                  <Dropdown align="end">
                    <Dropdown.Toggle variant="dark" id="dropdown-user" className="d-flex align-items-center">
                      <div className="me-2 d-flex align-items-center">
                        <div 
                          className="rounded-circle bg-primary d-flex align-items-center justify-content-center" 
                          style={{ width: '32px', height: '32px' }}
                        >
                          <PersonFill color="white" size={16} />
                        </div>
                      </div>
                      <span className="d-none d-lg-inline">{user.name.split(' ')[0]}</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="shadow-sm">
                      <Dropdown.Header>
                        <div className="fw-bold">{user.name}</div>
                        <small className="text-muted">{user.email}</small>
                      </Dropdown.Header>
                      <Dropdown.Divider />
                      <Dropdown.Item href="/profile">My Profile</Dropdown.Item>
                      <Dropdown.Item href="/orders">My Orders</Dropdown.Item>
                      <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout}>
                        <BoxArrowInRight className="me-2" />
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <>
                  <Button variant="outline-light" className="me-2" href="/login">
                    <BoxArrowInRight className="me-2" />
                    Login
                  </Button>
                  <Button variant="primary" href="/register">
                    <PersonPlus className="me-2" />
                    Register
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Dashboard Access Modal with Password Protection */}
      <Modal show={showDashboardModal} onHide={() => setShowDashboardModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <Speedometer2 className="me-2" />
            Dashboard Access
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Enter Dashboard Password</Form.Label>
              <Form.Control
                type="password"
                value={dashboardPassword}
                onChange={(e) => setDashboardPassword(e.target.value)}
                placeholder="Enter password"
                isInvalid={passwordError}
              />
              {passwordError && (
                <Form.Control.Feedback type="invalid">
                  Incorrect password. Please try again.
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDashboardModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDashboardAccess}>
            Access Dashboard
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AppNavbar;