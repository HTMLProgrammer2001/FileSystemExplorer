class Folder extends React.Component{
    constructor(props){
        super(props);

        //Check and uncheck folder
        this.checkFold = this.checkFold.bind(this);
    }

    checkFold(e){

        this.props.is_checked ?
            this.props.Listener({path: null, isDir: false}, e)
                :
            this.props.Listener({path: this.props.name, isDir: true}, e);
    }

    render(){
        let className = (this.props.is_checked ? 'active ' : '') + 'd-flex justify-content-between pointer list-group-item list-group-item-action';

        return (
            <a href={'?path=' + this.props.path} onClick={(e) => e.preventDefault()} className='link'>
                <div
                onClick = {
                    (e) => this.checkFold(e)
                } className={
                    className
                }>
                    <i className="fas fa-folder mr-2"></i>
                    <div className = "mr-5">{this.props.name}</div>
                    <i className="fas fa-sort-down fa-rotate-270"></i>
                </div>
            </a>
        );
    }
}

export default Folder;