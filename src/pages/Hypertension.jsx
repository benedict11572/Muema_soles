import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  InputGroup,
  Form
} from 'react-bootstrap';
import { FaShoppingCart, FaArrowLeft, FaSearch } from 'react-icons/fa';

const Diabetes = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiabetesProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://ttok.pythonanywhere.com/api/get_products_by_category/Diabetes');
        
        // Filter products for Diabetes category
        const diabetesProducts = response.data.products.filter(product => 
          product.category.toLowerCase() === 'diabetes' ||
          product.health_benefits.toLowerCase().includes('blood sugar') ||
          product.name.toLowerCase().includes('bitter') ||
          product.name.toLowerCase().includes('moringa')
        );

        setProducts(diabetesProducts);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch diabetes products");
      } finally {
        setLoading(false);
      }
    };

    fetchDiabetesProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleOrderNow = (product) => {
    navigate('/MpesaPayment', {
      state: {
        product: {
          product_id: product.product_id,
          name: product.name,
          price: parseFloat(product.price),
          image_url: product.image_url
        },
        quantity: 1 // Default quantity
      }
    });
  };

  return (
    <Container className="py-4">
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate('/')}
        className="mb-4"
      >
        <FaArrowLeft className="me-2" />
        Back to All Categories
      </Button>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="text-success">Hypertention Management Products</h2>
          <p className="text-muted">
            Traditional foods that help control blood sugar levels naturally
          </p>
        </div>
        
        <InputGroup style={{ width: '300px' }}>
          <Form.Control
            placeholder="Search diabetes products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
        </InputGroup>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="success" />
          <p className="mt-2">Loading hypertension products...</p>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : filteredProducts.length === 0 ? (
        <Alert variant="info">
          {searchTerm ? 
            "No diabetes products match your search" : 
            "No diabetes products available currently"
          }
        </Alert>
      ) : (
        <Row className="g-4">
          {filteredProducts.map(product => (
            <Col key={product.product_id} lg={3} md={4} sm={6}>
              <Card className="h-100 shadow-sm">
                <Card.Img 
                  variant="top" 
                  src={`https://ttok.pythonanywhere.com/static/images/${product.image_url}`}
                  style={{ 
                    height: '200px', 
                    objectFit: 'contain',
                    padding: '1rem'
                  }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className="text-muted small">
                    {product.description?.slice(0, 100)}...
                  </Card.Text>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-bold text-success">
                        Ksh {product.price}
                      </span>
                      <span className="badge bg-secondary">
                        {product.stock_quantity} in stock
                      </span>
                    </div>
                    <div className="d-flex justify-content-between">
                     

                      <Button 
                        variant="success" 
                        size="sm"
                        onClick={() => handleOrderNow(product)}
                      >
                        <FaShoppingCart className="me-1" />
                        Order Now
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Diabetes;