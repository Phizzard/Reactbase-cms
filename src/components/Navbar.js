import React, { Component } from 'react';
import {AppBar, Avatar, MenuItem, IconMenu, IconButton} from 'material-ui';
import hash from 'md5';
import Authentication from '../controllers/Authentication';

class UserNav extends Component {
    render(){
        return(
            <IconMenu iconButtonElement={
                <IconButton><Avatar src={this.props.image} /></IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Help" />
                <MenuItem onClick={this.handleSignOut.bind(this)} primaryText="Sign out" />
            </IconMenu>
        );
    }
    handleSignOut(e){
        e.preventDefault();
        let auth = new Authentication();
        auth.LogOut();
    }
}

export default class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            showUserDropdown: false,
            collapse: true
        }
    }
    render(){
        const   gravatarUrl = 'https://www.gravatar.com/avatar/',
                options = '?s=40&d=mm',
                appBarStyle = {
                    position: 'fixed',
                    top: 0
                }
        ;
        return(
            <AppBar style={appBarStyle} onLeftIconButtonTouchTap={this.toggleSideBar.bind(this)} title="Reactbase" iconElementRight={this.props.user && <UserNav image={`${gravatarUrl}${hash(this.props.user.email)}${options}`} />} />
        );
    }
    toggleSideBar(e){
        this.props.toggleSideBar();
    }
}
