import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar.component';

const Medication = props => (
  <tr>
    <td>{props.medication.username}</td>
    <td>{props.medication.description}</td>
    <td>{props.medication.duration}</td>
    <td>{props.medication.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.medication._id}>edit</Link> | <a href="#" onClick={() => { props.deleteMedication(props.medication._id) }}>delete</a>
    </td>
  </tr>
)

export default class MedicationList extends Component {
  constructor(props) {
    super(props);

    this.deleteMedication = this.deleteMedication.bind(this)

    this.state = {medication: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/items/')
      .then(response => {
        this.setState({ medication: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteMedication(id) {
    axios.delete('http://localhost:5000/items/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      medication: this.state.medication.filter(el => el._id !== id)
    })
  }

  exerciseList() {
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
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Expiration Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}