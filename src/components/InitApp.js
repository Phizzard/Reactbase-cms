import React, {Component} from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import {Step, Stepper, StepButton, RaisedButton, Card, CardHeader, CardText} from 'material-ui';

export default class InitApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            stepIndex: 0
        }
        this.renderStepDetails = this.renderStepDetails.bind(this);
    }
    render(){
        return(
            <Card>
                <CardText/>
                    <h1>Time to INITIALIZE!</h1>
                    <Stepper linear={false} activeStep={this.state.stepIndex}>
                        <Step>
                            <StepButton onClick={() => this.setState({stepIndex: 0})}>
                                STEP 1
                            </StepButton>
                        </Step>
                        <Step>
                            <StepButton onClick={() => this.setState({stepIndex: 1})}>
                                STEP 2
                            </StepButton>
                        </Step>
                        <Step>
                            <StepButton onClick={() => this.setState({stepIndex: 2})}>
                                STEP 3
                            </StepButton>
                        </Step>
                    </Stepper>
                    {this.renderStepDetails()}
                <CardText/>
            </Card>
        );
    }
    renderStepDetails(){
        switch(this.state.stepIndex){
            case 0:
                return <Step1 />
            case 1:
                return <Step2 />
            case 2:
                return <Step3 />
            default:
                return "Uh Oh something went terribly wrong"
        }
    }
}
