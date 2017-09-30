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
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: null,
            authed: false,
            openSidebar: true
        };
        this.toggleSideBar = this.toggleSideBar.bind(this);
    }
    componentWillMount(){
        firebase.initializeApp(config);
        firebase.auth().onAuthStateChanged((user) => {
            user ?
                this.setState({ user , authed: true})
                :
                this.setState({ user: null, authed: false})
            ;
        });
    }
    render() {
        return (
            <MuiThemeProvider>
                <BrowserRouter>
                    <div>
                        <Navbar toggleSideBar={this.toggleSideBar} user={this.state.user} />
                        <div className="container-fluid">
                            <Sidebar open={this.state.openSidebar} />
                            <div className={`main ${this.state.openSidebar ? 'col-10': 'col-12'} ml-auto`}>
                                <Switch>
                                    <PrivateRoute authed={this.state.authed} exact path='/' component={Index} />
                                    <PrivateRoute authed={this.state.authed} user={this.state.user} path={`/content/add`} component={AddContentType} />
                                    <PrivateRoute authed={this.state.authed} user={this.state.user} path={`/content/:contentId/edit/template`} component={EditTemplate} />
                                    <PrivateRoute authed={this.state.authed} user={this.state.user} path={`/content/:contentId/:recordId?/edit`} component={EditRecord} />
                                    <PrivateRoute authed={this.state.authed} user={this.state.user} path={`/content/:contentId/add`} component={NewRecord} />
                                    <PrivateRoute authed={this.state.authed} user={this.state.user} path={`/content/:contentId`} component={ViewContentType} />
                                    <PublicOnlyRoute authed={this.state.authed} path='/login' component={Login} />
                                    <Route render={function(){
                                        return <h2>404 Not Found</h2>
                                    }} />
                                </Switch>
                            </div>

                        </div>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
    toggleSideBar(){
        this.setState({
            openSidebar: !this.state.openSidebar
        });
    }
}

function PrivateRoute ({component: Component, authed, user, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} user={user} />
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
