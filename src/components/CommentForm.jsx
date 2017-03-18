import React, { Component } from 'react';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  click(e) {
    e.preventDefault();
    this.props.callback(this.state)
  }

  render() {
    return (
      <div>
        <form className="form-inline">
          <div className="form-group">
            <input type="text" className="form-control" id="text" placeholder="Enter Comment..." onChange={event => this.setState({text: event.target.value})} />
          </div>
          <button type="submit" className="btn btn-success" onClick={(e) => this.click(e)}>Add Comment</button>
        </form>
        <hr />
      </div>
    );
  }
}

export default CommentForm;
