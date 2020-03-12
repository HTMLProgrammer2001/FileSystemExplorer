import {
    SELECT_TOGGLE_MODE,
    SELECT_CLEAR,
    SELECT_TOGGLE_FILE
} from 'js/actionTypes';

const initialState = {
    selectMode: false,
    selectedFiles: []
};

export default (state = initialState, {type, payload}) => {
    let copy;

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