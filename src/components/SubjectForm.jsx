import React, { Component } from 'react';

class SubjectForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.name || ''
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      name: props.name || ''
    })
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
            value={this.state.name}
            onChange={event => this.setState({name: event.target.value})}
          />
        </div>
        <button
          type="submit"
          className="btn btn-success"
          onClick={(e) => {e.preventDefault(); this.props.callback(this.state)}}
        >
          Submit
        </button>
      </form>
    );
  }
}

export default SubjectForm;
