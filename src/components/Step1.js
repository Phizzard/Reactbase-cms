import React, {Component} from 'react';
import firebaseLogo from '../Firebase-logo.png';

export default class Step1 extends Component {
    render(){
        const logoStyle = {
            width: '100%',
            maxWidth: '300px'
        }
        return(
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <p>Reactbase uses Firebase's realtime database to store all it's data. To start using Reactbase, we need to initialize a Firebase Project.</p>
                        <ul>
                            <li>Go to <a href="https://firebase.google.com/">firebase.google.com</a></li>
                            <li>Sign in or create an account</li>
                            <li>Go to Console</li>
                            <li>Create a New Project (<small><em>Call it whatever you want!</em></small>)</li>
                        </ul>
                    </div>
                    <div className="col-6 text-center">
                        <img style={logoStyle} src={firebaseLogo} />
                    </div>
                </div>
            </div>
        );
    }
}
