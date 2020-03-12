function ViewerImage(props){
    return (
        <div className="d-flex justify-content-center p-3 file-content">
            <img src = {props.path} style = {{maxWidth: "100%"}}/>
        </div>
    );
}

export default ViewerImage;