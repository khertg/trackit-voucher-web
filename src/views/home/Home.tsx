import React from 'react';
import { Button, Container, Jumbotron, Col, Row } from 'react-bootstrap';

export const Home: React.FC = ({}) => {
  return (
    <div style={{ backgroundColor: '#EBEBEB', height: '100%' }}>
      <Container fluid>
        <br />
        <Col>
          <Row>
            <Jumbotron
              style={{
                backgroundColor: 'inherit',
                borderRadius: '0',
              }}
            >
              <h1>Welcome!</h1>
              <p>
                This is a simple application used for tracking anything you
                want. You can track you sold and load you sold.
              </p>
              <p>
                <Button variant="primary" size="sm">
                  Learn more
                </Button>
              </p>
            </Jumbotron>
          </Row>
        </Col>
      </Container>
    </div>
  );
};
