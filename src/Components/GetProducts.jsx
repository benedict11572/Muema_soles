import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { 
  FaShoppingCart, 
  FaStar, 
  FaTimes, 
  FaSearch
} from "react-icons/fa";
import { 
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Spinner,
  Alert,
  InputGroup
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./footer";

const GetProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [ratings, setRatings] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const img_url = "https://ttok.pythonanywhere.com/static/images/";
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setError("");
        setLoading(true);
        try {
            const response = await axios.get('https://ttok.pythonanywhere.com/api/get_products', {
                headers: {
                    "Accept": "application/json",
                },
                timeout: 10000,
            });
    
            const data = response.data;
    
            if (Array.isArray(data)) {
                setProducts(data);
            } else if (data.products && Array.isArray(data.products)) {
                setProducts(data.products);
            } else {
                setProducts([]);
                setError("Unexpected API response format.");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setError(error.response?.data?.message || "Failed to fetch products. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleRating = (productId) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [productId]: prevRatings[productId] ? 0 : 1,
        }));
    };

    const handleProductClick = (product) => {
        navigate("/MpesaPayment", { state: { product } });
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groupedProducts = filteredProducts.reduce((acc, product) => {
        const category = product.category || "Uncategorized";
        if (!acc[category]) acc[category] = [];
        acc[category].push(product);
        return acc;
    }, {});

    return (
        <Container className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Available Products</h3>
                <Button 
                    variant="primary" 
                    onClick={() => navigate("/Addproduct")}
                >
                    Add New Product
                </Button>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="warning" />
                    <p className="mt-2">Loading products...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <Alert variant="danger" onClose={() => setError("")} dismissible>
                    {error}
                </Alert>
            )}

            {/* Search Bar */}
            <div className="mb-4">
                <InputGroup>
                    <InputGroup.Text>
                        <FaSearch />
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Search products by name or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>
            </div>

            {/* Products Grid */}
            {Object.keys(groupedProducts).length > 0 ? (
                Object.entries(groupedProducts).map(([category, categoryProducts]) => (
                    <div key={category} className="mb-5">
                        <h4 className="border-bottom pb-2 mb-4">{category}</h4>
                        <Row>
                            {categoryProducts.map((product) => (
                                <Col key={product.id} lg={3} md={4} sm={6} className="mb-4">
                                    <Card className="h-100 shadow-sm">
                                        <Card.Img
                                            variant="top"
                                            src={img_url + product.image_url}
                                            alt={product.name}
                                            style={{ 
                                                height: "200px",
                                                objectFit: "contain",
                                                cursor: "pointer",
                                                padding: "1rem"
                                            }}
                                            onClick={() => setSelectedImage(img_url + product.image_url)}
                                        />
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title>{product.name}</Card.Title>
                                            <Card.Text className="text-muted small flex-grow-1">
                                                {product.description?.slice(0, 80)}...
                                            </Card.Text>
                                            <div className="mt-auto">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <span className="fw-bold text-warning">
                                                        Ksh {product.price}
                                                    </span>
                                                    <span className="badge bg-secondary">
                                                        {product.stock} in stock
                                                    </span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <Button
                                                        variant={ratings[product.id] ? "warning" : "outline-secondary"}
                                                        size="sm"
                                                        onClick={() => handleRating(product.id)}
                                                    >
                                                        <FaStar className="me-1" />
                                                        {ratings[product.id] || 0}
                                                    </Button>
                                                    <Button
                                                        variant="warning"
                                                        size="sm"
                                                        onClick={() => handleProductClick(product)}
                                                    >
                                                        <FaShoppingCart className="me-1" />
                                                        order
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                ))
            ) : (
                !loading && (
                    <div className="text-center py-5">
                        <FaTimes size={48} className="text-muted mb-3" />
                        <h5 className="text-muted">No products found</h5>
                        <p className="text-muted">
                            {searchTerm ? "Try a different search term" : "No products available yet"}
                        </p>
                        <Button 
                            variant="primary"
                            onClick={() => navigate("/Addproduct")}
                        >
                            Add New Product
                        </Button>
                    </div>
                )
            )}

            {/* Image Preview Modal */}
            <Modal show={!!selectedImage} onHide={() => setSelectedImage(null)} centered>
                <Modal.Body className="p-0">
                    <img
                        src={selectedImage}
                        alt="Product Preview"
                        className="img-fluid w-100"
                        style={{ borderRadius: "0.3rem" }}
                    />
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default GetProducts;