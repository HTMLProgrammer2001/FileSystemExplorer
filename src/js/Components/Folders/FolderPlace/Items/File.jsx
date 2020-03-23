import {connect} from "react-redux";
import classnames from 'classnames';

import ItemHOC from 'js/ItemHOC';
import icons from 'js/helpers/icons';

class File extends React.Component{
    constructor(props){
        super(props);

        this.clickHandler = this.clickHandler.bind(this);
    }

    render(){
        let wrapperClasses =
            classnames('d-flex justify-content-between w-100 pointer list-group-item list-group-item-action', {
                active: this.props.isChecked
            }),

            selectClass = classnames({
                'fas': this.props.isSelected,
                'far': !this.props.isSelected
            }, 'fa-check-circle'),

            iconClass = icons[this.props.item.type];

        return (
            <div
                className={wrapperClasses}
                onClick={this.clickHandler}>

                    {/*Icons*/}
                    <div>
                        <i className={iconClass + ' mr-1'}> </i>
                        {this.props.selectMode && <i className={selectClass}> </i> }
                    </div>

                    <div className="ml-3">
                        {this.props.item.name}
                    </div>

                    <div> </div>
            </div>
        );
    }

    clickHandler(e){
        if(this.props.selectMode)
            return;

        this.props.Listener({
            path: this.props.isChecked ? null : this.props.item.name,
            isDir: false
        }, e);
    }
}

const stateToProps = (state) => ({
   selectMode: state.select.selectMode
});

export default connect(stateToProps, null)(ItemHOC(File));
