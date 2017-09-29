import React, { Component } from 'react';

export default class InputType extends Component {
    render(){
        return(
            <div className="col-6">
                <div className="input-selector" id={this.props.id}>
                    <i className="material-icons">{this.props.icon}</i>
                    <span>{this.props.title}</span>
                </div>
            </div>
        );
    }
}
