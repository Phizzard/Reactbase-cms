import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import ContentController from '../../controllers/Content';
import utl from '../../utl/StringFormatting';

export default class ViewContentType extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {},
            redirect: false
        };
        this.fetchRecords = this.fetchRecords.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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
        if(!this.state.redirect){
            let fetch = new ContentController();
            fetch.GetRecord(this.props.match.params.contentId)
                .then((result) =>{
                    this.setState({
                        data: result.items
                    });
                })
            ;
        }
    }
    render(){
        const redirect = this.state.redirect;
        if (redirect){
            return <Redirect to="/" />;
        }
        let formattedId = utl.capitalize(this.props.match.params.contentId);
        return(
            <div className="row">
                <main className="col-12" role="main">
                    <h1>View {formattedId} </h1>
                    <table className="table table-hover">
                      <thead className="thead-inverse">
                        <tr>
                          <th>Name</th>
                          <th>Last Updated</th>
                          <th>Created On</th>
                          <th>
                              <NavLink to={`/content/${this.props.match.params.contentId}/edit/template`} className="btn btn-info float-right">{`Update ${formattedId} Template`}</NavLink>
                              <NavLink to={`/content/${this.props.match.params.contentId}/add`} className="btn btn-success float-right">{`Add New ${formattedId} Entry`}</NavLink>
                              <button className="btn btn-danger float-right" onClick={this.handleDelete}>{`Delete ${formattedId} Type`}</button>
                          </th>
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
                            <NavLink className="btn btn-sm btn-info" to={`/content/${this.props.match.params.contentId}/${key}/edit`}>Edit</NavLink>
                            <button id={key} className="btn btn-sm btn-danger" onClick={this.handleDelete}>Delete</button>
                        </td>
                    </tr>
                );
            });
        }
    }
    handleDelete(e){
        e.preventDefault();
        let element = e.target,
            record = new ContentController();
        record.DeleteRecord(this.props.match.params.contentId, element.id || "" ).then(result=>{
            if (element.id){
                this.fetchRecords();
            } else {
                this.setState({
                    redirect: true
                });
            }

        });
    }
}
