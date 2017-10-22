import React, {Component} from 'react';
import {Step, Stepper, StepButton, RaisedButton, Card, CardHeader, CardText} from 'material-ui';

export default class InitApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            step: 0
        }
    }
    render(){
        return(
            <Card>
                <CardText/>
                    <h1>Time to INITIALIZE!</h1>
                    <Stepper linear={false} activeStep={this.state.step}>
                        <Step>
                            <StepButton>
                                STEP 1
                            </StepButton>
                        </Step>
                        <Step>
                            <StepButton>
                                STEP 2
                            </StepButton>
                        </Step>
                        <Step>
                            <StepButton>
                                STEP 3
                            </StepButton>
                        </Step>
                    </Stepper>
                <CardText/>
            </Card>
        );
    }
}
