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
}

ContextualInput.defaultProps = {
    input: 'shortText',
    label: 'Input Label',
    value: '',
    id: 'InputId',
    isTemplate: false

};
