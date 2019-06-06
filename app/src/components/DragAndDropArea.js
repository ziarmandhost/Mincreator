import React, { Component } from 'react';
const { ipcRenderer } = window.require('electron');

class DragAndDropArea extends Component {
    constructor (props) {
        super(props);

        this.state = {
            supportedExt : [
                "html", "htm", "xhtml", "xht",
                "css",
                "js"
            ]
        };
    }

    getFile = () => {
        let input = document.createElement('input');
        input.type = 'file';

        input.onchange = () => {
            let file = {
                title : input.files[0].name.split('.')[0],
                ext : input.files[0].name.split('.')[1],
                size : input.files[0].size,
                mimeType : input.files[0].type,
                path : input.files[0].path
            };

            if (file.size >= 50000000) {
                alert("Error!\nA file larger than 50 MB!");
                return false;
            }
            else if (this.state.supportedExt.indexOf(file.ext) === -1) {
                alert("This type of files is not yet supported!");
               return false;
            }
            else {
                ipcRenderer.send('minify-file', file);

                ipcRenderer.on('minified', (event, arg) => {
                    if (arg.error) {
                        alert(`ERROR!\n${arg.message}`);
                        return false;
                    }
                    else {
                        file.src = arg;
                        this.saveFile(file);
                    }
                });
            }
        };

        input.click();
    };

    saveFile = file => {
        ipcRenderer.send('save-file', file);

        ipcRenderer.on('saved', (event, arg) => {
            arg ? alert("Saved!") : alert(`ERROR!\nThe problem with saving this file!`);
            window.location.reload();
        });
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