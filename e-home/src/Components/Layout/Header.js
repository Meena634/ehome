import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/images/food1.jpg';
import { Badge, Button, Dropdown, NavDropdown } from 'react-bootstrap';
import { useAuth } from "../../Context/auth";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/cartHandler';
const Header = () => {
  const [auth, setAuth] = useAuth();
  const { cartItems  } = useContext(CartContext);
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      userid: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  const [menuVisible, setMenuVisible] = useState(false);
  const titleStyle = {
    fontFamily: 'Quicksand, sans-serif',
    fontWeight: 'bold',
  };
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const closeMenu = () => {
    setMenuVisible(false);
  };
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <div style={{ position: 'relative', display: 'inline-block', right: '2cm' }}>
            <Button
              variant="light"
              onClick={toggleMenu}
              aria-controls="menu-dropdown"
              aria-expanded={menuVisible}
            >
              <span className="fas fa-bars"></span>
            </Button>
          </div>
          <Navbar.Brand href="/" style={titleStyle}>
            <img src={logo} style={{ width: '80px', height: '60px' }} alt="e-Home Logo" />
            &nbsp; B.tech wala organic food
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" style={{ marginLeft: '24cm' }}>
              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <Link to="/aboutus" className="nav-link">
                      About
                    </Link>
                  </li>
                  &nbsp;&nbsp;
                  <li className="nav-item">
                    <Link to="/admin" className="nav-link">
                      Admin
                    </Link>
                  </li>
                  &nbsp;&nbsp;
                  <li className="nav-item">
                    <Link to="/contactus" className="nav-link">
                      Contact
                    </Link>
                  </li>
                  &nbsp;&nbsp;
                  <li className="nav-item">
                    <Link to="/signin" className="nav-link">
                      Signin
                    </Link>
                  </li>
                  &nbsp;&nbsp;
                  <li className="nav-item">
                    <Link to="/cart" className="nav-link">
                      {cartItems.length > 0 && (
                        <Badge pill bg="danger">
                          {cartItems.reduce((a, c) => a + c.quantity, 0)}
                        </Badge>
                      )}
                      <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/aboutus" className="nav-link">
                      About
                    </Link>
                  </li>
                  &nbsp;&nbsp;
                  <li className="nav-item">
                    <Link to="/admin" className="nav-link">
                      Admin
                    </Link>
                  </li>
                  &nbsp;&nbsp;
                  <li className="nav-item">
                    <Link to="/contactus" className="nav-link">
                      Contact
                    </Link>
                  </li>
                  &nbsp;&nbsp;
                  <li className="nav-item">
                    <Link to="/cart" className="nav-link">
                      {cartItems.length > 0 && (
                        <Badge pill bg="danger">
                          {cartItems.reduce((a, c) => a + c.quantity, 0)}
                        </Badge>
                      )}
                      <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    </Link>
                  </li>
                  &nbsp;&nbsp;
                  <li className="nav-item">
                    <NavDropdown title={auth.user} id="basic-nav-dropdown">
                      <NavDropdown.Divider />
                      <Link className="dropdown-item" to="#signout" onClick={handleLogout}>
                        Sign Out
                      </Link>
                    </NavDropdown>
                  </li>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {menuVisible && (
        <Dropdown
          show={menuVisible}
          align="start"
          onToggle={toggleMenu}
          style={{
            position: 'fixed',
            top: 100,
            left: 0,
            height: '100vh',
            width: '80%',
            zIndex: 1000,
            overflowY: 'auto',
          }}
        >
          <Dropdown.Menu style={{ backgroundColor: '#F0F8FF' }}>
            <Dropdown.Item href="#/men" onClick={closeMenu} style={{ marginBottom: '0.5cm' }}>
              Chicken
            </Dropdown.Item>
            <Dropdown.Item href="#/women" onClick={closeMenu} style={{ marginBottom: '0.5cm' }}>
              Mutton
            </Dropdown.Item>
            <Dropdown.Item href="#/mobiles" onClick={closeMenu} style={{ marginBottom: '0.5cm' }}>
              Meal
            </Dropdown.Item>
            <Dropdown.Item href="#/laptops" onClick={closeMenu} style={{ marginBottom: '0.5cm' }}>
              Laddu
            </Dropdown.Item>
            <Dropdown.Item href="#/ipads" onClick={closeMenu} style={{ marginBottom: '0.5cm' }}>
              ice
            </Dropdown.Item>
            <Dropdown.Item href="#/washing-machines" onClick={closeMenu} style={{ marginBottom: '0.5cm' }}>
              Cake
            </Dropdown.Item>
            <Dropdown.Item href="#/air-conditioners" onClick={closeMenu} style={{ marginBottom: '0.5cm' }}>
              Fish
            </Dropdown.Item>
            <Dropdown.Item href="#/lights" onClick={closeMenu} style={{ marginBottom: '0.5cm' }}>
              Biriyani
            </Dropdown.Item>
            <Dropdown.Item href="#/toys" onClick={closeMenu} style={{ marginBottom: '0.5cm' }}>
              Meat
            </Dropdown.Item>
            <Dropdown.Item href="#/books" onClick={closeMenu} style={{ marginBottom: '0.5cm' }}>
              Dosa
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
};
export default Header;









