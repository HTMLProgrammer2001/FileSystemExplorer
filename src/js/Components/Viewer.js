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

        this.state = {
            path: null,
            type: null
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

                    {viewState.path ? <ViewContent path = {viewState.path}/> : ''}

                    {
                        viewState.path ?
                            <div className="d-flex justify-content-center">

                                <a href={viewState.path} download target="_blank" className="w-100">
                                    <div className="btn btn-primary btn-block mt-3">

                                        <i className="fas fa-download mx-2"></i>
                                        <span>Download</span>

                                    </div>
                                </a>

                            </div>
                        :
                            ''
                    }

                </div>
            </div>
        );
    }

    activeFile(path, type){
        console.log(path + ':' + type);
        this.setState({
            path,
            type
        })
    }
}

export default Viewer;