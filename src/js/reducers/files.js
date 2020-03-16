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
    let dir;

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
                //get link on the dir
               dir = getDir(state.value, item.split('/'));
               delete dir[item.split('/').filter((e) => e).pop()];
            });

            return R.clone(state);

        default:
            return state;
    }
}