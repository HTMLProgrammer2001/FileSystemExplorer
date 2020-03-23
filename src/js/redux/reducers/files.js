const R = require('ramda');

import {
    FILES_ADD,
    FILES_DELETE,
    FILES_RENAME,
    FILES_MOVE
} from '../actionTypes';

import findType from 'js/helpers/findType';
import {getDir} from "js/helpers/fileSelector";

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
                item['type'] = findType(item.type);
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
            path = payload.from.path.split('/').filter((e) => !!e);
            if(payload.from.isDir)
                path.pop();
            dir = getDir(state.value, path);
            //copy file
            copy = R.clone(dir[payload.from.name]);
            //delete old file
            delete dir[payload.from.name];
            //set new file
            copy['name'] = payload.to;
            copy['path'] =
                copy.path.split('/')
                    .filter((e)=>!!e)
                    .slice(0, -1)
                    .join('/') + '/' + payload.to + (copy.isDir ? '/' : '');
            dir[payload.to] = copy;

            return R.clone(state);

        case FILES_MOVE:
            //find file dir
            payload.from.forEach((item) => {
                path = item.path.split('/').filter((e) => !!e);
                if(item.isDir)
                    path.pop();
                dir = getDir(state.value, path);
                //copy file
                copy = R.clone(dir[item.name]);
                //delete old file
                delete dir[item.name];
                //set new file
                copy['path'] =
                    payload.to + (payload.to.endsWith('/') ? '' : '/') + item.name + (item.isDir ? '/' : '');

                //find new path
                dir = getDir(state.value, payload.to.split('/').filter((e) => !!e));
                dir[item.name] = copy;
            });

            return R.clone(state);

        default:
            return state;
    }
}
