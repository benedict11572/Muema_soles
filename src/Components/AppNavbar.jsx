import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Navbar, 
  Nav, 
  Container, 
  Button, 
  Dropdown,
  Image,
  Badge
} from 'react-bootstrap';
import { 
  PersonFill, 
  BoxArrowInRight, 
  PersonPlus,
  Cart3,
  PlusSquare
} from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppNavbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check for logged in user on component mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <Container>
        {/* Brand/Logo */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <Image 
            src={process.env.PUBLIC_URL + '/logo512.png'} 
            alt="Company Logo" 
            width="40" 
            height="40" 
            className="me-2"
          />
          <span className="fw-bold">ShopEase</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Left-aligned navigation links */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>

          {/* Right-aligned auth/user section */}
          <Nav className="align-items-center">
            {user ? (
              <>
                {/* Add Product Button - Only shown for logged in users */}
               

                <Nav.Link as={Link} to="/cart" className="position-relative me-3">
                  <Cart3 size={20} />
                  <Badge 
                    pill 
                    bg="danger" 
                    className="position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: '0.6rem' }}
                  >
                    3
                  </Badge>
                </Nav.Link>

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
                    <Dropdown.Item as={Link} to="/profile">
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/orders">
                      My Orders
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/settings">
                      Settings
                    </Dropdown.Item>
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
                <Button 
                  variant="outline-light" 
                  className="me-2" 
                  as={Link} 
                  to="/login"
                >
                  <BoxArrowInRight className="me-2" />
                  Login
                </Button>
                <Button 
                  variant="primary" 
                  as={Link} 
                  to="/register"
                >
                  <PersonPlus className="me-2" />
                  Register
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;