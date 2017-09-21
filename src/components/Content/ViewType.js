import React, { Component } from 'react';
import Sidebar from '../Sidebar';

export default class ViewContentType extends Component {
    render(){
        return(
            <div className="row">
                <Sidebar />
                <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main">
                    <h1>{this.props.match.params.contentId}</h1>
                </main>
            </div>
        );
    }
}
