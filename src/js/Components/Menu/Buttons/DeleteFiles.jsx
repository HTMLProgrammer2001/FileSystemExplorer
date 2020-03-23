import {connect} from "react-redux";
import classnames from 'classnames';

import {
    deleteFiles
} from "js/redux/actions";
import fetchApi from 'js/helpers/api';

function DeleteFiles(props){
    //create function
    let del = async () => {
        if(!props.selectedFiles.length)
            return;

        await fetchApi({
            type: 'delete',
            paths: JSON.stringify(props.selectedFiles.map((item) => item.path))
        });

        props.dispatch(deleteFiles(props.selectedFiles));
    };

    return (
        <div
            className={
                classnames('menu-item w-100 border p-1 text-center', {
                    'text-muted': !props.selectedFiles.length
                })
            }
            onClick={del}>
            Удалить
        </div>
    );
}

const stateToProps = (state) => ({
    selectedFiles: state.select.selectedFiles,
    selectedPath: state.active.path
});

export default connect(stateToProps, null)(DeleteFiles);
