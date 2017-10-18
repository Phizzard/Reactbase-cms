import React, { Component } from 'react';
import TemplateController from '../../controllers/Templates';
import ContentController from '../../controllers/Content';
import {Card, CardHeader, CardText, TextField, Toggle, RaisedButton} from 'material-ui';
import utl from '../../utl/StringFormatting.js';

export default class InputForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentKey: props.id,
            key: props.id,
            label: props.label,
            instructions: props.instructions,
            required: props.required,
            saving: false,
            isSaved: false,
            error: [],
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
                        <RaisedButton backgroundColor="#28a745" labelColor="#FFF" disabled={this.state.saving} label={this.state.saving ? "Saving..." : "Save"} onClick={this.handleSave.bind(this)}></RaisedButton>
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
    handleSave(e){
        e.preventDefault();
        this.setState({
            saving: true
        }, ()=>{
            let toBeSaved = {
                instructions: this.state.instructions,
                label: this.state.label,
                required: this.state.required
            },
                oldKey = this.state.currentKey,
                template = new TemplateController();
                template.UpdateRecord(this.props.contentId, this.state.key , toBeSaved).then((created)=>{
                    if (this.state.key !== oldKey){
                        template.DeleteRecord(this.props.contentId, oldKey).then(()=>{
                            let content = new ContentController();
                            content.GetRecord(this.props.contentId).then((record)=>{
                                let newContent = { [this.state.key]: record[oldKey]};
                                content.UpdateRecord(this.props.contentId, newContent).then(()=>{
                                    content.DeleteInput(this.props.contentId, oldKey);
                                });
                            });
                        });
                    }
                    this.setState({
                        saving: false,
                        isSaved: true,
                        currentKey: this.state.key
                    });
                }).catch((error)=>{
                    this.setState({
                        error: this.state.error.push(error),
                        saving: false
                    })
                ;
            });
        });

    }
}
