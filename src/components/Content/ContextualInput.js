import React, { Component } from 'react';
import {TextField, Toggle, Dialog, RaisedButton, Tab, Tabs} from 'material-ui';

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
        this.handleToggle = this.handleToggle.bind(this);
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
        const inputStyle = {
                display: 'block'
            }
        ;
        switch(this.props.input){
            case 'longText':
                return(
                    <div className={`form-group ${this.props.isTemplate && 'isTemplateInput'}`}>
                        <TextField
                            multiLine={true}
                            rows={4}
                            floatingLabelText={this.props.label}
                            id={this.props.id}
                            value={this.state.value}
                            onChange={this.handleInput}
                            disabled={this.props.isTemplate}
                        />
                    </div>
                );
            case 'number':
                return(
                    <div className={`${this.props.isTemplate && 'isTemplateInput'}`}>
                        <TextField
                            type="number"
                            step="any"
                            floatingLabelText={this.props.label}
                            id={this.props.id}
                            value={this.state.value}
                            onChange={this.handleInput}
                            disabled={this.props.isTemplate}
                        />
                    </div>
                );
            case 'currency':
                return(
                    <div className={`form-group ${this.props.isTemplate && 'isTemplateInput'}`}>
                        <TextField
                            type="number"
                            step="any"
                            floatingLabelText={this.props.label}
                            id={this.props.id}
                            value={this.state.value}
                            onChange={this.handleInput}
                            disabled={this.props.isTemplate}
                        />
                    </div>
                );
            case 'checkbox':
                return(
                    <div className={`form-group ${this.props.isTemplate && 'isTemplateInput'}`}>
                        <Toggle
                            label={this.props.label}
                            id={this.props.id}
                            disabled={this.props.isTemplate}
                            onToggle={this.handleToggle}
                            toggled={this.state.value || false}
                            labelPosition="right"
                        />
                    </div>
                );
            default:
                return(
                    <div className={`${this.props.isTemplate && 'isTemplateInput'}`}>
                        <TextField
                            type="text"
                            floatingLabelText={this.props.label}
                            id={this.props.id}
                            value={this.state.value}
                            onChange={this.handleInput}
                            disabled={this.props.isTemplate}
                        />
                    </div>
                );
        }
    }
    handleInput(e){
        e.preventDefault();
        let element = e.target;
        this.setState({
            value: element.value
        }, this.props.updateRecordFormState({[element.id]: element.value}));
    }
    handleToggle(e, toggle){
        e.preventDefault();
        let element = e.target;
        this.setState({
            value: toggle
        }, this.props.updateRecordFormState(({[element.id]: toggle})));
    }
}

ContextualInput.defaultProps = {
    input: 'shortText',
    label: 'Input Label',
    value: '',
    id: 'InputId',
    isTemplate: false

};
