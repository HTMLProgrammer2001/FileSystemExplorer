import React, {Component} from 'react';

import FolderPlace from './FolderPlace';

class Switcher extends Component{
    render(){
        return (
            <div className="row m-3">
                <FolderPlace path={this.props.path}/>
            </div>
        );
    }
}

export default Switcher;