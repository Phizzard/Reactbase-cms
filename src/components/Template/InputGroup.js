import React, { Component } from 'react';
import InputType from './InputType';

export default class InputGroup extends Component {
    constructor(props){
        super(props);
        this.addInput = this.addInput.bind(this);
    }
    render(){
        return(
            <div className="container">
                <h5>{this.props.title}</h5>
                <div className="row text-center justify-center">
                    {
                        Object.entries(this.props.group).map(([key, type])=>{
                            return <InputType key={key}>
                                        <div className="input-selector"  onClick={this.addInput}>
                                            <i id={key} className="material-icons">{type.icon}</i>
                                            <span>{type.title}</span>
                                        </div>
                                    </InputType>
                        })
                    }
                </div>
            </div>
        );
    }
    addInput(e){
        let element = e.target;
        this.props.addInput(element.id);
    }
}
