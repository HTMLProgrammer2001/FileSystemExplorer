import React from 'react';
import {connect} from "react-redux";
import {TransitionGroup, Transition} from 'react-transition-group';

import Folder from './Items/Folder';
import File from './Items/File';
import {
    changePath,
    addFiles,
    changeActiveItem
} from "js/redux/actions";
import {getDir} from "js/helpers/fileSelector";
import fetchApi from 'js/helpers/api';

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

        let folderContentResponse = await fetchApi({
            type: 'getFolderContent',
            path: this.props.path
        }, {
            signal: this.controller.signal
        }),

        folderContent = await folderContentResponse.json();
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
            files = getDir(this.props.files, path.split('/'));

        return (
            <React.Fragment>
                <div
                    className='folder mt-3 border'
                    ref = {this.ref}>
                    <div className='pr-0 list-group'>
                            {
                                !Object.values(files).length ?
                                    <div className="list-group-item border-0">Empty folder</div>
                                    :
                                    [].map.call(Object.values(files), (item, index) => {
                                        let isChecked = state.open.path === item.name;

                                        return item.isDir ?
                                            <Folder
                                                item={item}
                                                key = {index}
                                                Listener = {this.openListener}
                                                isChecked = {isChecked}/>
                                                :
                                            <File
                                                item = {item}
                                                key = {index}
                                                Listener = {this.openListener}
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
        this.props.changeActive(getDir(this.props.files, this.props.path.split('/'))[open.path]);

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
    changeActive: (item) => dispatch(changeActiveItem(item)),
    addFiles: (payload) => dispatch(addFiles(payload))
});

export default connect(stateToProps, dispatchToProps)(FolderPlace);
