import React, { Component } from 'react';

export default class InputType extends Component {
    render(){
        return(
            <div className="col-6">
                {this.props.children}
            </div>
        );
    }
}
