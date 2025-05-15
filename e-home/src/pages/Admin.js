/*import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

const Admin = () => {
    const [product, setProduct] = useState({
        brand: '',
        category: '',
        count_in_stock: '',
        description: '',
        image: '',
        name: '',
        num_reviews: '',
        price: '',
        rating: ''
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:2024/api/auth/products/admin', product);
            alert('Product added successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product');
        }
    };

    return (
        <Container>
            <h2 className="mt-4">Admin - Add Product</h2>
            <Form onSubmit={handleSubmit}>
                {Object.keys(product).map((key) => (
                    <Form.Group className="mb-3" key={key}>
                        <Form.Label>{key.replace('_', ' ').toUpperCase()}</Form.Label>
                        <Form.Control
                            type="text"
                            name={key}
                            value={product[key]}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                ))}
                <Button variant="primary" type="submit">Add Product</Button>
            </Form>
        </Container>
    );
};

export default Admin;*/
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

const Admin = () => {
    const [product, setProduct] = useState({
        brand: '',
        category: '',
        countInStock: '', // ✅ Fixed camelCase naming
        description: '',
        image: '',
        name: '',
        numReviews: '', // ✅ Fixed camelCase naming
        price: '',
        rating: ''
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Sending Data:", product); // ✅ Log request payload
            const response = await axios.post('http://localhost:2024/api/auth/products/admin', product);
            
            console.log("Response Status:", response.status); // ✅ Log status
            console.log("Response Data:", response.data); // ✅ Log response
            
            if (response.status === 201) {
                alert('Product added successfully!');
                setProduct({  // ✅ Reset form after successful submission
                    brand: '',
                    category: '',
                    countInStock: '',
                    description: '',
                    image: '',
                    name: '',
                    numReviews: '',
                    price: '',
                    rating: ''
                });
            } else {
                alert('Failed to add product: ' + response.data);
            }
        } catch (error) {
            console.error('Error adding product:', error);
            if (error.response) {
                console.error('Server Response:', error.response.data);
            }
            alert('Failed to add product. Check console for details.');
        }
    };

    return (
        <Container>
            <h2 className="mt-4">Admin - Add Product</h2>
            <Form onSubmit={handleSubmit}>
                {Object.keys(product).map((key) => (
                    <Form.Group className="mb-3" key={key}>
                        <Form.Label>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</Form.Label> 
                        <Form.Control
                            type="text"
                            name={key}
                            value={product[key]}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                ))}
                <Button variant="primary" type="submit">Add Product</Button>
            </Form>
        </Container>
    );
};

export default Admin;
