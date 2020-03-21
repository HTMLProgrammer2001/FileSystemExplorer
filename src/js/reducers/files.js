const R = require('ramda');

import {
    FILES_ADD,
    FILES_DELETE,
    FILES_RENAME
} from 'js/actionTypes';

import {getDir} from "js/fileSelector";

const initialState = {
    value: {}
};

export default (state = initialState, {type, payload}) => {
    let dir,
        path,
        copy;

    switch (type) {
        case FILES_ADD:
            //link on the directory object
            dir = getDir(state.value, payload.path);

            payload.value.forEach((item) => {
                dir[item.name] = item;

                if(item.isDir)
                    dir[item.name]['files'] = {};
            });

            return R.clone(state);

        case FILES_DELETE:
            //loop each file
            payload.forEach((item) => {
                path = item.path.split('/').filter((e) => !!e);
                //get parent dir of directory item
                if(item.isDir)
                    path.pop();
                //get link on the dir
               dir = getDir(state.value, path);
               delete dir[item.path.split('/').filter((e) => e).pop()];
            });

            return R.clone(state);

        case FILES_RENAME:
            //find file dir
            path = payload.from.split('/').filter((e) => !!e);
            dir = getDir(state.value, path);
            //copy file
            copy = R.clone(dir[path.reverse()[0]]);
            //delete old file
            delete dir[path[0]];
            //set new file
            copy['name'] = payload.to;
            dir[payload.to] = copy;

            return R.clone(state);

        default:
            return state;
    }
}
