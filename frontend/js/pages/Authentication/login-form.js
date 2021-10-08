import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import React from 'react';
import logo from '../../../assets/images/profile-user.png';
import uiImage from '../../../assets/images/ui.svg';

const Login = () => {
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col lg={4} md={6} sm={12} className="text-center mt-5 p-3">
            <img className="icon-img" src={logo} alt="icon" />
            <Form className="form">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary btn-block" type="submit">
                Login
              </Button>
              <div className="text-left mt-3">
                <a href="#">
                  <small className="Signup">Sign up</small>
                </a>
              </div>
            </Form>
          </Col>
          <Col lg={8} md={6} sm={12}>
            <img className="w-100" src={uiImage} alt="" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
