import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar.component';
// import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Medication = props => (
  <tr>
    <td>{props.medication.name}</td>
    <td>{props.medication.description}</td>
    <td>{props.medication.duration}</td>
    <td>{new Date(props.medication.expireDate).toLocaleDateString()}</td>
    <td>
      <Link to={{pathname: "/edit/"+props.medication._id, state : {id: props.medication._id}}}>edit</Link> | <a href="#" onClick={() => { props.deleteMedication(props.medication._id) }}>delete</a>
    </td>
    <td>{props.medication._id}</td>
  </tr>
)

export default class MedicationList extends Component {
  constructor(props) {
    super(props);

    this.deleteMedication = this.deleteMedication.bind(this)

    this.state = {medication: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/items/', {
      "headers" : {"authorization" : "bearer " + localStorage.getItem("token")}
    })
      .then(response => {
        this.setState({ medication: response.data.items })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteMedication(id) {
    axios.delete('http://localhost:5000/items/delete/'+id, {
      "headers" : {"authorization" : "bearer " + localStorage.getItem("token")}
    })
      .then(response => { console.log(response.data)});

    this.setState({
      medication: this.state.medication.filter(el => el._id !== id)
    })
  }

  medicationList() {
    return this.state.medication.map(currentmedication => {
      return <Medication medication={currentmedication} deleteMedication={this.deleteMedication} key={currentmedication._id}/>;
    })
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <h3>Medication Cabinet: </h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Expiration Date</th>
              <th>Actions</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            { this.medicationList() }
          </tbody>
        </table>
      </div>
    )
  }
}

