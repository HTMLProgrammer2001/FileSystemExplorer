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
            copy = Object.assign({}, state);
            if(~copy.selectedFiles.indexOf(payload))
                copy.selectedFiles.splice(copy.selectedFiles.indexOf(payload), 1);
            else
                copy.selectedFiles.push(payload);

            if(!copy.selectedFiles.length)
                copy.selectMode = false;

            return copy;

        default:
            return state;
    }
}