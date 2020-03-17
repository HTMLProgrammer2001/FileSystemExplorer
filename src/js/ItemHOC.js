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
            this.onMouseDown = this.onMouseDown.bind(this, props.path);
            this.onMouseUp = this.onMouseUp.bind(this);
            this.onClick = this.onClick.bind(this, props.path);
        }

        onTimer(){
            this.props.toggleSelect();
        }

        onMouseDown(path){
            this.timer = setTimeout(this.onTimer, 500, path);
        }

        onMouseUp(){
            if(this.timer)
                clearTimeout(this.timer);
        }

        onClick(path){
            if(this.props.selectMode)
                this.props.toggleFile(path);
        }

        render(){
            return (
                <div
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}
                    onClick = {this.onClick}
                >
                    <Elem {...this.props}/>
                </div>
            );
        }
    }

    let stateToProps = (state) => ({
       selectMode: state.select.selectMode
    }),
    dispatchToProps = (dispatch) => {
        return {
            toggleSelect: () => dispatch(toggleSelect()),
            toggleFile: (path) => dispatch(toggleFile(path))
        }
    };

    return connect(stateToProps, dispatchToProps)(ElemWithSelect);
}