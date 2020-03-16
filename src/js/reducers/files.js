import {
    FILES_ADD,
    FILES_DELETE,
    FILES_RENAME
} from 'js/actionTypes';

const initialState = {
    files: {}
};

const getDir = (files, path) => {
    return path.reduce((a, b, i, arr) => {
        if(!a[b])
            a[b] = {
                name: b,
                path: arr.slice(0, i + 1).join('/') + '/',
                isDir: true,
                files: {}
            };

        return a[b].files;
    }, files);
};

export default (state = initialState, {type, payload}) => {
    let dir,
        copy;

    switch (type) {
        case FILES_ADD:
            copy = Object.assign({}, state);
            dir = getDir(copy.files, payload.path);

            payload.files.forEach((item) => {
                dir[item.name] = item;
            });

            return copy;

        default:
            return state;
    }
}