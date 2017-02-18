import React, { Component } from 'react';
import Navbar from '../components/Navbar';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container" style={{padding: '50px'}}>
          {this.props.children}
        </div>
      </div>
    );
  }
 }

 export default App;
