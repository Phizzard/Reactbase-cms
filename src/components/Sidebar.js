import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Content from '../controllers/Content';

export default class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
            content: {}
        };
        this.renderContent = this.renderContent.bind(this);
    }
    componentDidMount(){
        let fetch = new Content();
        fetch.List().then((content)=>{
            this.setState({
                content: content
            });
        });
    }
    render(){
        return(
            <nav className="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
                <h4>Configuration</h4>
              <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="">Overview <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="">Reports</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="">Analytics</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="">Export</a>
                </li>
              </ul>
              <h4>Your Content</h4>
              <ul className="nav nav-pills flex-column">
                  {this.renderContent()}
              </ul>
              <NavLink exact to='/content/add'>
                  <button className="btn btn-success">Add Content Type</button>
              </NavLink>
            </nav>
        );
    }
    renderContent(){
        return Object.entries(this.state.content).map((item)=>{
            return(
                <li className="nav-item" key={item[0]}>
                    <NavLink to={`/content/${item[0]}`}>
                        <span className="nav-link" href="">{item[0]}</span>
                    </NavLink>
                </li>
            );
        });
    }
}
