import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui';

export default class Dashboard extends Component {
    render(){
        return(
            <div>
                <h1>Dashboard</h1>
                <section className="row text-center placeholders">
                  <div className="col-6 col-sm-3 placeholder">
                    <img src="data:image/gif;base64,R0lGODlhAQABAIABAAJ12AAAACwAAAAAAQABAAACAkQBADs=" width="200" height="200" className="img-fluid rounded-circle" alt="Generic placeholder thumbnail" />
                    <h4>Label</h4>
                    <div className="text-muted">Something else</div>
                  </div>
                  <div className="col-6 col-sm-3 placeholder">
                    <img src="data:image/gif;base64,R0lGODlhAQABAIABAADcgwAAACwAAAAAAQABAAACAkQBADs=" width="200" height="200" className="img-fluid rounded-circle" alt="Generic placeholder thumbnail" />
                    <h4>Label</h4>
                    <span className="text-muted">Something else</span>
                  </div>
                  <div className="col-6 col-sm-3 placeholder">
                    <img src="data:image/gif;base64,R0lGODlhAQABAIABAAJ12AAAACwAAAAAAQABAAACAkQBADs=" width="200" height="200" className="img-fluid rounded-circle" alt="Generic placeholder thumbnail" />
                    <h4>Label</h4>
                    <span className="text-muted">Something else</span>
                  </div>
                  <div className="col-6 col-sm-3 placeholder">
                    <img src="data:image/gif;base64,R0lGODlhAQABAIABAADcgwAAACwAAAAAAQABAAACAkQBADs=" width="200" height="200" className="img-fluid rounded-circle" alt="Generic placeholder thumbnail" />
                    <h4>Label</h4>
                    <span className="text-muted">Something else</span>
                  </div>
                </section>

                <h2>Table</h2>
                <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Status</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableRowColumn>1</TableRowColumn>
                        <TableRowColumn>John Smith</TableRowColumn>
                        <TableRowColumn>Employed</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>2</TableRowColumn>
                        <TableRowColumn>Randal White</TableRowColumn>
                        <TableRowColumn>Unemployed</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>3</TableRowColumn>
                        <TableRowColumn>Stephanie Sanders</TableRowColumn>
                        <TableRowColumn>Employed</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>4</TableRowColumn>
                        <TableRowColumn>Steve Brown</TableRowColumn>
                        <TableRowColumn>Employed</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>5</TableRowColumn>
                        <TableRowColumn>Christopher Nolan</TableRowColumn>
                        <TableRowColumn>Unemployed</TableRowColumn>
                      </TableRow>
                    </TableBody>
                  </Table>
            </div>
        );
    }
}
