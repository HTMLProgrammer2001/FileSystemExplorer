import React from 'react';
import {connect} from "react-redux";
import classnames from 'classnames';

import {
    renameFile
} from 'js/actions';

//import menu items
import CreateFile from './Buttons/CreateFile';
import CreateFolder from './Buttons/CreateFolder';
import DeleteFiles from './Buttons/DeleteFiles';

class Menu extends React.Component{
    constructor(props){
        super(props);

        //bind functions to this context
        this.renameItem = this.renameItem.bind(this);
        this.moveItems = this.moveItems.bind(this);
    }

    render() {

        return (
            <div className="d-flex justify-content-center">
                <div className="d-flex col-sm-9 justify-content-between">
                    <CreateFile/>
                    <CreateFolder/>
                    <DeleteFiles/>

                    <div
                        className={
                            classnames('menu-item w-100 border p-1 text-center', {
                                'text-muted': this.props.selectedFiles.length !== 1
                            })
                        }
                        onClick={this.renameItem}
                        >
                            Переименовать
                    </div>

                    <div
                        className={
                            classnames('menu-item w-100 border p-1 text-center', {
                                'text-muted': !this.props.selectedFiles.length
                            })
                        }
                        onClick = {this.moveItems}
                    >
                            Переместить
                    </div>
                </div>
            </div>
        );
    }

    async renameItem(){
        if(this.props.selectedFiles.length !== 1)
            return;

        let newFileName = prompt('Enter new name');

        await this.fetchApi({
            type: 'rename',
            from: this.props.selectedFiles[0],
            to: newFileName
        });

        this.props.dispatch(renameFile({
            from: this.props.selectedFiles[0],
            to: newFileName
        }));
    }

    async moveItems(){
        if(!this.props.selectedFiles.length)
            return;

        let newPlace = prompt('Enter new dir');

        await this.fetchApi({
            paths: JSON.stringify(this.props.selectedFiles),
            to: newPlace,
            type: 'move'
        });
    }

    async fetchApi(bodyObj){
        //transform body object to body string
        let bodyPairs = Object.entries(bodyObj),
        body = bodyPairs.map(([name, value]) => `${name}=${value}`).join('&');

        let answer = await fetch('http://explorer/dist/php/api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            mode: 'cors',
            body
        });
    }
}

const stateToProps = (state) => ({
   selectedFiles: state.select.selectedFiles,
   selectedPath: state.select.selectedPath
});

export default connect(stateToProps, null)(Menu);
