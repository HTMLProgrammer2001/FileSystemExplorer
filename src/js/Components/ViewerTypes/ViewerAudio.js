function ViewerAudio(){
    return (
        (<div className="d-flex justify-content-center p-3 file-content">
            <audio
                src = {this.props.path}
                style = {{maxWidth: '100%'}}
                controls>
                Audio from {this.props.path}
            </audio>
        </div>)
    );
}

export default ViewerAudio;