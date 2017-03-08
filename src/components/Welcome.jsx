import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Welcome extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>Welcome to VLE</h1>
          <h2><em>Your own private Virtual Learning Environment</em></h2>
            <LinkContainer to={{ pathname: '/login' }}>
              <Button bsStyle="primary">Login</Button>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/signup' }}>
              <Button bsStyle="success">Sign Up</Button>
            </LinkContainer>
        </Jumbotron>
      </div>
    );
  }
}

export default Welcome;
