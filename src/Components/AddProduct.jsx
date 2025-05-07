import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        stock: "",
        category: "",
        image: null
    });

    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.match('image.*')) {
                setMessage({ text: "Please select an image file", type: "danger" });
                return;
            }
            
            // Validate file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                setMessage({ text: "Image must be less than 2MB", type: "danger" });
                return;
            }

            setProduct({ ...product, image: file });
            setPreview(URL.createObjectURL(file));
            setMessage({ text: "", type: "" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ text: "", type: "" });

        const token = localStorage.getItem("token");
        
       

        // Basic validation
        if (!product.name.trim() || !product.price || !product.stock || !product.category || !product.image) {
            setMessage({ text: "Please fill all required fields", type: "danger" });
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price);
        formData.append("description", product.description);
        formData.append("stock", product.stock);
        formData.append("category", product.category);
        formData.append("image", product.image);

        try {
            const response = await axios.post(
                "https://ttok.pythonanywhere.com/api/add_product", 
                formData, 
                {
                    headers: { 
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    },
                }
            );

            setMessage({ 
                text: "Product added successfully!", 
                type: "success" 
            });
            
            // Reset form after 2 seconds
            setTimeout(() => {
                setProduct({
                    name: "",
                    price: "",
                    description: "",
                    stock: "",
                    category: "",
                    image: null
                });
                setPreview(null);
                navigate("/"); // Navigate to home page
            }, 2000);

        } catch (error) {
            const errorMsg = error.response?.data?.error || 
                           error.message || 
                           "Error adding product";
            setMessage({ text: errorMsg, type: "danger" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-white">
                    <h2 className="mb-0">Add New Product</h2>
                </div>
                <div className="card-body">
                    {message.text && (
                        <div className={`alert alert-${message.type}`}>
                            {message.text}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label className="form-label">Product Name *</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="name" 
                                value={product.name} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Price *</label>
                                <div className="input-group">
                                    <span className="input-group-text">$</span>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        name="price" 
                                        value={product.price} 
                                        onChange={handleChange} 
                                        min="0"
                                        step="0.01"
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Stock *</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    name="stock" 
                                    value={product.stock} 
                                    onChange={handleChange} 
                                    min="0"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea 
                                className="form-control" 
                                name="description" 
                                value={product.description} 
                                onChange={handleChange} 
                                rows="3"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Category *</label>
                            <input
                                type="text" 
                                className="form-control" 
                                name="category" 
                                value={product.category} 
                                onChange={handleChange} 
                                placeholder="Enter product category"
                                required
                            />
                            <small className="text-muted"></small>
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Product Image *</label>
                            <input 
                                type="file" 
                                className="form-control" 
                                accept="image/*" 
                                onChange={handleFileChange} 
                                required 
                            />
                            {preview && (
                                <div className="mt-3 d-flex align-items-center">
                                    <img 
                                        src={preview} 
                                        alt="Preview" 
                                        className="img-thumbnail" 
                                        style={{ maxWidth: "150px", maxHeight: "150px" }} 
                                    />
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-danger ms-3"
                                        onClick={() => {
                                            setProduct({...product, image: null});
                                            setPreview(null);
                                        }}
                                    >
                                        Remove Image
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="d-flex justify-content-between">
                            <button 
                                type="button" 
                                className="btn btn-outline-secondary"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span 
                                            className="spinner-border spinner-border-sm me-2" 
                                            role="status" 
                                            aria-hidden="true"
                                        ></span>
                                        Adding...
                                    </>
                                ) : "Add Product"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;