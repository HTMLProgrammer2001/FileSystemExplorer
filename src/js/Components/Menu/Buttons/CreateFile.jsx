import {connect} from "react-redux";

import {
    addFiles
} from "js/redux/actions";
import fetchApi from 'js/helpers/api';

function createFile(props){
    //create function
    let create = async () => {
        let fileName = prompt('Enter name');
        if(!fileName)
            return;

        //call api
        await fetchApi({
            type: 'create',
            createType: 'file',
            path: props.selectedPath + fileName
        });

        //dispatch event
        props.dispatch(addFiles({
            path: props.selectedPath.split('/'),
            value: [{
                path: props.selectedPath + fileName,
                name: fileName,
                isDir: false,
                type: fileName.slice(fileName.lastIndexOf('.') + 1)
            }]
        }));
    };

    return (
        <div className='menu-item w-100 border p-1 text-center'
             onClick = {() => create()}>Создать файл</div>
    );
}

const stateToProps = (state) => ({
    selectedFiles: state.select.selectedFiles,
    selectedPath: state.active.path
});

export default connect(stateToProps, null)(createFile);
