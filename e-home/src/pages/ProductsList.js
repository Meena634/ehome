import React, {useEffect, useState } from 'react';
import { Image, Col, Container, Row } from 'react-bootstrap';
import Layout from '../Components/Layout/Layout';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const[products,setProducts] = useState([]);
  
  async function getProducts() {
    const response = await fetch('/api/auth/products')
    const data = await response.json({});
    setProducts(data);
  }

  useEffect(() => {
    getProducts()
  }, [])

    return (
      <Layout>
      <section id="works" className="block works-block">
      <Container fluid>
        <div className="title-holder">
          <h2>welcome to B.Tech wala organic food court</h2>
          <div className="subtitle">our delicious foods</div>
        </div>
        <Row className='portfoliolist'>
          {
            products.map(product => {
              return (
                <Col sm={4} key={product.name}>
                <div className='portfolio-wrapper'>
                  <Link to={`/products/${product.id}`}>
                    <Image src={product.image} />
                    </Link>
                    <div className='label text-center'>
                      <h3>Price:${product.price}</h3>
                      <p>countInStock:{product.countInStock}</p>
                    </div>
                </div>
              </Col>
              );
            })
          }
        </Row>
      </Container>  
    </section>
    </Layout>
    );
};
export default Products;