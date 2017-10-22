import React, { Component } from 'react';
import { BrowserRouter, Redirect , Route, Switch } from 'react-router-dom';
import * as firebase from 'firebase';
import config from './firebase.json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Index from './components/Index';
import Login from './components/Login';
import AddContentType from './components/Content/AddType';
import ViewContentType from './components/Content/ViewType';
import EditRecord from './components/Content/EditRecord';
import NewRecord from './components/Content/NewRecord';
import EditTemplate from './components/Template/Edit';
import InitApp from './components/InitApp';

import ContentController from './controllers/Content';

import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            initialized: false,
            user: null,
            authed: false,
            openSidebar: true,
            updateSidebar: {}
        };
        this.toggleSideBar = this.toggleSideBar.bind(this);
        this.updateSidebar = this.updateSidebar.bind(this);
    }
    componentWillMount(){
        if (this.state.initialized){
            firebase.initializeApp(config);
            firebase.auth().onAuthStateChanged((user) => {
                user ?
                    this.setState({ user , authed: true}, this.updateSidebar())
                    :
                    this.setState({ user: null, authed: false})
                ;
            });
        } else {
            console.log('hey');

        }

    }
    render() {
        return (
            <MuiThemeProvider>
                <BrowserRouter>

                        {
                            this.state.initialized ?
                            (
                                <div>
                                <Navbar toggleSideBar={this.toggleSideBar} user={this.state.user} />
                                <div className="container-fluid">
                                    <Sidebar open={this.state.openSidebar} updateSidebar={this.state.updateSidebar} />
                                    <div className={`main ${this.state.openSidebar ? 'col-sm-7 col-md-8 col-lg-9 col-xl-10 ': 'col-12'} ml-auto`}>
                                        <Switch>
                                            <PrivateRoute authed={this.state.authed} exact path='/' component={Index} />
                                            <PrivateRoute authed={this.state.authed} updateSidebar={this.updateSidebar} user={this.state.user} path={`/content/add`} component={AddContentType} />
                                            <PrivateRoute authed={this.state.authed} user={this.state.user} path={`/content/:contentId/edit/template`} component={EditTemplate} />
                                            <PrivateRoute authed={this.state.authed} updateSidebar={this.updateSidebar} user={this.state.user} path={`/content/:contentId/:recordId?/edit`} component={EditRecord} />
                                            <PrivateRoute authed={this.state.authed} user={this.state.user} path={`/content/:contentId/add`} component={NewRecord} />
                                            <PrivateRoute authed={this.state.authed} updateSidebar={this.updateSidebar} user={this.state.user} path={`/content/:contentId`} component={ViewContentType} />
                                            <PublicOnlyRoute authed={this.state.authed} path='/login' component={Login} />
                                            <Route render={function(){
                                                return <h2>404 Not Found</h2>
                                            }} />
                                        </Switch>
                                    </div>
                                </div>
                                </div>
                            )
                            :
                            (
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-6 offset-md-3">
                                            <InitApp />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
    toggleSideBar(){
        this.setState({
            openSidebar: !this.state.openSidebar
        });
    }
    updateSidebar(){
        let fetch = new ContentController();
        fetch.List().then((content)=>{
            this.setState({
                updateSidebar: content
            });
        });
    }
}

function PrivateRoute ({component: Component, authed, user, updateSidebar, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} user={user} updateSidebar={updateSidebar} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}
function PublicOnlyRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

export default App;
