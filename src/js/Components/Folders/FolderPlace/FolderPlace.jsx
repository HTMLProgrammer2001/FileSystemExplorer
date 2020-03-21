import React from 'react';
import {connect} from "react-redux";

import Folder from './Items/Folder';
import File from './Items/File';
import {
    changePath,
    addFiles
} from "js/actions";
import {getDir} from "js/fileSelector";

require('babel-polyfill');

class FolderPlace extends React.Component{
    constructor(props){
        super(props);

        //Listener on files and folders
        this.openListener = this.openListener.bind(this);

        //abort controller on fetch
        this.controller = null;

        //ref on the component
        this.ref = React.createRef();

        this.state = {
            //scroll
            scrollTop: 0,

            open: {
              path: '',
              isDir: false
            },

            //files
            loaded: false
        }
    }

    //Load files
    async componentDidMount() {
        this.props.changePath(this.props.path);

        this.controller = new AbortController();

        let folderContent = await fetch('http://explorer/dist/php/api.php', {
            method: 'POST',
            signal: this.controller.signal,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            mode: 'cors',
            body: 'type=getFolderContent&path=' + this.props.path
        });

        folderContent = await folderContent.json();
        this.props.addFiles({...folderContent, path: folderContent.path.split('/')});
        this.setState({loaded: true});

        this.controller = null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //scroll
        if( this.ref.current.scrollHeight <= this.ref.current.clientHeight )
            this.ref.current.style.overflowY = 'hidden';
        else
            this.ref.current.scrollTop = this.state.scrollTop;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if(this.state.scrollTop === this.ref.current.scrollTop)
            return;

        this.setState({
            scrollTop: this.ref.current.scrollTop
        });
    }

    componentWillUnmount() {
        if(this.controller)
            this.controller.abort();
    }

    render(){
        let path = this.props.path,
            state = this.state,
            files = getDir(this.props.files, this.props.path.split('/'));

        return (
            <React.Fragment>

                <div
                    className='folder mt-3 border'
                    ref = {this.ref}>
                    <div className='pr-0 list-group'>
                        {
                            !Object.values(files).length ? <div className="list-group-item border-0">Empty folder</div>
                                :
                            [].map.call(Object.values(files), (item, index) => {
                                let isChecked = state.open.path === item.name;

                                return item.isDir ?
                                    <Folder
                                        name = {item.name}
                                        path = {path + item.name + '/'}
                                        key = {index}
                                        Listener = {this.openListener}
                                        selectMode = {this.props.selectMode}
                                        isDir = {item.isDir}
                                        isChecked = {isChecked}/>
                                            :
                                    <File
                                        name = {item.name}
                                        path = {path + item.name}
                                        ext = {item.type}
                                        key = {index}
                                        Listener = {this.openListener}
                                        selectMode = {this.props.selectMode}
                                        isDir = {item.isDir}
                                        isChecked = {isChecked}/>;
                        })}
                    </div>
                </div>

                {(state.open.path && state.open.isDir) ?
                    <FolderPlace
                        {...this.props}
                        key = {path + state.open.path + '/'}
                        path={path + state.open.path + '/'}
                    /> : ''}

            </React.Fragment>
        );
    }

    openListener(open) {
        this.props.changePath(this.props.path + (open.path ? open.path : ''));

        if(!this.props.selectMode)
            this.setState({
                open
            });
    }
}

const stateToProps = (state) => ({
    files: state.files.value
});

const dispatchToProps = (dispatch) => ({
   changePath: (path) => dispatch(changePath(path)),
    addFiles: (payload) => dispatch(addFiles(payload))
});

export default connect(stateToProps, dispatchToProps)(FolderPlace);
