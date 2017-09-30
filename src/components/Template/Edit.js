import React, { Component } from 'react';
import ContentController from '../../controllers/Content';
import InputPicker from './InputPicker';
import ContextualInput from '../Content/ContextualInput';
import utl from '../../utl/StringFormatting.js';
import update from 'immutability-helper';

export default class EditTemplate extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputs: {}
        };
        this.fetchTypeData = this.fetchTypeData.bind(this);
        this.addInput = this.addInput.bind(this);
    }
    componentDidMount(){
        this.fetchTypeData();
    }
    fetchTypeData(){
        let fetch = new ContentController();
        fetch.GetRecord(this.props.match.params.contentId)
            .then((result) =>{
                this.setState({
                    inputs: result.type === 'single' ? result : result.items[Object.keys(result.items)[0]],
                    saving: false,
                    isSaved: false,
                    error: [],
                    toBeSaved: {}
                });
            })
        ;
    }
    render(){
        return(
            <div className="row">
                <InputPicker addInput={this.addInput} />
                <main className="col-sm-8 ml-sm-auto col-md-9 pt-3" role="main">
                    <h2>Edit {utl.capitalize(this.props.match.params.contentId)}</h2>
                    <form>
                        {
                            Object.entries(this.state.inputs).length > 0 ?
                            (
                                Object.entries(this.state.inputs).filter(([key, item]) => key !== 'type').map(([_key, _item]) =>{
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
                                            isTemplate={true}
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
                </main>
            </div>
        );
    }
    addInput(id){
        let newId = `${id}-${Object.keys(this.state.inputs).length}`,
            newTitle = utl.capitalize(id),
            newInput = {
                [newId]: {
                    input: id,
                    label: newTitle,
                    value: false
                }
            },
            newState = update(this.state.inputs, {$merge: newInput})
        ;
        this.setState({
            inputs: newState
        });
    }
}
