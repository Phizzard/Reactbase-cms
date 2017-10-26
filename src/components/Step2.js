import React, {Component} from 'react';
import firebaseLogo from '../Firebase-logo.png';

export default class Step2 extends Component {
    render(){
        const logoStyle = {
            width: '100%',
            maxWidth: '300px'
        }
        return(
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <p>Now we have initialized the Project we need to set up authentication!</p>
                        <ul>
                            <li>Go to the <strong>Authentication</strong> item in the sidebar</li>
                            <li>Select <strong>Set up Sign-in method</strong></li>
                            <li>Enable the Email/Password Sign in provider</li>
                            <li>Go to the Users tab and Add a user that we will later use to sign in</li>
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
