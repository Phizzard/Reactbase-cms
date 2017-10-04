import React, { Component } from 'react';
import ContentController from '../../controllers/Content';
import InputPicker from './InputPicker';
import ContextualInput from '../Content/ContextualInput';
import utl from '../../utl/StringFormatting.js';
import {FloatingActionButton, Dialog, RaisedButton} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import update from 'immutability-helper';

export default class EditTemplate extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
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
        const addStyle = {
            margin: 'auto'
        }
        return(
            <div className="row">

                <main className="col-12" role="main">
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
                        <div className="text-center">
                            <FloatingActionButton style={addStyle} onClick={this.handleOpen}>
                              <ContentAdd />
                            </FloatingActionButton>
                        </div>
                        <Dialog
                            title="Dialog With Actions"
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}
                        >
                            <InputPicker addInput={this.addInput} />
                        </Dialog>
                        <RaisedButton backgroundColor="#28a745" labelColor="#FFF" disabled={this.state.saving} label={this.state.saving ? "Saving..." : "Save"} onClick={this.handleAddContentType}></RaisedButton>
                    </form>
                </main>
            </div>
        );
    }
    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };
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
            open: false,
            inputs: newState
        });
    }
}
