import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditMedication extends Component {
  constructor(props) {
    super(props);

    console.log(props.location.state.id);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeName = this.onChangeName.bind(this);

    this.state = {
      name: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    /*
    axios.get('http://localhost:5000/items/update/'+this.props.id)
      .then(response => {
        this.setState({
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/items/update')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
      */

  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const medication = {
      name: this.state.name,
      description: this.state.description,
      duration: this.state.duration,
      expireDate: this.state.date
    }

    console.log(medication);

    axios.patch('http://localhost:5000/items/update/' + this.props.location.state.id, medication, {
      "headers" : {"authorization" : "bearer " + localStorage.getItem("token")}
    })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

    window.location = '/medcab';
  }

  render() {
    return (
    <div>
      <h3>Edit Medication Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}