import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SignoutUser } from '../../../User/Pages/LoginPage/UserAction';
import { faSearch, faSignInAlt, faHistory, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../../../App.css';

export const Header: React.FC  = () => {
  
  const handleSignout = () => {
    // dispatch(SignoutUser());
  };
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    document.body.classList.toggle('show-overlay', showSearch);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
        <Navbar.Brand href="/"> Quỳnh Store </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="products">MacBook</Nav.Link>
            <Nav.Link href="screen">Màn hình</Nav.Link>
            <Nav.Link href="contact">Phụ kiện</Nav.Link>
            <Nav.Link href="news">Tin tức</Nav.Link>
            <Nav.Link href="contact">Liên hệ</Nav.Link>

          </Nav>
          <Nav className="ml-auto">

            {/* {localStorage.getItem('userRole') == 1 ? (
              <Nav.Link onClick={() => handleSignout()}  >
                <FontAwesomeIcon icon={faSignInAlt} /> Đăng xuất
              </Nav.Link>
            ) : (

              <Nav.Link href="login" className="login">
                <FontAwesomeIcon icon={faSignInAlt} /> Đăng Nhập
              </Nav.Link>

            )} */}
            <Nav.Link href="history" className="register">
              <FontAwesomeIcon icon={faHistory} /> Lịch sử mua hàng
            </Nav.Link>
            <Nav.Link href="#search" onClick={toggleSearch} className="search">
              <FontAwesomeIcon icon={faSearch} />
            </Nav.Link>
            <Nav.Link href="cart" id="cart-icon">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar >
      <div className={`overlay ${showSearch ? 'show-overlay' : ''}`} onClick={toggleSearch}></div>
      <div className={`form-overlay ${showSearch ? 'show-overlay' : ''}`}>
        <Form in-line>
          <FormControl type="text" placeholder="Tìm kiếm..." className="mr-sm-2" />
        </Form>
      </div>
    </>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>Your company description goes here.</p>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Email: info@example.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <p>Stay connected on social media:</p>
            <div className="social-icons">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom bg-dark py-2">
        <div className="container text-center">
          <p className="text-light">&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export const Banner: React.FC = () => {
  return (
    <Carousel interval={1000}>
      <Carousel.Item style={{ height: '600px' }}>
        <img
          className="d-block w-100"
          src="https://macstores.vn/wp-content/uploads/2019/05/banner-macbook-air.jpg" 
          alt="First slide"
          style={{ objectFit: 'cover', height: '100%', width: '100%' }}
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{ height: '600px' }}>
        <img
          className="d-block w-100"
          src="https://macintelgroup.co.in/wp-content/uploads/2020/12/MacBook-Air_Web-Banner_Available-Now_2.jpg"
          alt="Second slide"
          style={{ objectFit: 'cover', height: '100%', width: '100%' }}
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{ height: '600px' }}>
        <img
          className="d-block w-100"
          src="https://alltop.vn/backend/media/images/posts/388/Ung_dung_can_thiet_nhat_cho_nguoi_moi_dung_Macbook-14898.jpg"
          alt="Third slide"
          style={{ objectFit: 'cover', height: '100%', width: '100%' }}
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

