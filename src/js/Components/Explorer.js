import React from 'react';

import Switcher from './Folders/Switcher';
import Viewer from './Viewer/Viewer';
import Menu from './Menu/';

function Explorer({path}){
    return (
        <div>
            <Switcher path = {path}/>
            <Menu/>
            <Viewer/>
        </div>
    )
}

export default Explorer;