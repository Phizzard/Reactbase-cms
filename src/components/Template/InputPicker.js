import React, { Component } from 'react';
import inputTypes from '../../inputTypes.json'
import InputGroup from './InputGroup';

export default class InputPicker extends Component {
    constructor(props){
        super(props);
        this.addInput = this.addInput.bind(this);
    }
    render(){
        return(
            <div className="col-sm-4 col-md-3 d-none d-sm-block bg-dark sidebar text-white input-picker">
                {
                    Object.entries(inputTypes).map(([key, group])=>{
                        return <InputGroup
                                    key={key}
                                    title={key}
                                    group={group}
                                    addInput={this.addInput}
                                />
                    })
                }
            </div>
        );
    }
    addInput(id){
        this.props.addInput(id)
    }
}
