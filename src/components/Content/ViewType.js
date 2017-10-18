import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  IconMenu,
  MenuItem,
  IconButton,
  RaisedButton,
  Card,
  CardHeader,
  CardActions,
  CardText,
} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentController from '../../controllers/Content';
import TemplateController from '../../controllers/Templates';
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
                    if(result){
                        this.setState({
                            data: result.items
                        });
                    }
                })
            ;
        }
    }
    render(){
        const redirect = this.state.redirect;
        if (redirect){
            return <Redirect to="/" />;
        }
        const CardHeaderStyle = {
            backgroundColor: '#5a5a5a'
        },
        titleColor = "#FFF",
        formattedId = utl.capitalize(this.props.match.params.contentId)
        ;
        return(
            <div className="row">
                <main className="col-12" role="main">
                    <h1>View {formattedId} </h1>
                    <Card>
                        <CardHeader
                            title={formattedId}
                            style={CardHeaderStyle}
                            titleColor={titleColor}
                        />
                        <CardActions>
                            <IconMenu
                                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            >
                                <NavLink to={`/content/${this.props.match.params.contentId}/add`}><MenuItem primaryText={`Add New ${formattedId} Entry`} ></MenuItem></NavLink>
                                <NavLink to={`/content/${this.props.match.params.contentId}/edit/template`} ><MenuItem primaryText={`Update ${formattedId} Template`} ></MenuItem></NavLink>
                                <MenuItem onClick={() => this.handleDelete()} primaryText={`Delete ${formattedId} Type`} />
                            </IconMenu>
                        </CardActions>
                        <CardText>
                            <Table>
                                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Name</TableHeaderColumn>
                                        <TableHeaderColumn>Last Updated</TableHeaderColumn>
                                        <TableHeaderColumn>Created On</TableHeaderColumn>
                                        <TableHeaderColumn>Action</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    {this.renderContentItems()}
                                </TableBody>
                            </Table>
                        </CardText>
                    </Card>
                </main>
            </div>
        );
    }
    renderContentItems(){
        if(Object.entries(this.state.data).length > 0 || this.state.data !== null){
            return Object.entries(this.state.data).map(([key, item]) =>{
                return(
                    <TableRow key={key} selectable={false} >
                        <TableRowColumn>{key}</TableRowColumn>
                        <TableRowColumn>SomeDate</TableRowColumn>
                        <TableRowColumn>SomeDate</TableRowColumn>
                        <TableRowColumn>
                            <NavLink to={`/content/${this.props.match.params.contentId}/${key}/edit`}><RaisedButton label="Edit" primary={true}></RaisedButton></NavLink>
                            <RaisedButton label="Delete" secondary={true} id={key} onClick={() => this.handleDelete(key)}></RaisedButton>
                        </TableRowColumn>
                    </TableRow>
                );
            });
        }
    }
    handleDelete(recordId){
        let record = new ContentController();
        record.DeleteRecord(this.props.match.params.contentId, recordId || "" ).then(result=>{
            if (recordId){
                this.fetchRecords();
            } else {
                let template = new TemplateController();
                template.DeleteTemplate(this.props.match.params.contentId).then(()=>{
                    this.props.updateSidebar();
                    this.setState({
                        redirect: true
                    });
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
