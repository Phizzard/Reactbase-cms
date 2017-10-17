import React, { Component } from 'react';
import {Card, CardHeader, CardText, TextField, Toggle} from 'material-ui';
import utl from '../../utl/StringFormatting.js';

export default class InputForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            key: props.id,
            label: props.label,
            instructions: props.instructions,
            required: props.required
        }
        this.handleInput = this.handleInput.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(this.state !== nextProps){
            this.setState(nextProps);
        }
    }
    render(){
        const CardHeaderStyle = {
            backgroundColor: '#5a5a5a'
        },
        inputStyle = {
            display: 'block'
        },
        titleColor = "#FFF"
        ;
        return(
            <Card>
                <CardHeader
                    title={utl.capitalize(this.state.key)}
                    style={CardHeaderStyle}
                    titleColor={titleColor}
                />
                <CardText>
                        <TextField
                            style={inputStyle}
                            floatingLabelText="Id"
                            id="key"
                            value={this.state.key}
                            onChange={this.handleInput}
                        />
                        <TextField
                            style={inputStyle}
                            floatingLabelText="Label"
                            id="label"
                            value={this.state.label}
                            onChange={this.handleInput}
                        />
                        <TextField
                            style={inputStyle}
                            floatingLabelText="Instructions"
                            label="instructions"
                            id="instructions"
                            value={this.state.instructions}
                            onChange={this.handleInput}
                        />
                        <Toggle
                            style={inputStyle}
                            label="Required"
                            id="required"
                            labelPosition="right"
                            toggled={this.state.required}
                            onToggle={this.handleToggle.bind(this)}
                        />
                </CardText>
            </Card>
        );
    }
    handleInput(e){
        let element = e.target;
        this.setState({
            [element.id]: element.value
        });
    }
    handleToggle(e, toggle){
        let element = e.target;
        this.setState({
            [element.id]: toggle
        });
    }
}
