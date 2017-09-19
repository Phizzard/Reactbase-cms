import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
export default class Sidebar extends Component {
    render(){
        return(
            <nav className="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
                <h4>Configuration</h4>
              <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="#">Overview <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Reports</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Analytics</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Export</a>
                </li>
              </ul>
              <h4>Your Content</h4>
              <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                  <a className="nav-link" href="#">Nav item</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Nav item again</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">One more nav</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Another nav item</a>
                </li>
              </ul>

              <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                  <a className="nav-link" href="#">Nav item again</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">One more nav</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Another nav item</a>
                </li>
              </ul>
              <NavLink exact to='/add-content/'>
                  <button className="btn btn-success">Add Content Type</button>
              </NavLink>
            </nav>
        );
    }
}
