import React, { Component } from 'react';
import {Card, CardHeader, CardText, TextField, Toggle} from 'material-ui';

export default class InputForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: props.title,
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
                    title={this.state.title}
                    style={CardHeaderStyle}
                    titleColor={titleColor}
                />
                <CardText>
                    <form>
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
                    </form>
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
