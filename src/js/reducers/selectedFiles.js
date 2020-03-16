import {
    SELECT_TOGGLE_MODE,
    SELECT_CLEAR,
    SELECT_TOGGLE_FILE,
    CHANGE_PATH
} from 'js/actionTypes';

let expPath = new URL(location.href).searchParams.get('path');

const initialState = {
    selectMode: false,
    selectedPath: expPath || './',
    selectedFiles: []
};

export default (state = initialState, {type, payload}) => {
    let copy;

    switch (type) {
        case CHANGE_PATH:
            return Object.assign({}, state, {
                selectedPath: payload
            });

        case SELECT_TOGGLE_MODE:
            return Object.assign({}, state, {
                selectMode: !state.selectMode,
                selectedFiles: []
            });

        case SELECT_CLEAR:
            return Object.assign({}, state, {
                selectedFiles: []
            });

        case SELECT_TOGGLE_FILE:
            if(!~state.selectedFiles.indexOf(payload))
                copy = Object.assign({}, state, {
                    selectedFiles: [...state.selectedFiles, payload]
                });
            else
                copy = Object.assign({}, state, {
                   selectedFiles: [
                       ...state.selectedFiles.slice(0, state.selectedFiles.indexOf(payload)),
                       ...state.selectedFiles.slice(state.selectedFiles.indexOf(payload) + 1),
                   ]
                });

            if(!copy.selectedFiles.length)
                copy.selectMode = false;

            return copy;

        default:
            return state;
    }
}