import React from 'react';

//import menu items
import CreateFile from './Buttons/CreateFile';
import CreateFolder from './Buttons/CreateFolder';
import DeleteFiles from './Buttons/DeleteFiles';
import RenameFile from './Buttons/RenameFile';
import MoveFile from './Buttons/MoveFile';

function Menu(){
    return (
        <div className="d-flex justify-content-center">
            <div className="d-flex col-sm-9 justify-content-between">
                {/*Menu items*/}
                <CreateFile/>
                <CreateFolder/>
                <DeleteFiles/>
                <RenameFile/>
                <MoveFile/>
            </div>
        </div>
    );
}

export default Menu;
