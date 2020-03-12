import React from 'react';

import Folder from './Items/Folder';
import File from './Items/File';

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
            //active element
            open: {
                path: null,
                isDir: false
            },
            //scroll
            scrollTop: 0,
            //Folder content
            files: {
                value: [],
                errors: ''
            }
        }
    }

    //Load files
    async componentDidMount() {
        this.controller = new AbortController();

        let folderContent = await fetch('http://explorer/dist/php/tree.php', {
            method: 'POST',
            signal: this.controller.signal,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            mode: 'cors',
            body: 'path=' + this.props.path
        });

        folderContent = await folderContent.json();

        this.setState( {
            files: folderContent
        });

        this.controller = null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //scroll
        if( this.ref.current.scrollHeight <= this.ref.current.clientHeight )
            this.ref.current.style.overflowY = 'hidden';
        else
            this.ref.current.scrollTop = this.state.scrollTop;

        console.log(this.state.scrollTop);
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
            _this = this;

        return (
            <React.Fragment>

                <div
                    className='folder mt-3 border'
                    ref = {this.ref}>
                    <div className='pr-0 list-group'>
                        {
                            !state.files.value.length ? <div className="list-group-item border-0">Empty folder</div>
                                :
                            [].map.call(state.files.value, (item, index) => {
                                let isSelected = this.props.selectMode && this.props.selectedFiles,
                                isChecked = state.open.path === item.name;

                                return item.isFolder ?
                                    <Folder
                                        name = {item.name}
                                        path = {path + item.name + '/'}
                                        key = {index}
                                        Listener = {_this.openListener}
                                        selectMode = {this.props.selectMode}
                                        isSelected = {
                                            isSelected &&
                                                this.props.selectedFiles.includes(path + item.name + '/')
                                        }
                                        isChecked = {isChecked}/>
                                            :
                                    <File
                                        name = {item.name}
                                        path = {path + item.name}
                                        ext = {item.type}
                                        key = {index}
                                        Listener = {_this.openListener}
                                        selectMode = {this.props.selectMode}
                                        isSelected = {
                                             this.props.selectMode &&
                                             this.props.selectedFiles.includes(path + item.name)
                                        }
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
        if(!this.props.selectMode)
            this.setState({
                open
            });
    }
}

export default FolderPlace;