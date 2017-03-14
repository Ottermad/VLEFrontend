import React, { Component } from 'react';
import { connect } from 'react-redux';

class LessonCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || '',
      subject_id: this.props.subject_id || '',
      subjects: this.props.subjects,
      users: this.props.users,
      teacher_ids: this.props.teacher_ids || [],
      student_ids: this.props.student_ids || []
    }
  }
  componentWillReceiveProps(nextProps) {
    this.state = {
      name: nextProps.name || this.state.name,
      subject_id: nextProps.subject_id || this.state.subject_id,
      subjects: nextProps.subjects,
      users: nextProps.users,
      teacher_ids: nextProps.teacher_ids || this.state.teacher_ids,
      student_ids: nextProps.student_ids || this.state.student_ids
    }
    this.setState(this.state)
  }
  
  createSubject(e) {
    e.preventDefault();
    // console.log(this.state)
    this.props.callback(this.state)
  }

  handleTeacherSelectChange(e) {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({teacher_ids: value});
  }

  handleStudentSelectChange(e) {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({student_ids: value});
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

          <div className="form-group">
            <label>Subject</label>
            <select className="form-control" value={this.state.subject_id} onChange={(e) => this.setState({subject_id: e.target.value})}>
              {
                this.props.subjects.map(subject => {
                  const {name, id} = subject;
                  return (
                    <option value={id} key={id}>{name}</option>
                  )
                })
              }
            </select>
          </div>

          <div className="form-group">
            <label style={{display: 'block'}}>Teacher(s)</label>
            <select multiple onChange={(e) => this.handleTeacherSelectChange(e)} value={this.state.teacher_ids}>
              {
                this.props.users.map(user => {
                  const { first_name, last_name, id, permissions } = user;
                  const isTeacher = permissions.some(permission => {
                    return permission.name === "Teacher"
                  });
                  if (isTeacher) {
                    return (
                      <option value={id} key={id}>{first_name} {last_name}</option>
                    )
                  } else {
                    return ""
                  }
                })
              }
            </select>
          </div>

          <div className="form-group">
            <label style={{display: 'block'}}>Student(s)</label>
            <select multiple onChange={(e) => this.handleStudentSelectChange(e)} value={this.state.student_ids}>
              {
                this.props.users.map(user => {
                  const { first_name, last_name, id, permissions } = user;
                  const isStudent = permissions.some(permission => {
                    return permission.name === "Student"
                  });
                  if (isStudent) {
                    return (
                      <option value={id} key={id}>{first_name} {last_name}</option>
                    )
                  } else {
                    return ""
                  }
                })
              }
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-success"
            onClick={(e) => {this.createSubject(e)}}
          >
            Submit
          </button>
        </form>
    );
  }
}

function mapStateToProps(state) {
  const { users } = state.usersListing;
  const { subjects } = state.subjectListing;
  return {
    users,
    subjects
  };
}


const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonCreation);
