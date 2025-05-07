import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    product_id: '',
    customer_name: '',
    phone: '',
    email: '',
    quantity: 1,
    total_price: '',
    selected_product: null
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products'); // Adjust this endpoint as needed
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'quantity' && formData.selected_product) {
      const newQuantity = parseInt(value) || 1;
      const newTotalPrice = (formData.selected_product.price * newQuantity).toFixed(2);
      
      setFormData(prev => ({
        ...prev,
        quantity: newQuantity,
        total_price: newTotalPrice
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductChange = (e) => {
    const productId = e.target.value;
    const selectedProduct = products.find(p => p.id == productId);
    
    if (selectedProduct) {
      const totalPrice = (selectedProduct.price * formData.quantity).toFixed(2);
      
      setFormData(prev => ({
        ...prev,
        product_id: selectedProduct.id,
        selected_product: selectedProduct,
        total_price: totalPrice
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        product_id: '',
        selected_product: null,
        total_price: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.product_id || !formData.customer_name || 
        !formData.phone || !formData.quantity || !formData.total_price) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const orderData = {
        product_id: formData.product_id,
        customer_name: formData.customer_name,
        phone: formData.phone,
        email: formData.email,
        quantity: formData.quantity,
        total_price: formData.total_price
      };

      const response = await axios.post('/api/orders', orderData);
      if (response.status === 201) {
        setSuccess('Order placed successfully!');
        // Reset form but keep the product list
        setFormData({
          product_id: '',
          customer_name: '',
          phone: '',
          email: '',
          quantity: 1,
          total_price: '',
          selected_product: null
        });
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to place order');
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="order-form-container">
      <h2>Place New Order</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Product*</label>
          <select
            name="selected_product"
            value={formData.product_id}
            onChange={handleProductChange}
            required
          >
            <option value="">-- Select a product --</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} - ${product.price}
              </option>
            ))}
          </select>
        </div>

        {formData.selected_product && (
          <div className="product-info">
            <p><strong>Selected:</strong> {formData.selected_product.name}</p>
            <p><strong>Price:</strong> ${formData.selected_product.price}</p>
          </div>
        )}

        <div className="form-group">
          <label>Quantity*</label>
          <input
            type="number"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Total Price</label>
          <input
            type="text"
            name="total_price"
            value={formData.total_price || 'Select a product and quantity'}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Customer Name*</label>
          <input
            type="text"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone*</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          Place Order
        </button>
      </form>

      <style jsx>{`
        .order-form-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h2 {
          text-align: center;
          margin-bottom: 20px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        input, select {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-sizing: border-box;
        }
        .product-info {
          background: #f8f9fa;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 15px;
        }
        .alert {
          padding: 10px;
          margin-bottom: 15px;
          border-radius: 4px;
        }
        .alert-danger {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
        .alert-success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        .submit-btn {
          background-color: #007bff;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          width: 100%;
        }
        .submit-btn:hover {
          background-color: #0069d9;
        }
      `}</style>
    </div>
  );
};

export default OrderForm;