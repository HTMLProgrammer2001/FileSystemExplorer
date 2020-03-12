import React from 'react';
import {connect} from 'react-redux';

import FolderPlace from './FolderPlace/FolderPlace';

function Switcher(props) {
    return (
        <div className="row m-3">
            <FolderPlace
                {...props}
            />
        </div>
    );
}

const stateToProps = (state) => ({
   selectMode: state.select.selectMode,
   selectedFiles: state.select.selectedFiles
});

export default connect(stateToProps, null)(Switcher);