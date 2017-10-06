import React, { Component } from 'react';
import RecordForm from './RecordForm';
import ContentController from '../../controllers/Content';
import TemplateController from '../../controllers/Templates';
import utl from '../../utl/StringFormatting';

export default class EditRecord extends Component {
    constructor(props){
        super(props);
        this.state = {
            template: {},
            content: {}
        }
        this.fetchRecordData = this.fetchRecordData.bind(this);
        this.fetchTemplate = this.fetchTemplate.bind(this);
    }
    componentDidMount(){
        this.fetchTemplate();
    }
    componentDidUpdate(prevProps){
        if (this.props.match.params.contentId !== prevProps.match.params.contentId){
            this.fetchTemplate();
        }
    }
    fetchTemplate(){
        let template = new TemplateController();
        template.GetRecord(this.props.match.params.contentId)
            .then((result) => {
                this.fetchRecordData(result);
            })
        ;
    }
    fetchRecordData(template){
        let fetch = new ContentController();
        fetch.GetRecord(this.props.match.params.contentId, this.props.match.params.recordId || "")
            .then((result) =>{
                this.setState({
                    content: result,
                    template: template
                });
            });
    }
    render(){
        let formattedId = utl.capitalize(this.props.match.params.contentId);
        return(
            <div className="row">
                <main className="col-12">
                    <h1>Edit {formattedId} Page</h1>
                    <RecordForm edit formattedId={formattedId} content={this.state.content} template={this.state.template} contentId={this.props.match.params.contentId} recordId={this.props.match.params.recordId} updateSidebar={this.props.updateSidebar} />
                </main>
            </div>
        );
    }
}
