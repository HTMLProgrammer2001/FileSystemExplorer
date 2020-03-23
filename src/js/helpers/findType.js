export default function findType(ext){
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
                return e.findStr.find( (str) => ext === str);

            return ext === e.findStr;
        }) || typeImages.pop();

    return fileType.type;
}
