import React from 'react';

import FolderPlace from './FolderPlace/FolderPlace';

function Switcher(props) {
    return (
        <div className="row m-3">
            <FolderPlace
                key = {props.path}
                {...props}
            />
        </div>
    );
}

export default Switcher;
