import React, { Component } from 'react';
import update from 'immutability-helper';
import {Card, CardHeader, CardActions, CardTitle, CardText, TextField, RaisedButton, Snackbar } from 'material-ui';
import ContextualInput from './ContextualInput';
import { NavLink, Redirect } from 'react-router-dom';
import ContentController from '../../controllers/Content';

export default class RecordForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            saving: false,
            isSaved: false,
            error: [],
            toBeSaved: {},
            recordId: "",
            redirect: false
        }
        this.updateToBeSaved = this.updateToBeSaved.bind(this);
        this.save = this.save.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.renderFeedback = this.renderFeedback.bind(this);
        this.updateRecordId = this.updateRecordId.bind(this);
    }
    componentDidUpdate(prevProps){
        if (this.props !== prevProps){
            this.setState({
                toBeSaved: {}
            });
        }
    }
    render(){
        const   redirect = this.state.redirect,
                CardHeaderStyle = {
                    backgroundColor: '#5a5a5a'
                },
                titleColor = "#FFF",
                saveColor = "#28a745"
        ;
        if(redirect){
            return <Redirect to="/" />;
        }
        let formTitle = this.props.edit ? "Edit Content" : "Add New Content",
            deleteRecord = this.props.edit && !this.props.recordId && <RaisedButton className="float-right" secondary={true} label="Delete" onClick={this.handleDelete}></RaisedButton>,
            editTemplate = this.props.edit && <RaisedButton className="float-right" primary={true} label={`Update ${this.props.formattedId} Template`}><NavLink to={`/content/${this.props.contentId}/edit/template`}></NavLink></RaisedButton>,
            idInput = !this.props.edit && <ContextualInput key="recordId" label="ID" id="recordId" updateRecordFormState={this.updateRecordId} value={this.state.recordId}/>
        ;
        return(
            <Card>
                <CardHeader
                    title={formTitle}
                    style={CardHeaderStyle}
                    titleColor={titleColor}
                />
                <CardActions>
                    {editTemplate}
                    {deleteRecord}
                </CardActions>
                <CardText>
                    <form>
                        {idInput}
                        {
                            Object.entries(this.props.data).length > 0 ?
                            (
                                Object.entries(this.props.data).filter(([key, item]) => key !== 'type').map(([_key, _item]) =>{
                                    let item = _item,
                                        key = _key
                                    ;
                                    return(
                                        <ContextualInput
                                            key={key}
                                            label={item.label}
                                            input={item.input}
                                            id={key}
                                            updateRecordFormState={this.updateToBeSaved}
                                            value={this.props.edit ? item.value : undefined}
                                         />
                                    )
                                })
                            )
                            :
                            (
                                <Card>
                                     No Template Created, <RaisedButton label={`Lets go create a template for ${this.props.formattedId}`}><NavLink to={`/content/${this.props.contentId}/edit/template`}></NavLink></RaisedButton>
                                </Card>
                            )
                        }
                        {
                            this.state.saving ?
                            (
                                <RaisedButton type="submit" labelColor="#FFF" backgroundColor="#28a745" label="Saving..." disabled ></RaisedButton>
                            )
                            :
                            (
                                <RaisedButton type="submit" labelColor="#FFF" backgroundColor="#28a745" label="Save" onClick={this.save}></RaisedButton>
                            )
                        }
                    </form>
                </CardText>
                {this.renderFeedback()}
            </Card>
        );
    }
    updateToBeSaved(input){
        let inputKey = Object.keys(input)[0];
        if(!this.props.edit){
            input[inputKey]["label"] = this.props.data[inputKey].label;
            input[inputKey]["input"] = this.props.data[inputKey].input;
        }
        let prevToBeSaved = this.state.toBeSaved,
            nextToBeSaved = update(prevToBeSaved, {$merge: input});
        this.setState({
            toBeSaved: nextToBeSaved
        });
    }
    updateRecordId(input){
        this.setState({
            recordId: input.recordId.value
        });
    }
    save(e){
        e.preventDefault();
        if (Object.keys(this.state.toBeSaved).length > 0){
            this.setState({
                saving: true,
                isSaved: false
            });
            let content = new ContentController();
            content.UpdateCollection(this.props.contentId, this.state.toBeSaved, this.props.edit ? this.props.recordId || "" : this.state.recordId).then(()=>{
                this.setState({
                    saving: false,
                    isSaved: true,
                    toBeSaved: {}
                });
            }).catch((error)=>{
                let errorObject = {
                    errorCode: error.code,
                    errorMessage: error.message
                }
                this.setState({
                    error: this.state.error.concat(errorObject)
                });
            });
        }

    }
    handleDelete(e){
        e.preventDefault();
        let content = new ContentController();
        content.DeleteRecord(this.props.contentId).then(()=>{
            this.setState({
                redirect: true
            });
        });
    }
    renderFeedback(){
        return(
            <Snackbar
                open={this.state.isSaved}
                message={this.state.error.length > 0 ? "Uh Oh something went wrong!": "Save Successful!"}
                autoHideDuration={4000}
            />
        );
    }
}

RecordForm.defaultProps = {
    formattedId : "",
    data: {},
    contentId : "",
    recordId: "",
    edit: false
}
