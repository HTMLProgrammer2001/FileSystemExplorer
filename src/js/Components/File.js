import ItemHOC from 'js/ItemHOC';

class File extends React.Component{
    constructor(props){
        super(props);

        this.findType = this.findType.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }

    render(){
        let className = (this.props.is_checked ? "active " : '') + "d-flex justify-content-between w-100 pointer list-group-item list-group-item-action",
            icons = {
                audio: 'far fa-file-audio',
                image: 'far fa-image',
                film: 'fas fa-film',
                text: 'far fa-file-alt',
                pdf: 'far fa-file-pdf',
                archive: 'far fa-file-archive',
                unknown: 'fas fa-file-download'
            },
            iconClass = icons[this.findType(this.props.ext.toLowerCase())];

        return (
            <div
                className={className}
                onClick={this.clickHandler}>

                    <i className={iconClass}></i>

                    <div className="ml-3">
                        {this.props.name}
                    </div>

                    <div></div>
            </div>
        );
    }

    clickHandler(e){
        !this.props.is_checked ? activeFile(this.props.path, this.findType(this.props.ext)) : activeFile(null, null);

        this.props.Listener({
            path: this.props.is_checked ? null : this.props.name,
            isDir: false
        }, e);
    }

    findType(ext){
        let typeImages = [{
                type: 'image',
                findStr: ['png', 'bmp', 'jpg', 'jpeg']
            },
                {
                    type: 'video',
                    findStr: ['mp4', 'avi', 'mpeg']
                },
                {
                    type: 'text',
                    findStr: ['txt', 'html', 'xml', 'php', 'js', 'css', 'scss', 'jsx', 'py', 'json']
                },
                {
                    type: 'pdf',
                    findStr: 'pdf'
                },
                {
                  type: 'audio',
                  findStr: ['mp3', 'ogg', 'wav']
                },
                {
                    type: 'archive',
                    findStr: ['zip', 'rar', 'tar']
                },
                {
                    type: 'unknown',
                    findStr: ''
                }
            ],

            fileType = typeImages.find( (e) => {
                if(Array.isArray(e.findStr))
                    return e.findStr.find( (str) => ext == str);

                return ext == e.findStr;
            }) || typeImages.pop();

        return fileType.type;
    }
}

export default ItemHOC(File);