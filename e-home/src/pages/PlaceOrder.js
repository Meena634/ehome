import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Layout from "../Components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../Context/auth";
import { CartContext } from "../Context/cartHandler";
const PlaceOrder = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [auth] = useAuth();
  const { cartItems } = useContext(CartContext);
  const handleOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    const productIds = cartItems.map((item) => item.id);
    console.log("User ID:", auth.userid);
    console.log("Product IDs:", productIds);
    console.log("Auth Token:", auth.token);
    try {
      const res = await axios.post(
        `http://localhost:2024/api/ehome/orders/${auth.userid}/newOrder`,
        {
          fullName,
          address,
          city,
          postalCode,
          country,
          productIds,
        },
        {
          headers: {
            authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (res.data) {
        toast.success(res.data.message || "Order placed successfully!");
        localStorage.removeItem("cartItems");
        navigate("/confirmorder");
      } else {
        toast.error("Order placement failed.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Something went wrong");
      } else {
        toast.error("Unable to place order.");
      }
    }
  };
  return (
    <Layout title={"Shipping - Ecommerce app"}>
      <section id="contact" className="block contact-block">
        <Container fluid>
          <div className="title-holder">
            <h2>WELCOME TO E-HOME</h2>
            <div className="subtitle">Your Shipping Details</div>
          </div>
          <Container>
            <h2>Shipping Address</h2>
            <Form onSubmit={handleOrder}>
              <Form.Group controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </Form.Group>
              &nbsp;
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Form.Group>
              &nbsp;
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </Form.Group>
              &nbsp;
              <Form.Group controlId="postalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your postal code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
              </Form.Group>
              &nbsp;
              <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </Form.Group>
              &nbsp;
              <div>
                <Button variant="primary" type="submit">
                  Continue
                </Button>
              </div>
            </Form>
          </Container>
        </Container>
      </section>
    </Layout>
  );
};
export default PlaceOrder; 