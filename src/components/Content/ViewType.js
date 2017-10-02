import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  IconMenu,
  MenuItem,
  IconButton,
  RaisedButton
} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
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
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>Name</TableHeaderColumn>
                                <TableHeaderColumn>Last Updated</TableHeaderColumn>
                                <TableHeaderColumn>Created On</TableHeaderColumn>
                                <TableHeaderColumn>
                                    <IconMenu
                                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                    >
                                        <MenuItem primaryText={`Add New ${formattedId} Entry`} ><NavLink to={`/content/${this.props.match.params.contentId}/add`}></NavLink></MenuItem>
                                        <MenuItem primaryText={`Update ${formattedId} Template`} ><NavLink to={`/content/${this.props.match.params.contentId}/edit/template`} ></NavLink></MenuItem>
                                        <MenuItem onClick={this.handleDelete} primaryText={`Delete ${formattedId} Type`} />
                                    </IconMenu>
                                </TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {this.renderContentItems()}
                        </TableBody>
                    </Table>
                </main>
            </div>
        );
    }
    renderContentItems(){
        if(Object.entries(this.state.data).length > 0 || this.state.data !== null){
            return Object.entries(this.state.data).map(([key, item]) =>{
                return(
                    <TableRow key={key}>
                        <TableRowColumn>{key}</TableRowColumn>
                        <TableRowColumn>SomeDate</TableRowColumn>
                        <TableRowColumn>SomeDate</TableRowColumn>
                        <TableRowColumn>
                            <RaisedButton label="Edit" primary={true}><NavLink to={`/content/${this.props.match.params.contentId}/${key}/edit`}></NavLink></RaisedButton>
                            <RaisedButton label="Delete" secondary={true} id={key} onClick={this.handleDelete}></RaisedButton>
                        </TableRowColumn>
                    </TableRow>
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
                this.props.updateSidebar();
                this.setState({
                    redirect: true
                });
            }

        });
    }
    editTemplate(e){
        e.preventDefault();
    }
    addEntry(e){
        e.preventDefault();
    }
}
