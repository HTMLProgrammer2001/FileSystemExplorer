import {connect} from "react-redux";

import {
    addFiles
} from "js/actions";
import fetchApi from 'js/api';

function createFolder(props){
    //create function
    let create = async () => {
        let fileName = prompt('Enter name');
        if(!fileName)
            return;

        //call api
        await fetchApi({
            type: 'create',
            createType: 'folder',
            path: props.selectedPath + fileName
        });

        //dispatch event
        props.dispatch(addFiles({
            path: props.selectedPath.split('/'),
            value: [{
                path: props.selectedPath + fileName + '/',
                name: fileName,
                isDir: true,
                type: false
            }]
        }));
    };

    return (
        <div className='menu-item w-100 border p-1 text-center'
             onClick = {() => create()}>Создать папку</div>
    );
}

const stateToProps = (state) => ({
    selectedFiles: state.select.selectedFiles,
    selectedPath: state.select.selectedPath
});

export default connect(stateToProps, null)(createFolder);
