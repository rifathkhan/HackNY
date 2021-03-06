import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/medcab" className="navbar-brand">Expiro</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/add" className="nav-link">Add</Link>
                        </li>
                        <li className="navbar-item">
                        </li>
                    </ul>
                </div> 
            </nav>
        );
    }
}