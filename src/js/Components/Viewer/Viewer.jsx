import {connect} from 'react-redux';

//import types
import Text from './ViewerTypes/ViewerText';
import Video from './ViewerTypes/ViewerVideo';
import Audio from './ViewerTypes/ViewerAudio';
import Image from './ViewerTypes/ViewerImage';
import Unknown from './ViewerTypes/ViewerUnknown';

class Viewer extends React.Component{
    constructor(props){
        super(props);

        this.editModeChange = this.editModeChange.bind(this);

        this.state = {
            editMode: false
        }
    }

    render(){
        if(!this.props.activeItem || this.props.activeItem.isDir)
            return null;

        let file = this.props.activeItem,
            ViewContent = this.getView();

        return (
            <div className="d-flex justify-content-center">
                <div className="col-sm-8 mt-4" id="file_picker">

                    {
                        file.path ?
                            <ViewContent
                                path = {file.path}
                                editModeChange = {this.editModeChange}
                                editMode = {this.state.editMode}/>
                                    :
                            ''
                    }

                    {
                        file.path && !this.state.editMode ?
                            <div className="d-flex justify-content-between">

                                <a href={'http://explorer/dist/php/file.php?path=' + file.path} download target="_blank" className="w-100 m-3">
                                    <div className="btn btn-primary w-100">

                                        <i className="fas fa-download mx-2"></i>
                                        <span>Download</span>

                                    </div>
                                </a>

                                <div
                                    className="btn btn-primary w-100 m-3"
                                    onClick={this.editModeChange}
                                >
                                    <span>Edit</span>
                                </div>

                            </div>
                        :
                            ''
                    }

                </div>
            </div>
        );
    }

    getView(){
        switch (this.props.activeItem.type) {
            case 'image':
                return Image;
            case 'video':
                return Video;
            case 'text':
                return Text;
            case 'audio':
                return Audio;
            default:
                return Unknown;
        }
    }

    editModeChange(){
        this.setState((prev) => ({
          editMode: !prev.editMode
        }));
    }
}

const stateToProps = (state) => ({
    activeItem: state.active.item,
    selectedFiles: state.select.selectedFiles
});

export default connect(stateToProps, null)(Viewer);
