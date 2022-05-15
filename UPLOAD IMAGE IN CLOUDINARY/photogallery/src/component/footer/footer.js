import React from 'react';
import { Container,Navbar } from 'react-bootstrap';

const Footer = () => {
  return <div>
      <Container>
          <Navbar expand="lg" variant="dark" bg="dark">
              <Container>
                  <Navbar.Brand href="#">Navbar</Navbar.Brand>
              </Container>
          </Navbar>
      </Container>
  </div>;
};

export default Footer;
