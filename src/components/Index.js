import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

export default class Navbar extends Component {
    render(){
        return(
            <div className="row">
                <Sidebar />
                <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main">
                    <Dashboard />
                </main>
            </div>
        );
    }
}
