class ViewerText extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            content: '',
            loaded: false
        };

        //bind events
        this.onContentChange = this.onContentChange.bind(this);
        this.loadFile = this.loadFile.bind(this);
        this.save = this.save.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    componentDidUpdate(prevProps){
        if(prevProps.path !== this.props.path)
            this.setState({
                content: '',
                loaded: false
            });
    }

    render(){
        if(!this.state.loaded)
            this.loadFile();

        return (
            <div>
                {
                    !this.props.editMode ?
                        <div className="d-flex justify-content-center border p-3 file-content">
                            <div
                                style={{maxWidth: '100%'}}>
                            <pre style={{wordWrap: 'break-word', display: 'inline'}}>
                                {this.state.content || 'Empty file'}
                            </pre>
                            </div>
                        </div>
                        :
                        <div>
                            <textarea cols="30" rows="10"
                                      className="form-control" onChange={this.onContentChange}>
                                {this.state.content}
                            </textarea>

                            <div className="d-flex justify-content-between">
                                <div className="btn btn-danger w-100 m-3"
                                onClick={this.cancelEdit}>
                                    <span>Cancel</span>
                                </div>

                                <div
                                    className="btn btn-primary w-100 m-3"
                                    onClick={this.save}>
                                    <span>Save</span>
                                </div>
                            </div>
                        </div>
                }
            </div>
        );
    }

    async loadFile(){
        let fileContent = await fetch('http://explorer/dist/php/api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            'mode': 'cors',
            body: 'type=getFileContent&path=' + this.props.path
        });

        fileContent = await fileContent.text();

        this.setState({
            content: fileContent,
            loaded: true
        });
    }

    onContentChange(e){
        this.setState({
           content: e.target.value
        });
    }

    async save(){
        await fetch('http://explorer/dist/php/api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            'mode': 'cors',
            body: 'type=saveFileContent&path=' + this.props.path + '&content=' + this.state.content
        });

        this.props.editModeChange();
    }

    cancelEdit(){
        this.loadFile();
        this.props.editModeChange();
    }
}

export default ViewerText;