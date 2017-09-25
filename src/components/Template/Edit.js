import React, { Component } from 'react';
import ContentController from '../../controllers/Content';
import InputPicker from './InputPicker';
import ContextualInput from '../Content/ContextualInput';

export default class EditTemplate extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputs: {}
        };
        this.fetchTypeData = this.fetchTypeData.bind(this);
    }
    componentDidMount(){
        this.fetchTypeData();
    }
    fetchTypeData(){
        let fetch = new ContentController();
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
        return(
            <div className="row">
                <InputPicker />
                <main className="col-sm-8 ml-sm-auto col-md-9 pt-3" role="main">
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
                                            id={key}
                                            updateEditRecordFormState={this.updateToBeSaved}
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
}
