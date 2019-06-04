import React, { Component } from 'react';

import Language from "./Language";

class SupportedLanguages extends Component {
    constructor (props) {
        super(props);

        this.state = {
            changed : false,
            show : false
        };
    }

    showSupportedLanguages = () => {
        if (!this.state.show)
            this.setState({show : true, changed : true})
    };

    hideSupportedLanguages = () => {
        this.setState({show : false});
        this.refs.supportedLanguages.blur();
    };

    render () {
        return (
           <div ref="supportedLanguages" id="supportedLanguages" className={this.state.show ? "show" : this.state.changed ? "hide" : null} onClick={this.showSupportedLanguages}>
               <h1> {this.state.show ? "Supported languages list" : "Click to see supported languages list"} </h1>
               <div className="languages" style={{display : this.state.show ? "flex" : "none"}}>
                   <Language title="HTML"/>
                   <Language title="CSS"/>
                   <Language title="JS"/>
               </div>
               <div className="close" style={{display : this.state.show ? "block" : "none"}} onClick={this.hideSupportedLanguages}>
                   <img src={require("../assets/images/close.png")} alt="Close"/>
               </div>
           </div>
        );
    }
}

export default SupportedLanguages;
