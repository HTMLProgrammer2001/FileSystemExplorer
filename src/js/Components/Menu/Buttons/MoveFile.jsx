import {connect} from "react-redux";
import classnames from 'classnames';

import {
    moveFiles
} from "js/actions";
import fetchApi from 'js/api';

function MoveFile(props){
    //create function
    let move = async () => {
        if(!props.selectedFiles.length)
            return;

        let newPlace = prompt('Enter new dir');

        await fetchApi({
            paths: JSON.stringify(props.selectedFiles.map((item) => item.path)),
            to: newPlace,
            type: 'move'
        });

        props.dispatch(moveFiles({
            from: props.selectedFiles,
            to: newPlace
        }))
    };

    return (
        <div
            className={
                classnames('menu-item w-100 border p-1 text-center', {
                    'text-muted': !props.selectedFiles.length
                })
            }
            onClick = {move}
        >
            Переместить
        </div>
    );
}

const stateToProps = (state) => ({
    selectedFiles: state.select.selectedFiles,
    selectedPath: state.select.selectedPath
});

export default connect(stateToProps, null)(MoveFile);
