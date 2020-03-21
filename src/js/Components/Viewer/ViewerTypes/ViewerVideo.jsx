function ViewerVideo(props){
    return (
        (<div className="d-flex justify-content-center p-3 file-content">
            <video
                src = {'http://explorer/dist/php/file.php?path=' + props.path}
                style = {{maxWidth: '100%'}}
                controls>
                Video from {props.path}
            </video>
        </div>)
    );
}

export default ViewerVideo;