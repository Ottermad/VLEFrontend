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
        <div className="row">
          <div className="col-md-4">
            <h3>Manage all your classes</h3>
            <p>With VLE you can login and view all your classes and staff and help share ciritial infomation between all parties</p>
          </div>
          <div className="col-md-4">
            <h3>Set and mark homework</h3>
            <p>Teachers can login and automatically set homework. They can then review homework and give feedback online.</p>
          </div>
          <div className="col-md-4">
            <h3>Monitor student&#39;s online</h3>
            <p>By collating all student&#39;s infomation in one place you can see how best you can help them.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
