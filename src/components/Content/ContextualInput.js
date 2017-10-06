import React, { Component } from 'react';
import {TextField, Toggle, Dialog, RaisedButton, Tab, Tabs} from 'material-ui';

export default class ContextualInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            input: '',
            label: '',
            value: '',
            open: false
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }
    componentDidMount(){
        this.setState({
            value: this.props.value
        });
    }
    componentDidUpdate(prevProps){
        if (this.props.value !== prevProps.value){
            this.setState({
                value: this.props.value
            });
        }
    }
    render(){
        const inputStyle = {
                display: 'block'
            },
            optionsStyle = {
                padding: 0
            }
        ;
        switch(this.props.input){
            case 'longText':
                return(
                    <div className={`form-group ${this.props.isTemplate && 'isTemplateInput'}`}>
                        <TextField
                            multiLine={true}
                            rows={4}
                            floatingLabelText={this.props.label}
                            id={this.props.id}
                            value={this.state.value}
                            onChange={this.handleInput}
                            disabled={this.props.isTemplate}
                        />
                    </div>
                );
            case 'number':
                return(
                    <div className={`${this.props.isTemplate && 'isTemplateInput'}`}>
                        <TextField
                            type="number"
                            step="any"
                            floatingLabelText={this.props.label}
                            id={this.props.id}
                            value={this.state.value}
                            onChange={this.handleInput}
                            disabled={this.props.isTemplate}
                        />
                    </div>
                );
            case 'currency':
                return(
                    <div className={`form-group ${this.props.isTemplate && 'isTemplateInput'}`}>
                        <TextField
                            type="number"
                            step="any"
                            floatingLabelText={this.props.label}
                            id={this.props.id}
                            value={this.state.value}
                            onChange={this.handleInput}
                            disabled={this.props.isTemplate}
                        />
                    </div>
                );
            case 'checkbox':
                return(
                    <div className={`form-group ${this.props.isTemplate && 'isTemplateInput'}`}>
                        <Toggle
                            label={this.props.label}
                            id={this.props.id}
                            disabled={this.props.isTemplate}
                            onToggle={this.handleToggle}
                            toggled={this.state.value || false}
                            labelPosition="right"
                        />
                    </div>
                );
            default:
                return(
                    <div className={`${this.props.isTemplate && 'isTemplateInput'}`}>
                        <TextField
                            type="text"
                            floatingLabelText={this.props.label}
                            id={this.props.id}
                            value={this.state.value}
                            onChange={this.handleInput}
                            disabled={this.props.isTemplate}
                        />
                        {
                            this.props.isTemplate && (
                                <div>
                                    <RaisedButton primary={true} label="Options" fullWidth={true} onClick={this.handleTouchTap} />
                                    <Dialog
                                        bodyStyle={optionsStyle}
                                        open={this.state.open}
                                        onRequestClose={this.handleRequestClose}
                                    >
                                        <Tabs>
                                            <Tab label="Options">
                                                <div className="container">
                                                    <div className="row">
                                                        <form style={{padding: '24px'}}>
                                                            <TextField style={inputStyle} floatingLabelText="Label" />
                                                            <TextField style={inputStyle} floatingLabelText="Other Options" />
                                                            <TextField style={inputStyle} floatingLabelText="Other Options" />
                                                            <TextField style={inputStyle} floatingLabelText="Other Options" />
                                                            <TextField style={inputStyle} floatingLabelText="Other Options" />
                                                        </form>
                                                    </div>
                                                </div>
                                            </Tab>
                                        </Tabs>
                                    </Dialog>
                                </div>
                            )
                        }
                    </div>
                );
        }
    }
    handleInput(e){
        e.preventDefault();
        let element = e.target;
        this.setState({
            value: element.value
        }, this.props.updateRecordFormState({[element.id]: element.value}));
    }
    handleToggle(e, toggle){
        e.preventDefault();
        let element = e.target;
        this.setState({
            value: toggle
        }, this.props.updateRecordFormState(({[element.id]: toggle})));
    }
    handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
}

ContextualInput.defaultProps = {
    input: 'shortText',
    label: 'Input Label',
    value: '',
    id: 'InputId',
    isTemplate: false

};
