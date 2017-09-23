import React, { Component } from 'react';
import ContextualInput from './ContextualInput';

export default class EditRecordForm extends Component {
    render(){
        return(
            <div className="card">
                <div className="card-header">
                    <h5>Edit Content</h5>
                </div>
                <div className="card-body">
                    <form>
                        {
                            Object.entries(this.props.data).length > 0 ?
                            (
                                Object.entries(this.props.data).filter(([key, item]) => key !== 'type').map(([_key, _item]) =>{
                                    let item = _item,
                                        key = _key
                                    ;
                                    return(
                                        <ContextualInput
                                            key={key}
                                            label={item.label}
                                            value={item.value}
                                            id={key}
                                         />
                                    )
                                })
                            )
                            :
                            (
                                <div>
                                    No Input fields created
                                </div>
                            )
                        }
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}
