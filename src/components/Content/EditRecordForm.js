import React, { Component } from 'react';
import update from 'immutability-helper';
import ContextualInput from './ContextualInput';

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
                <div className="card-header">
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
                        <button type="submit" className="btn btn-primary" onClick={this.save}>Submit</button>
                    </form>
                </div>
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

    }
}
