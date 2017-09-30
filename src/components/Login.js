import React, { Component } from 'react';
import Authentication from '../controllers/Authentication';
import {Card, CardActions, CardTitle, TextField, RaisedButton } from 'material-ui';

export default class Login extends Component {
    render(){
        const inputStyle = {
                display: 'block'
            }
        ;
        return(
            <div className="row justify-content-center login-panel">
                <Card>
                    <CardTitle title="Sign In" />
                    <CardActions>
                        <form>
                            <TextField
                                style={inputStyle}
                                id="Email"
                                type="email"
                                floatingLabelText="Email Address"
                            />
                            <TextField
                                style={inputStyle}
                                id="Password"
                                type="password"
                                floatingLabelText="Password"
                            />
                            <RaisedButton type="submit" label="Sign In" primary={true} onClick={this.handleLogIn} />
                        </form>
                    </CardActions>
                </Card>
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
