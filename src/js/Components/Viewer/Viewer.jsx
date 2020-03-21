//import types
import Text from './ViewerTypes/ViewerText';
import Video from './ViewerTypes/ViewerVideo';
import Audio from './ViewerTypes/ViewerAudio';
import Image from './ViewerTypes/ViewerImage';
import Unknown from './ViewerTypes/ViewerUnknown';

class Viewer extends React.Component{
    constructor(props){
        super(props);

        window.activeFile = this.activeFile.bind(this);
        this.editModeChange = this.editModeChange.bind(this);

        this.state = {
            path: null,
            type: null,
            editMode: false
        }
    }

    render(){
        let viewState = this.state,
            ViewContent = Unknown;

        if(viewState.type == 'image')
            ViewContent = Image;
        else if(viewState.type == 'video')
            ViewContent = Video;
        else if(viewState.type == 'text')
            ViewContent = Text;
        else if(viewState.type == 'audio')
            ViewContent = Audio;

        return (
            <div className="d-flex justify-content-center">
                <div className="col-sm-8 mt-4" id="file_picker">

                    {viewState.path ? <ViewContent
                        path = {viewState.path}
                        editModeChange = {this.editModeChange}
                        editMode = {this.state.editMode}/> : ''}

                    {
                        viewState.path && !this.state.editMode ?
                            <div className="d-flex justify-content-between">

                                <a href={'http://explorer/dist/php/file.php?path=' + viewState.path} download target="_blank" className="w-100 m-3">
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

    activeFile(path, type){
        this.setState({
            path,
            type
        })
    }

    editModeChange(){
        this.setState((prev) => ({
          editMode: !prev.editMode
        }));
    }
}

export default Viewer;