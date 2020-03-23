import {
    CHANGE_PATH,
    CHANGE_ACTIVE_ITEM
} from '../actionTypes';

let expPath = new URL(location.href).searchParams.get('path');

const initialState = {
    path: expPath || './',
    item: null
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case CHANGE_PATH:
            return Object.assign({}, state, {
                path: payload
            });

        case CHANGE_ACTIVE_ITEM:
            return Object.assign({}, state, {
                item: payload
            });

        default:
            return state;
    }
}
