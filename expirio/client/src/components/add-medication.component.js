import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateMedication extends Component {
  constructor(props) {
    super(props);

    this.onChangeMedication = this.onChangeMedication.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      medication: '',
      description: '',
      duration: '',
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')                 // We could also use fetch to do this ...  
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.medication),
            medication: response.data[0].medication
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeMedication(e) {
    this.setState({
      medication: e.target.value
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

  onSubmit(e) {                     // This changes the values in React using States ... 
    e.preventDefault();

    const medication = {
      medication: this.state.medication,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(medication);

    axios.post('http://localhost:5000/exercises/add', medication)
      .then(res => console.log(res.data));

    window.location = '/medcab';
  }

  render() {
    return (
    <div>
      <h3>Add new medication</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Medication Name:</label>
          <input type="text"
            required
            className="form-control"
            value={this.state.medication}
            onChange={this.onChangeMedication}
            />
        </div>
        <div className="form-group"> 
          <label>Description - (What is this medication for?): </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration - (How frequenntly do you take this medication?): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Expiration Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Submit" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}