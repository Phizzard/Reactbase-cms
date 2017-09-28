import React, { Component } from 'react';
import Checkbox from 'react-checkbox';

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
        switch(this.props.input){
            case 'longText':
                return(
                    <div className={`form-group ${this.props.isTemplate && 'isTemplateInput'}`}>
                        <label htmlFor={this.props.id}>{this.props.label}</label>
                        <textarea  type="text"
                                className="form-control"
                                id={this.props.id}
                                value={this.state.value}
                                onChange={this.handleInput}
                                disabled={this.props.isTemplate}
                                rows = "4"
                        />
                    </div>
                );
                break;
            case 'number':
                return(
                    <div className={`form-group ${this.props.isTemplate && 'isTemplateInput'}`}>
                        <label htmlFor={this.props.id}>{this.props.label}</label>
                        <input  type="number"
                                step="any"
                                className="form-control"
                                id={this.props.id}
                                value={this.state.value}
                                onChange={this.handleInput}
                                disabled={this.props.isTemplate}
                        />
                    </div>
                );
                break;
            case 'currency':
                return(
                    <div className={`form-group ${this.props.isTemplate && 'isTemplateInput'}`}>
                        <label htmlFor={this.props.id}>{this.props.label}</label>
                        <div className="input-group">
                            <span className="input-group-addon">$</span>
                            <input  type="number"
                                    step="any"
                                    className="form-control"
                                    id={this.props.id}
                                    value={this.state.value}
                                    onChange={this.handleInput}
                                    disabled={this.props.isTemplate}
                            />
                        </div>
                    </div>
                );
                break;
            case 'checkbox':
                return(
                    <div className={`form-group ${this.props.isTemplate && 'isTemplateInput'}`}>
                        <p>{this.props.label}</p>
                        <button disabled={this.props.isTemplate} id={this.props.id} className={`btn btn-small ${ this.state.value ? 'btn-success' : 'btn-danger'}`} onClick={this.handleToggle}>{this.state.value.toString() || 'True / False'}</button>
                    </div>
                );
                break;
            default:
                return(
                    <div className={`form-group ${this.props.isTemplate && 'isTemplateInput'}`}>
                        <label htmlFor={this.props.id}>{this.props.label}</label>
                        <input  type="text"
                                className="form-control"
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
        }, this.props.updateRecordFormState({[element.id]: {value: element.value}}));
    }
    handleToggle(e){
        e.preventDefault();
        let element = e.target;
        console.log(this.state.value);
        this.setState({
            value: !this.state.value
        }, this.props.updateRecordFormState(({[element.id]: {value: !this.state.value}})));
    }
}

ContextualInput.defaultProps = {
    input: 'shortText',
    label: 'Input Label',
    value: '',
    id: 'InputId',
    isTemplate: false

};
