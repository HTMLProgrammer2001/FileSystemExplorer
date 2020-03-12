import React from 'react';

import Switcher from './Folders/Switcher';
import Viewer from './Viewer/Viewer';

function Explorer({path}){
    return (
        <div>
            <Switcher path = {path || './path'}/>
            <Viewer/>
        </div>
    )
}

export default Explorer;