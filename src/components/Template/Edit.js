import React, { Component } from 'react';
import TemplateController from '../../controllers/Templates';
import InputPicker from './InputPicker';
import InputForm from './InputForm';
import utl from '../../utl/StringFormatting.js';
import {FloatingActionButton, Dialog, RaisedButton, Card, CardHeader, CardActions, CardText} from 'material-ui';
import { NavLink } from 'react-router-dom';
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
        let fetch = new TemplateController();
        fetch.GetRecord(this.props.match.params.contentId)
            .then((result) =>{
                this.setState({
                    inputs: result,
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
        },CardHeaderStyle = {
            backgroundColor: '#5a5a5a'
        },
        titleColor = "#FFF",
        editContent = <NavLink to={`/content/${this.props.match.params.contentId}/edit`}><RaisedButton className="float-right" primary={true} label={`Update ${utl.capitalize(this.props.match.params.contentId)} Content`}></RaisedButton></NavLink>
        return(
            <div className="row">
                <main className="col-12" role="main">
                    <h1>Edit {utl.capitalize(this.props.match.params.contentId)} Template</h1>
                    <Card>
                        <CardHeader
                            title="Edit Template"
                            style={CardHeaderStyle}
                            titleColor={titleColor}
                        />
                        <CardActions>
                            {editContent}
                        </CardActions>
                        <CardText>
                            <form>
                                {
                                    Object.entries(this.state.inputs).length > 0 ?
                                    (
                                        Object.entries(this.state.inputs).filter(([key, item]) => key !== 'type').map(([_key, _item]) =>{
                                            let item = _item,
                                                key = _key
                                            ;
                                            return(
                                                <InputForm
                                                    key={key}
                                                    id={key}
                                                    input={item.input}
                                                    title={utl.capitalize(key)}
                                                    label={item.label}
                                                    instructions={item.instructions}
                                                    required={item.required}
                                                    contentId={this.props.match.params.contentId}
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
                                <RaisedButton backgroundColor="#28a745" labelColor="#FFF" disabled={this.state.saving} label={this.state.saving ? "Saving..." : "Save all"} onClick={this.handleAddContentType}></RaisedButton>
                            </form>
                        </CardText>
                    </Card>
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
                    instructions: "",
                    required: false
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
