import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import hash from 'md5';
import Authentication from '../controllers/Authentication';
export default class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            showUserDropdown: false,
            collapse: true
        }
        this.handleSignOut = this.handleSignOut.bind(this);
        this.handleUserDropdown = this.handleUserDropdown.bind(this);
        this.handleCollapse = this.handleCollapse.bind(this);
    }
    render(){
        const   gravatarUrl = 'https://www.gravatar.com/avatar/',
                options = '?s=40&d=mm'
        ;
        return(
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <NavLink to='/'>
                    <span className="navbar-brand">Reactbase</span>
                </NavLink>
                <button className="navbar-toggler d-lg-none" type="button" onClick={this.handleCollapse} aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`${this.state.collapse && ('collapse')} navbar-collapse`} id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="">Settings</a>
                        </li>
                    </ul>
                    <form className="form-inline mt-2 mt-md-0">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    {
                        this.props.user && (
                            <div className="dropdown show">
                                <a className="dropdown-toggle" href="" onClick={this.handleUserDropdown} aria-haspopup="true" aria-expanded="false">
                                    <img className="user-image" alt="User" src={`${gravatarUrl}${hash(this.props.user.email)}${options}`} />
                                </a>
                                {
                                    this.state.showUserDropdown && (
                                        <div className="dropdown-menu user-options">
                                            <a href="" className="dropdown-item" onClick={this.handleSignOut}>Sign Out</a>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </nav>
        );
    }
    handleSignOut(e){
        e.preventDefault();
        let auth = new Authentication();
        auth.LogOut();
    }
    handleUserDropdown(e){
        e.preventDefault();
        this.setState({
            showUserDropdown: !this.state.showUserDropdown
        });
    }
    handleCollapse(e){
        e.preventDefault();
        this.setState({
            collapse: !this.state.collapse
        });
    }
}
