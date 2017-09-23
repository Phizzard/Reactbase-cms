import React, { Component } from 'react';

export default class ContextualInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            input: '',
            label: '',
            value: '',
            placeholder: ''
        }
    }
    componentDidMount(){
        this.setState({
            value: this.props.value
        });
    }
    componentDidUpdate(prevProps){
        if (this.props.value !== prevProps.value){
            this.setState({
                value: this.props.value
            });
        }
    }
    render(){
        return(
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input type={this.props.type} className="form-control" id={this.props.id} placeholder={this.props.placeholder} value={this.state.value} />
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
