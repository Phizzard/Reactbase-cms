import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import { NavLink } from 'react-router-dom';
import ContentController from '../../controllers/Content';

export default class ViewContentType extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {}
        };
        this.fetchRecords = this.fetchRecords.bind(this);
    }
    componentDidMount(){
        this.fetchRecords();
    }
    componentDidUpdate(prevProps){
        if (this.props.match.params.contentId !== prevProps.match.params.contentId){
            this.fetchRecords();
        }
    }
    fetchRecords(){
        let fetch = new ContentController();
        fetch.GetRecord(this.props.match.params.contentId)
            .then((result) =>{
                this.setState({
                    data: result.items
                });
            });
    };
    render(){
        let formattedId = `${this.props.match.params.contentId.charAt().toUpperCase()}${this.props.match.params.contentId.substr(1).toLowerCase()}`;
        return(
            <div className="row">
                <Sidebar />
                <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main">
                    <h1>{formattedId}</h1>
                    <table className="table table-hover">
                      <thead className="thead-inverse">
                        <tr>
                          <th>Name</th>
                          <th>Last Updated</th>
                          <th>Created On</th>
                          <th><NavLink to={`/content/${this.props.match.params.contentId}/edit/template`} className="btn btn-info float-right">{`Update ${formattedId} Template`}</NavLink><NavLink to={`/content/${this.props.match.params.contentId}/add`} className="btn btn-success float-right">{`Add New ${formattedId} Entry`}</NavLink></th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.renderContentItems()}
                      </tbody>
                    </table>
                </main>
            </div>
        );
    }
    renderContentItems(){
        if(Object.entries(this.state.data).length > 0 || this.state.data !== null){
            return Object.entries(this.state.data).map(([key, item]) =>{
                return(
                    <tr key={key}>
                        <td>{key}</td>
                        <td>SomeDate</td>
                        <td>SomeDate</td>
                        <td>
                            <NavLink to={`/content/${this.props.match.params.contentId}/${key}/edit`}>
                                <button className="btn btn-sm btn-info">Edit</button>
                            </NavLink>
                        </td>
                    </tr>
                );
            });
        }
    }
}
