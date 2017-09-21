import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import Content from '../../controllers/Content';

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
    fetchRecordData(){
        let fetch = new Content();
        fetch.GetRecord(this.props.match.params.contentId)
            .then((result) =>{
                this.setState({
                    data: result
                });
            });
    }
    render(){
        let formattedId = `${this.props.match.params.contentId.charAt().toUpperCase()}${this.props.match.params.contentId.substr(1).toLowerCase()}`;
        return(
            <div className="row">
                <Sidebar />
                <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main">
                    <h1>Edit {formattedId} Page</h1>
                </main>
            </div>
        );
    }
}
