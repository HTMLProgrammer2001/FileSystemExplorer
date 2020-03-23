import {connect} from "react-redux";
import classnames from 'classnames';

import {
    renameFile
} from "js/redux/actions";
import fetchApi from 'js/helpers/api';

function RenameFile(props){
    //create function
    let rename = async () => {
        if(props.selectedFiles.length !== 1)
            return;

        let newFileName = prompt('Enter new name');

        await fetchApi({
            type: 'rename',
            from: props.selectedFiles[0].path,
            to: props.selectedFiles[0].path.split('/').filter((e)=>!!e).slice(0, -1).join('/') + '/' + newFileName
        });

        props.dispatch(renameFile({
            from: props.selectedFiles[0],
            to: newFileName
        }));
    };

    return (
        <div
            className={
                classnames('menu-item w-100 border p-1 text-center', {
                    'text-muted': props.selectedFiles.length !== 1
                })
            }
            onClick={rename}
        >
            Переименовать
        </div>
    );
}

const stateToProps = (state) => ({
    selectedFiles: state.select.selectedFiles,
    selectedPath: state.active.path
});

export default connect(stateToProps, null)(RenameFile);
