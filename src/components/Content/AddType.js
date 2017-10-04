import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {TextField, RadioButton, RadioButtonGroup, RaisedButton} from 'material-ui';
import ContentController from '../../controllers/Content';

export default class AddContentType extends Component {
    constructor(props){
        super(props);
        this.state = {
            single: false,
            multiple: false,
            newContentType: "",
            type: "",
            redirect: false
        };

        this.handleRadio = this.handleRadio.bind(this);
        this.handleContentTypeName = this.handleContentTypeName.bind(this);
        this.handleAddContentType = this.handleAddContentType.bind(this);
    }

    render(){
        const redirect = this.state.redirect;
        if(redirect){
            return <Redirect to="/" />;
        }
        let disabled = true;
        !this.state.newContentType || !this.state.type ? disabled = true : disabled = false;
        return(
            <div className="row">
                <main className="col-12 ml-sm-auto" role="main">
                    <h1>Add New Content Type</h1>
                    <form>
                        <TextField
                            onChange={this.handleContentTypeName}
                            value={this.state.newContentType}
                            type="text"
                            floatingLabelText="New Content Name"
                            hintText="e.g. Articles"
                        />
                        <h2>{`How many ${this.state.newContentType} will there be?`}</h2>
                        <p>For example, there is only one homepage entry, but there are multiple blog entries.</p>
                        <RadioButtonGroup onChange={this.handleRadio}>
                            <RadioButton
                                value="single"
                                label={`There is only one ${this.state.newContentType} entry`}
                            />
                            <RadioButton
                                value="multiple"
                                label={`There are multiple ${this.state.newContentType} entries`}
                            />
                        </RadioButtonGroup>
                        <RaisedButton backgroundColor="#28a745" labelColor="#FFF" disabled={disabled} label={`Create ${this.state.newContentType}`} onClick={this.handleAddContentType}></RaisedButton>
                    </form>
                </main>
            </div>
        );
    }

    handleRadio(e){
        let element = e.target,
            uncheck;
        element.value === "single" ? uncheck = "multiple" : uncheck = "single";
        this.setState({
            [element.value]: true,
            [uncheck]: false,
            type: element.value
        });
    }
    handleContentTypeName(e){
        let element = e.target;
        this.setState({
            newContentType: element.value
        });
    }
    handleAddContentType(e){
        e.preventDefault();
        let content = new ContentController(),
            id = this.state.newContentType.toLowerCase(),
            contentModel;
            if(this.state.type === "single"){
                contentModel = {
                    [id]: {
                        title: {
                            input: 'shortText',
                            label: 'Title',
                            value: this.state.newContentType
                        },
                        type: this.state.type
                    }
                };
            } else {
                contentModel = {
                    [id]: {
                        items: false,
                        type: this.state.type
                    }
                }
            }
            content.CreateType(contentModel).then(()=>{
                this.props.updateSidebar();
                this.setState({
                    redirect: true
                });
            }).catch((error)=>{
                return {
                    errorCode: error.code,
                    errorMessage: error.message
                };
            });

    }
}
