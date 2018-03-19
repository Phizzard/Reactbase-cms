import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {
    Sidebar,
    Segment,
    Menu,
    Dropdown,
    Icon
} from 'semantic-ui-react';
import * as firebase from 'firebase';
import TemplatesService from './Services/Templates';
import './App.css';

import {Dashboard, Settings, Login} from "./Pages";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authed: true,
            visible: false
        };

        this.fetchTemplates = this.fetchTemplates.bind(this);
    }

    fetchTemplates(){
        const templates = new TemplatesService();

        templates.getCollection()
            .then((templateResult)=>{
                this.setState({
                    templates: templateResult
                });
            }).catch((err)=>{
                console.error(err);
            });
    }

    componentDidMount(){
        firebase.initializeApp(this.props.config);
        this.fetchTemplates();
    }
    toggleVisibility = () => this.setState({
        visible: !this.state.visible
    })

    render() {
        if (this.state.authed) {
            return (
                <React.Fragment>
                    <Menu style={{marginBottom: "0rem"}} >
                        <Menu.Item name='browse' onClick={this.toggleVisibility}>
                            <Icon name="bars" size="large" fitted />
                        </Menu.Item>

                        <Menu.Menu position='right'>
                            <Dropdown item icon='user' simple direction="left">
                                <Dropdown.Menu>
                                  <Dropdown.Item>Open</Dropdown.Item>
                                  <Dropdown.Item>Save...</Dropdown.Item>
                                  <Dropdown.Item>Edit Permissions</Dropdown.Item>
                                  <Dropdown.Divider />
                                  <Dropdown.Item>Log Out</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>

                            <Menu.Item name='help'>
                                Help
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                    <Sidebar.Pushable as={Segment} style={{marginTop: "0rem"}} >
                        <Sidebar as={Menu} animation='push' width='thin' visible={this.state.visible} icon='labeled' vertical inverted>
                            <Menu.Item name='home'>
                                <Icon name='home'/>
                                Home
                            </Menu.Item>
                            <Menu.Item name='gamepad'>
                                <Icon name='gamepad'/>
                                Games
                            </Menu.Item>
                            <Menu.Item name='camera'>
                                <Icon name='camera'/>
                                Channels
                            </Menu.Item>
                        </Sidebar>
                        <Sidebar.Pusher>
                            <Segment basic>
                                <BrowserRouter>
                                    <Switch>
                                        <Route exact path="/" render={() => {
                                            return <Dashboard/>;
                                        }}/>
                                        <Route path="/settings" render={() => {
                                            return <Settings/>;
                                        }}/>
                                    </Switch>
                                </BrowserRouter>
                            </Segment>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Login/>
                </React.Fragment>
            );
        }

    }
}

export default App;
