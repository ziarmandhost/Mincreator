import React, { Component } from 'react';
const { ipcRenderer } = window.require('electron');

class DragAndDropArea extends Component {
    constructor (props) {
        super(props);

        this.state = {
            supportedExt : [
                "html", "css", "js"
            ]
        };
    }

    getFile = () => {
        let input = document.createElement('input');
        input.type = 'file';

        input.onchange = () => {
            console.log(input.files);
            let file = {
                name : input.files[0].name.split('.')[0],
                ext : input.files[0].name.split('.')[1],
                size : input.files[0].size,
                mimeType : input.files[0].type
            };

            if (file.size >= 50000000) {
                alert("Error!\nA file larger than 50 MB!");
                return;
            }
            else if (this.state.supportedExt.indexOf(file.ext) === -1) {
                alert("Error!\nThis type of files is not yet supported!");
                return;
            }
            else {
                ipcRenderer.sendSync('minify-file', file);

                // ipcRenderer.on('minified', (event, arg) => {
                //     console.log(arg); //response
                // });
            }
        };

        input.click();
    };

    render () {
        return (
            <div id="dnd">
                <div id="zone" onClick={this.getFile}>
                    <h1> Choose file to minify ... </h1>
                </div>
            </div>
        );
    }
}

export default DragAndDropArea;