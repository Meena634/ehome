import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../Components/Layout/Layout";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../Context/cartHandler";
import { useAuth } from "../Context/auth";
const Cart = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const { cartItems, addToCart, removeFromCart, removeItemFromCart } = useContext(CartContext);
  const checkoutHandler = () => {
    if (!auth?.user) {
      navigate("/signin");
    } else {
      navigate("/placeorder");
    }
  };
  return (
    <Layout>
      <section id="works" className="block works-block">
        <Container fluid>
          <div className="title-holder">
            <h2>Welcome to e-Home</h2>
            <div className="subtitle">Your cart items are:</div>
          </div>
          <Row>
            <Col md={8}>
              {cartItems.length === 0 ? (
                <h2>
                  Cart is empty. <Link to="/">Go Shopping</Link>
                </h2>
              ) : (
                <ListGroup>
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={`${item.id}-${index}`}>
                      <Row className="align-items-center">
                        <Col md={4}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid rounded img-thumbnail"
                          />
                        </Col>
                        <Col md={3}>
                          <Button onClick={() => addToCart(item)}>+</Button>
                          <p>{item.quantity}</p>
                          <Button
                            onClick={() => removeFromCart(item)}
                            disabled={item.quantity === 1}
                          >
                            -
                          </Button>
                        </Col>
                        <Col md={3}>${(item.price * item.quantity).toFixed(2)}</Col>
                        <Col md={2}>
                          <Button onClick={() => removeItemFromCart(item.id)} variant="light">
                            <i className="fas fa-trash"></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h3>
                        Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items) : $
                        {cartItems.reduce((a, c) => a + c.price * c.quantity, 0).toFixed(2)}
                      </h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button
                          onClick={checkoutHandler}
                          type="button"
                          variant="primary"
                          disabled={cartItems.length === 0}
                        >
                          Proceed to Checkout
                        </Button>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
};
export default Cart;
