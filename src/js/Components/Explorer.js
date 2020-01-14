import React, {Component} from 'react';

import Switcher from './Switcher';
import Viewer from './Viewer';

class Explorer extends Component{
    render(){
        return (
            <div>
                <Switcher path={this.props.path || './'}/>
                <Viewer/>
            </div>
        );
    }
}

export default Explorer;