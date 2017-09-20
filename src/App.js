import React, { Component } from 'react';
import { BrowserRouter, Redirect , Route, Switch } from 'react-router-dom';
import * as firebase from 'firebase';
import config from './firebase.json';
import Navbar from './components/Navbar';
import Index from './components/Index';
import Login from './components/Login';
import AddContentType from './components/AddContentType'
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: null,
            authed: false
        };
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
            <BrowserRouter>
                <div>
                    <Navbar user={this.state.user} />
                    <div className="container-fluid">
                        <Switch>
                            <PrivateRoute authed={this.state.authed} exact path='/' component={Index} />
                            <PrivateRoute authed={this.state.authed} user={this.state.user} path={`/add-content/`} component={AddContentType} />
                            <PublicOnlyRoute authed={this.state.authed} path='/login' component={Login} />
                            <Route render={function(){
                                return <h2>404 Not Found</h2>
                            }} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
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
