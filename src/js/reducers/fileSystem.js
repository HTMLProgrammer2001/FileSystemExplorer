import {
    FILESYSTEM_CHANGE_PATH,
    FILESYSTEM_ADD_FILES,
    FILESYSTEM_DELETE_FILES
} from 'js/actionTypes';

const initialState = {
    activePath: '',
    files: {}
};

//function for finding dir by path
const findPath = (fileSystem, path, recursiveAdd = false) => {
    return path.reduce((a, b) => {
        if(a && !a[b] && recursiveAdd)
            a[b] = {
                isDir: true,
                name: b,
                parent: a,
                files: {}
            };

        if(!a)
            return;

        return a[b];

    }, fileSystem);
};

export default (state = initialState, {type, payload}) => {
    let copy,
        dir;

    switch (type) {
        case FILESYSTEM_CHANGE_PATH:
            return Object.assign({}, state, {
               activePath: payload
            });

        case FILESYSTEM_ADD_FILES:
            copy = Object.assign({}, state);
            //register new files and folders
            payload.forEach((item) => {
                //find path of item
                dir = findPath(copy.files, item.path, true);

                if(!item.isDir)
                    dir.files[item.name] = item;
                else
                    dir.files[item.name] = {
                        isDir: true,
                        name: item.name,
                        parent: dir,
                        files: {}
                    }
            });

        case FILESYSTEM_DELETE_FILES:
            copy = Object.assign({}, state);

            payload.forEach((item) => {
                //find path of item
                dir = findPath(copy.files, item.path);

                //if dir doesn't exist
                if(!dir)
                    return;

                delete dir[item.name];
            });

        default:
            return state;
    }
}