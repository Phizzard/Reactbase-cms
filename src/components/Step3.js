import React, {Component} from 'react';
import {TextField, RaisedButton} from 'material-ui';
import Configuration from '../controllers/Configuration'
import exampleImg from '../firebase-config-example.JPG';

export default class Step3 extends Component {
    constructor(props){
        super(props);
        this.state = {
            apiKey: "",
            authDomain: "",
            databaseUrl: "",
            projectId: "",
            storageBucket: "",
            messagingSenderId: ""
        }
        this.handleInput = this.handleInput.bind(this);
    }
    render(){
        const logoStyle = {
            width: '100%'
        },
            inputStyle = {
                display: 'block'
            }
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <p>Now we have authentication setup, we can initialize firebase into reactbase!</p>
                        <ul>
                            <li>Go to the <strong>Authentication</strong> item in the sidebar</li>
                            <li>Select <strong>Web Setup</strong> in the upper right corner</li>
                            <li>Copy the config info into the form below</li>
                        </ul>
                    </div>
                    <div className="col-6">
                        <form>
                            <TextField
                                id="apiKey"
                                onInput={this.handleInput}
                                value={this.state.apiKey}
                                style={inputStyle}
                                floatingLabelText="Api Key"
                            />
                            <TextField
                                id="authDomain"
                                onInput={this.handleInput}
                                value={this.state.authDomain}
                                style={inputStyle}
                                floatingLabelText="Auth Domain"
                            />
                            <TextField
                                id="databaseUrl"
                                onInput={this.handleInput}
                                value={this.state.databaseUrl}
                                style={inputStyle}
                                floatingLabelText="Database Url"
                            />
                            <TextField
                                id="projectId"
                                onInput={this.handleInput}
                                value={this.state.projectId}
                                style={inputStyle}
                                floatingLabelText="Project Id"
                            />
                            <TextField
                                id="storageBucket"
                                value={this.state.storageBucket}
                                onInput={this.handleInput}
                                style={inputStyle}
                                floatingLabelText="Storage Bucket"
                            />
                            <TextField
                                id="messagingSenderId"
                                onInput={this.handleInput}
                                value={this.state.messagingSenderId}
                                style={inputStyle}
                                floatingLabelText="Messaging Sender Id"
                            />
                            <RaisedButton label="Save" primary={true} onClick={this.handleSubmit.bind(this)} />
                        </form>
                    </div>
                    <div className="col-6 text-center">
                        <img style={logoStyle} src={exampleImg} />
                    </div>
                </div>
            </div>
        );
    }
    handleInput(e){
        e.preventDefault();
        let element = e.target;
        this.setState({
            [element.id]: element.value
        });
    }
    handleSubmit(e){
        e.preventDefault();
        let config = new Configuration();
        config.CreateRecord('firebase',this.state).then((createdRecord)=>{
            console.log('WOO!');
        }).catch((error)=>{
            console.log("Uh OH!");
        });
    }
}
