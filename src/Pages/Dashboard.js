import React, {Component} from "react";
import { Grid, Header } from 'semantic-ui-react';

export default class Dashboard extends Component {
    render(){
        return(
            <React.Fragment>
                <Grid padded={true}>
                    <Grid.Row>
                        <Header as='h1'>Dashboard</Header>
                    </Grid.Row>
                </Grid>
            </React.Fragment>
        );
    }
}
