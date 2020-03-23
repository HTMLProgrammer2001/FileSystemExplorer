import {
    SELECT_TOGGLE_MODE,
    SELECT_CLEAR,
    SELECT_TOGGLE_FILE
} from '../actionTypes';

const initialState = {
    selectMode: false,
    selectedFiles: []
};

export default (state = initialState, {type, payload}) => {
    let copy,
        index;

    switch (type) {
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
            index = state.selectedFiles.findIndex((item) => item.path === payload.path);
            if(!~index)
                copy = Object.assign({}, state, {
                    selectedFiles: [...state.selectedFiles, payload]
                });
            else
                copy = Object.assign({}, state, {
                   selectedFiles: [
                       ...state.selectedFiles.slice(0, index),
                       ...state.selectedFiles.slice(index + 1),
                   ]
                });

            if(!copy.selectedFiles.length)
                copy.selectMode = false;

            return copy;

        default:
            return state;
    }
}
