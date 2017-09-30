import React, { Component } from 'react';
import RecordForm from './RecordForm';
import ContentController from '../../controllers/Content';
import utl from '../../utl/StringFormatting';

export default class EditRecord extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {}
        }
        this.fetchRecordData = this.fetchRecordData.bind(this);
    }
    componentDidMount(){
        this.fetchRecordData();
    }
    componentDidUpdate(prevProps){
        if (this.props.match.params.contentId !== prevProps.match.params.contentId){
            this.fetchRecordData();
        }
    }
    fetchRecordData(){
        let fetch = new ContentController();
        fetch.GetRecord(this.props.match.params.contentId, this.props.match.params.recordId || "")
            .then((result) =>{
                this.setState({
                    data: result
                });
            });
    }
    render(){
        let formattedId = utl.capitalize(this.props.match.params.contentId);
        return(
            <div className="row">
                <main className="col-12">
                    <h1>Edit {formattedId} Page</h1>
                    <RecordForm edit formattedId={formattedId} data={this.state.data} contentId={this.props.match.params.contentId} recordId={this.props.match.params.recordId} />
                </main>
            </div>
        );
    }
}
