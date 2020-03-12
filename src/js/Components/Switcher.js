import React from 'react';

import FolderPlace from './FolderPlace';

function Switcher({path}) {
    return (
        <div className="row m-3">
            <FolderPlace path={path}/>
        </div>
    );
}

export default Switcher;