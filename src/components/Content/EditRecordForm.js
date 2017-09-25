import React, { Component } from 'react';
import update from 'immutability-helper';
import ContextualInput from './ContextualInput';
import ContentController from '../../controllers/Content';

export default class EditRecordForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            saving: false,
            isSaved: false,
            error: [],
            toBeSaved: {}
        }
        this.updateToBeSaved = this.updateToBeSaved.bind(this);
        this.save = this.save.bind(this);
        this.renderFeedback = this.renderFeedback.bind(this);
    }
    componentDidUpdate(prevProps){
        if (this.props !== prevProps){
            this.setState({
                toBeSaved: {}
            });
        }
    }
    render(){
        return(
            <div className="card">
                <div className="card-header bg-dark text-white">
                    <h5>Edit Content</h5>
                </div>
                <div className="card-body">
                    <form>
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
                                            value={item.value}
                                            id={key}
                                            updateEditRecordFormState={this.updateToBeSaved}
                                         />
                                    )
                                })
                            )
                            :
                            (
                                <div>
                                    No Input fields created
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
        let prevToBeSaved = this.state.toBeSaved,
            nextToBeSaved = update(prevToBeSaved, {$merge: input});
        this.setState({
            toBeSaved: nextToBeSaved
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
            content.UpdateCollection(this.props.contentId, this.state.toBeSaved, this.props.recordId || "").then(()=>{
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
