class ViewerText extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            content: '',
            loaded: false
        }
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
            <div className="d-flex justify-content-center border p-3 file-content">
                <div
                    style = {{maxWidth: '100%'}}>
                    <pre style={{wordWrap: 'break-word', display: 'inline'}}>
                        {this.state.content || 'Empty file'}
                    </pre>
                </div>
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
}

export default ViewerText;