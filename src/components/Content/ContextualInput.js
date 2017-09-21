import React, { Component } from 'react';

export default class ContextualInput extends Component {
    render(){
        return(
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input type={this.props.type} className="form-control" id={this.props.id} placeholder={this.props.placeholder} defaultValue={this.props.value} />
            </div>
        );
    }
}

ContextualInput.defaultProps = {
    input: 'shortText',
    label: 'Input Label',
    value: '',
    id: 'InputId',
    type: 'text',
    placeholder: 'Enter here...'

};
