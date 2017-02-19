import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEssay, submitEssay } from '../actions';
import { browserHistory } from 'react-router';

class SubmitEssay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
  }

  componentDidMount() {
    this.props.fetchEssay(this.props.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (!(nextProps.failed) && nextProps.hasResponse) {
      browserHistory.push("/student/homework")
    }
  }

  submitEssay(e) {
    e.preventDefault()
    this.props.submitEssay(this.state, this.props.params.id)
  }

  render() {
    let errorDiv;
    if (this.props.errorMessage && this.props.errorMessage.length > 0) {
      errorDiv = (
        <div className="alert alert-danger" role="alert">
          {this.props.errorMessage}
        </div>
      )
    }

    const { title, description, date_due } = this.props.essay

    return (
      <div>
        <h2>Submit Essay - {title}</h2>
        <h3>Due: <em>{date_due}</em></h3>
        <p>{description}</p>
        {errorDiv}
        <form>
          <div className="form-group">
            <label htmlFor="name">Content</label>
            <textarea
              className="form-control"
              rows="5"
              onChange={event => this.setState({content: event.target.value})}
              ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-success"
            onClick={(e) => {this.submitEssay(e)}}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { essay } = state.fetchEssay;
  const { errorMessage, hasResponse, failed } = state.submitEssay
  return {
    errorMessage,
    hasResponse,
    failed,
    essay
  };
}


const mapDispatchToProps = {
  fetchEssay,
  submitEssay
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitEssay);
