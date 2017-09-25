import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import ContentController from '../../controllers/Content';

export default class AddContentType extends Component {
    constructor(props){
        super(props);
        this.state = {
            single: false,
            multiple: false,
            newContentType: "",
            type: "",
        };

        this.handleRadio = this.handleRadio.bind(this);
        this.handleContentTypeName = this.handleContentTypeName.bind(this);
        this.handleAddContentType = this.handleAddContentType.bind(this);
    }

    render(){
        let disabled = true;
        !this.state.newContentType || !this.state.type ? disabled = true : disabled = false;
        return(
            <div className="row">
                <Sidebar />
                <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main">
                    <h1>Add New Content Type</h1>
                    <form>
                        <div className="form-group">
                            <label>New content name</label>
                            <input type="text" className="form-control form-control-lg" placeholder="e.g. Articles" onChange={this.handleContentTypeName} value={this.state.newContentType} />
                        </div>
                        <h2>{`How many ${this.state.newContentType} will there be?`}</h2>
                        <p>For example, there is only one homepage entry, but there are multiple blog entries.</p>
                        <div className="form-check">
                            <label className="form-check-label">
                                <input className="form-check-input" type="radio" value="single" checked={this.state.single} onChange={this.handleRadio} />
                                {`There is only one ${this.state.newContentType} entry`}
                            </label>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label">
                                <input className="form-check-input" type="radio" id="multipleRadio" value="multiple" checked={this.state.multiple} onChange={this.handleRadio} />
                                {`There are Multiple ${this.state.newContentType} entries`}
                            </label>
                        </div>
                        <button className="btn btn-success" disabled={disabled} onClick={this.handleAddContentType}>{`Create ${this.state.newContentType}`}</button>
                    </form>
                </main>
            </div>
        );
    }

    handleRadio(e){
        let element = e.target,
            uncheck;
        element.value === "single" ? uncheck = "multiple" : uncheck = "single";
        this.setState({
            [element.value]: true,
            [uncheck]: false,
            type: element.value
        });
    }
    handleContentTypeName(e){
        let element = e.target;
        this.setState({
            newContentType: element.value
        });
    }
    handleAddContentType(e){
        e.preventDefault();
        let content = new ContentController(),
            id = this.state.newContentType.toLowerCase(),
            contentModel;
            if(this.state.type === "single"){
                contentModel = {
                    [id]: {
                        title: {
                            input: 'shortText',
                            label: 'Title',
                            value: this.state.newContentType
                        },
                        type: this.state.type
                    }
                };
            } else {
                contentModel = {
                    [id]: {
                        items: false,
                        type: this.state.type
                    }
                }
            }
            content.CreateType(contentModel).catch((error)=>{
                return {
                    errorCode: error.code,
                    errorMessage: error.message
                };
            });

    }
}
