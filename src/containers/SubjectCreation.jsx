import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createSubject
} from '../actions';

class SubjectCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  createSubject(e) {
    e.preventDefault();
    this.props.createSubject(this.state.name)
  }

  render() {
    let successDiv;
    if (this.props.successMessage && this.props.successMessage.length > 0) {
      successDiv = (
        <div className="alert alert-success" role="alert">
          {this.props.successMessage}
        </div>
      )
    }

    let errorDiv;
    if (this.props.errorMessage && this.props.errorMessage.length > 0) {
      errorDiv = (
        <div className="alert alert-danger" role="alert">
          {this.props.errorMessage}
        </div>
      )
    }

    return (
      <div>
        <h2>Create Subject</h2>
        {successDiv}
        {errorDiv}
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Name"
              onChange={event => this.setState({name: event.target.value})}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success"
            onClick={(e) => {this.createSubject(e)}}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { errorMessage, successMessage } = state.createSubject;
  return {
    errorMessage,
    successMessage
  };
}


const mapDispatchToProps = {
  createSubject
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectCreation);
