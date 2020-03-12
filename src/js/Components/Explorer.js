import React from 'react';

import Switcher from './Switcher';
import Viewer from './Viewer';

function Explorer({path}){
    return (
        <div>
            <Switcher path = {path || './path'}/>
            <Viewer/>
        </div>
    )
}

export default Explorer;