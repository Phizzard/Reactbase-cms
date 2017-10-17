import React, { Component } from 'react';
import {MenuItem, Drawer, Divider, FloatingActionButton} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { NavLink } from 'react-router-dom';
import ContentController from '../controllers/Content';
import utl from '../utl/StringFormatting';

export default class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
            content: {}
        };
        this.renderContent = this.renderContent.bind(this);
        this.fetchContent = this.fetchContent.bind(this);
    }
    componentDidMount(){
        this.fetchContent();
    }
    fetchContent(){
        let fetch = new ContentController();
        fetch.List().then((content)=>{
            this.setState({
                content: content
            });
        });
    }
    componentWillReceiveProps(nextProps){
        if (this.props.updateSidebar !== nextProps.updateSidebar){
            this.fetchContent();
        }
    }
    render(){
        const drawerStyle = {
            top: '3.95rem'
        },
            addStlye ={
                position: 'fixed',
                top: '.1rem',
                right: '1rem'
            };
        return(
            <Drawer containerStyle={drawerStyle} open={this.props.open}>
                <h4 className="nav-link">Your Content</h4>
                <NavLink exact to='/content/add'>
                    <FloatingActionButton mini={true} style={addStlye}>
                        <ContentAdd />
                    </FloatingActionButton>
                </NavLink>
                <Divider />
                {this.renderContent()}
            </Drawer>
        );
    }
    renderContent(){
        return Object.entries(this.state.content).map((_item)=>{
            let item = {
                id: _item[0],
                title: _item[1].title,
                type: _item[1].type
            };
            return(
                <MenuItem key={item.id}>
                    <NavLink activeClassName="active" className="nav-link" to={`/content/${item.id}${item.type ==='single' ? ('/edit'):('')}`}>{utl.capitalize(item.id)}</NavLink>
                </MenuItem>
            );
        });
    }
}
