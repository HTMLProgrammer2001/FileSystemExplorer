import Folder from './Folder';
import File from './File';

class FolderPlace extends React.Component{
    constructor(props){
        super(props);

        //Listener on files and folders
        this.openListener = this.openListener.bind(this);

        //ref on folder
        this.ref = React.createRef();

        this.state = {
            //active element
            open: {
                path: null,
                isDir: false
            },
            //scroll
            scrollTop: 0,
            //Folder content
            files: []
        }
    }

    //Load files
    componentDidMount() {
        console.log(this.props.path);

        fetch('tree.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'path=' + this.props.path
        })
            .then(
            res => res.json()
            )
            .then(folderContent => {
                console.log(folderContent);

                this.setState( (prev) => {
                    //save folder content
                    return Object.assign({}, prev, {files: folderContent});
                });

        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //scroll
        if( this.ref.current.scrollHeight <= this.ref.current.clientHeight )
            this.ref.current.style.overflowY = 'hidden';
        else
            this.ref.current.scrollTop = this.state.scrollTop;
    }

    render(){
        let path = this.props.path,
            state = this.state,
            _this = this;

        return (
            <React.Fragment key={Math.round(Math.random()*100)}>

                <div className='folder mt-3 border' ref = {this.ref}>
                    <div className='pr-0 list-group'>
                        {
                            !state.files.length ? <div className="list-group-item border-0">Empty folder</div>
                                :
                            [].map.call(state.files, function(item, index){
                                return item.is_Folder ?
                                    <Folder
                                        name = {item.name}
                                        path = {path + item.name + '/'}
                                        key = {index}
                                        Listener = {_this.openListener}
                                        is_checked = {state.open.path == item.name}/>
                                            :
                                    <File
                                        name = {item.name}
                                        path = {path + item.name}
                                        ext = {item.type}
                                        key = {index}
                                        Listener = {_this.openListener}
                                        is_checked = {state.open.path == item.name}/>;
                        })}
                    </div>
                </div>

                {(state.open.path && state.open.isDir) ? <FolderPlace path={path + state.open.path + '/'}/> : ''}

            </React.Fragment>
        );
    }

    openListener(open, event) {

        let elem = event.currentTarget.parentElement.parentElement;

        //save open path and scroll
        this.setState((prev) => {
            return Object.assign({}, prev, {
                open: open,
                scrollTop: elem.scrollTop
            })
        });
    }
}

export default FolderPlace;