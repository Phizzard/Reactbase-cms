import React, { Component } from 'react';
import Sidebar from '../Sidebar';

export default class AddContentType extends Component {
    render(){
        return(
            <div className="row">
                <Sidebar />
                <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main">
                    <h1>Add New Content Type</h1>
                </main>
            </div>
        );
    }
}
