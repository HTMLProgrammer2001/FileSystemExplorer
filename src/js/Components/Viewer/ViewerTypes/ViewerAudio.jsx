function ViewerAudio(props){
    return (
        (<div className="d-flex justify-content-center p-3 file-content">
            <audio
                src = {'http://explorer/dist/php/file.php?path=' + props.path}
                style = {{maxWidth: '100%'}}
                controls>
                Audio from {props.path}
            </audio>
        </div>)
    );
}

export default ViewerAudio;