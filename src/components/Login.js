import React, { Component } from 'react';
import Authentication from '../controllers/Authentication';

export default class Login extends Component {
    render(){
        return(
            <div className="row justify-content-center login-panel">
                <div className="card">
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="Email">Email address</label>
                                <input type="email" className="form-control" id="Email" aria-describedby="emailHelp" placeholder="Enter email" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                          </div>
                          <div className="form-group">
                            <label htmlFor="Password">Password</label>
                            <input type="password" className="form-control" id="Password" placeholder="Password" />
                          </div>
                          <button type="submit" className="btn btn-primary" onClick={this.handleLogIn}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    handleLogIn(e){
        e.preventDefault();

        let email = document.getElementById('Email').value,
            password = document.getElementById('Password').value,
            auth = new Authentication();
        ;
        auth.LogIn(email, password);

    }
}
