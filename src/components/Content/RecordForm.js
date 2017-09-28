import React, { Component } from 'react';
import update from 'immutability-helper';
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
        const redirect = this.state.redirect;
        if(redirect){
            return <Redirect to="/" />;
        }
        let formTitle = this.props.edit ? "Edit Content" : "Add New Content",
            deleteRecord = this.props.edit && !this.props.recordId && <button className="btn btn-danger float-right" onClick={this.handleDelete}>Delete</button>,
            editTemplate = this.props.edit && <NavLink className="btn btn-info float-right" to={`/content/${this.props.contentId}/edit/template`}>{`Update ${this.props.formattedId} Template`}</NavLink>,
            idInput = !this.props.edit && <ContextualInput key="recordId" label="ID" id="recordId" updateRecordFormState={this.updateRecordId} value={this.state.recordId}/>
        ;
        return(
            <div className="card">
                <div className="card-header bg-dark text-white">
                    <h5 className="float-left">{formTitle}</h5>
                    {editTemplate}
                    {deleteRecord}
                </div>
                <div className="card-body">
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
                                            id={key}
                                            updateRecordFormState={this.updateToBeSaved}
                                            value={this.props.edit ? item.value : undefined}
                                         />
                                    )
                                })
                            )
                            :
                            (
                                <div className="alert alert-info" role="alert">
                                  No Template Created, <NavLink to={`/content/${this.props.contentId}/edit/template`} className="btn btn-info">{`Lets go create a template for ${this.props.formattedId}`}</NavLink>
                                </div>
                            )
                        }
                        {
                            this.state.saving ?
                            (
                                <button type="submit" className="btn btn-success" disabled >Saving...</button>
                            )
                            :
                            (
                                <button type="submit" className="btn btn-success" onClick={this.save}>Save</button>
                            )
                        }
                    </form>
                </div>
                {this.renderFeedback()}
            </div>
        );
    }
    updateToBeSaved(input){
        let inputKey = Object.keys(input)[0];
        console.log(this.props.data[inputKey]);
        if(!this.props.edit){
            input[inputKey]["label"] = this.props.data[inputKey].label;
            input[inputKey]["input"] = this.props.data[inputKey].input;
        }
        console.log(input);
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
        if (this.state.isSaved){
            return(
                <div className="card-footer text-white bg-success">
                    <span>Save Successful!</span>
                </div>
            );
        } else if (this.state.error.length > 0) {
            return(
                <div className="card-footer text-white bg-danger">
                    <span>Uh oh, Something went horribly wrong!</span>
                </div>
            );
        }


    }
}

RecordForm.defaultProps = {
    formattedId : "",
    data: {},
    contentId : "",
    recordId: "",
    edit: false
}
