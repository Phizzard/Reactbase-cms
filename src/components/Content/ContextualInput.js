import React, { Component } from 'react';

export default class ContextualInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            input: '',
            label: '',
            value: ''
        }

        this.handleInput = this.handleInput.bind(this);
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
            <div className={`form-group ${this.props.isTemplate && 'isTemplateInput'}`}>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input  type={this.props.type}
                        className="form-control"
                        id={this.props.id}
                        value={this.state.value}
                        onChange={this.handleInput}
                        disabled={this.props.isTemplate}
                />
            </div>
        );
    }
    handleInput(e){
        e.preventDefault();
        let element = e.target;
        this.setState({
            value: element.value
        }, this.props.updateEditRecordFormState({[element.id]: {value: element.value}}));
    }
}

ContextualInput.defaultProps = {
    input: 'shortText',
    label: 'Input Label',
    value: '',
    id: 'InputId',
    type: 'text',
    isTemplate: false

};
