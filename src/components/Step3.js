import React, {Component} from 'react';
import {TextField, RaisedButton} from 'material-ui';
import Configuration from '../controllers/Configuration';
import exampleImg from '../firebase-config-example.JPG';
import examplePropImg from '../firebase-config-prop.JPG';

export default class Step3 extends Component {
    constructor(props){
        super(props);
        this.state = {
            apiKey: "",
            authDomain: "",
            databaseUrl: "",
            projectId: "",
            storageBucket: "",
            messagingSenderId: "",
            showForm: true
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
                            <li>Copy the config info into the form below and convert</li>
                            <li>Create a file called <strong>firebase.json</strong> and copy the converted block below into the file</li>
                            <li>Import the <strong>firebase.json</strong> as an object and pass it into the Reactbase main component as a property of config</li>
                            <img src={examplePropImg} />
                            <li>Once you have successfully completed that step and reload you should no longer see this setup and be in ReactBase, Enjoy!</li>
                        </ul>
                    </div>
                    <div className="col-6">
                        {
                            this.state.showForm ?
                            (
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

                                </form>
                            )
                            :
                            (
                                <pre>
                                    <code>
                                        &#123;<br/>
                                            &nbsp;&nbsp;&nbsp;&nbsp;"apiKey": "{this.state.apiKey}",<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;"authDomain": "{this.state.authDomain}",<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;"databaseURL": "{this.state.databaseUrl}",<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;"projectId": "{this.state.projectId}",<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;"storageBucket": "{this.state.storageBucket}",<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;"messagingSenderId": "{this.state.messagingSenderId}"<br />
                                        &#125;
                                    </code>
                                </pre>
                            )
                        }
                        <RaisedButton label={this.state.showForm ? "Convert" : "Back to Form"} primary={true} onClick={this.handleSubmit.bind(this)} />
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
        config.InitializeDataBase({
            apiKey: this.state.apiKey,
            databaseURL: this.state.databaseUrl,
            projectId: this.state.projectId,
            storageBucket: this.state.storageBucket,
            messagingSenderId: this.state.messagingSenderId
        }).then((result)=>{
            console.log('WOO!');
            this.setState({
                showForm: !this.state.showForm
            });
        }).catch((error)=>{
            console.log("Uh OH!");
        });
    }
}
