import React, { Component } from 'react';
import InputType from './InputType';

export default class InputGroup extends Component {
    render(){
        return(
            <div className="container">
                <h5>{this.props.title}</h5>
                <div className="row text-center">
                    {
                        Object.entries(this.props.group).map(([key, type])=>{
                            return <InputType
                                key={key}
                                id={key}
                                icon={type.icon}
                                title={type.title}
                            />
                        })
                    }
                </div>
            </div>
        );
    }
}
