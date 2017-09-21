import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ContentController from '../controllers/Content';

export default class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
            content: {}
        };
        this.renderContent = this.renderContent.bind(this);
    }
    componentDidMount(){
        let fetch = new ContentController();
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
        return Object.entries(this.state.content).map((_item)=>{
            let item = {
                id: _item[0],
                title: _item[1].title,
                type: _item[1].type
            };
            return(
                <li className="nav-item" key={item.id}>
                    <NavLink to={`/content/${item.id}${item.type ==='single' ? ('/edit'):('')}`}>
                        <span className="nav-link" href="">{item.id}</span>
                    </NavLink>
                </li>
            );
        });
    }
}
