class ViewerText extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            content: ''
        }
    }

    componentDidMount(){
        console.log(this.props.path);

        fetch('http://explorer/dist/php/file.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            'mode': 'cors',
            body: 'path=' + this.props.path
        })
            .then(
                res => res.text()
            )
            .then(fileContent => {

                this.setState( (prev) => {
                    //save folder content
                    return Object.assign({}, prev, {content: fileContent});
                });

            });
    }

    render(){
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
}

export default ViewerText;