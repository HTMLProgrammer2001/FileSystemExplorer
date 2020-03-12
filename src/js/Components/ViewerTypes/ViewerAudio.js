function ViewerAudio(props){
    return (
        (<div className="d-flex justify-content-center p-3 file-content">
            <audio
                src = {props.path}
                style = {{maxWidth: '100%'}}
                controls>
                Audio from {props.path}
            </audio>
        </div>)
    );
}

export default ViewerAudio;