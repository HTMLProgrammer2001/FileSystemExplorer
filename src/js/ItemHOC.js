import React from 'react';
import {connect} from 'react-redux';

//actions
import {
    toggleSelect,
    toggleFile
} from './actions';

export default (Elem) => {
    class ElemWithSelect extends React.Component{
        constructor(props){
            super(props);

            //select mode timer
            this.timer = null;

            //bind func
            this.onTimer = this.onTimer.bind(this);
            this.onMouseDown = this.onMouseDown.bind(this);
            this.onMouseUp = this.onMouseUp.bind(this);
            this.onClick = this.onClick.bind(this);
        }

        onTimer(){
            this.props.toggleSelect();
        }

        onMouseDown(){
            this.timer = setTimeout(this.onTimer, 500);
        }

        onMouseUp(){
            if(this.timer)
                clearTimeout(this.timer);
        }

        onClick(){
            let obj = {
                path: this.props.path,
                name: this.props.name,
                isDir: this.props.isDir
            };

            if(this.props.selectMode)
                this.props.toggleFile(obj);
        }

        render(){
            return (
                <div
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}
                    onClick = {this.onClick}
                >
                    <Elem
                        isSelected={
                            ~this.props.selectedFiles.findIndex(
                                (item) =>
                                            item.path === this.props.path)
                        }
                        {...this.props}/>
                </div>
            );
        }
    }

    let stateToProps = (state) => ({
       selectMode: state.select.selectMode,
       selectedFiles: state.select.selectedFiles
    }),
    dispatchToProps = (dispatch) => {
        return {
            toggleSelect: () => dispatch(toggleSelect()),
            toggleFile: (path) => dispatch(toggleFile(path))
        }
    };

    return connect(stateToProps, dispatchToProps)(ElemWithSelect);
}
