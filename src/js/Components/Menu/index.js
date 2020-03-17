import React from 'react';
import {connect} from "react-redux";
import classnames from 'classnames';

import {
    addFiles,
    deleteFiles
} from 'js/actions';

class Menu extends React.Component{
    constructor(props){
        super(props);

        //bind functions to this context
        this.deleteItems = this.deleteItems.bind(this);
        this.create = this.create.bind(this);
        this.renameItem = this.renameItem.bind(this);
        this.moveItems = this.moveItems.bind(this);
    }

    render() {

        return (
            <div className="d-flex justify-content-center">
                <div className="d-flex col-sm-9 justify-content-between">
                    <div className='menu-item w-100 border p-1 text-center'
                         onClick = {() => this.create('file')}>Создать файл</div>

                    <div className='menu-item w-100 border p-1 text-center'
                         onClick = {() => this.create('folder')}>Создать папку</div>

                    <div
                        className={
                            classnames('menu-item w-100 border p-1 text-center', {
                                'text-muted': !this.props.selectedFiles.length
                            })
                        }
                        onClick={this.deleteItems}>
                            Удалить
                    </div>

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

    async deleteItems(){
        if(!this.props.selectedFiles.length)
            return;

        await this.fetchApi({
           type: 'delete',
           paths: JSON.stringify(this.props.selectedFiles)
        });

        this.props.dispatch(deleteFiles(this.props.selectedFiles));
    }

    async create(type){
        let fileName = prompt('Enter name');
        if(!fileName)
            return;

        //call api
        await this.fetchApi({
           type: 'create',
           createType: type,
           path: this.props.selectedPath + fileName
        });

        this.props.dispatch(addFiles({
            path: this.props.selectedPath.split('/'),
            value: [{
                path: this.props.selectedPath + fileName + (type === 'file' ? '' : '/'),
                name: fileName,
                isDir: type !== 'file',
                type: fileName.slice(fileName.lastIndexOf('.') + 1)
            }]
        }));
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

        this.props.dispatch();
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

        // answer = await answer.json();
        // console.log(answer);
        // return answer;
    }
}

const stateToProps = (state) => ({
   selectedFiles: state.select.selectedFiles,
   selectedPath: state.select.selectedPath
});

export default connect(stateToProps, null)(Menu);