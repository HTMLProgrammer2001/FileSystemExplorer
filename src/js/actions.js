import {
    SELECT_TOGGLE_FILE,
    SELECT_TOGGLE_MODE
} from './actionTypes';

export const toggleSelect = () => (dispatch) => {
    dispatch({type: SELECT_TOGGLE_MODE});
};

export const toggleFile = (path) => (dispatch) => {
  dispatch({type: SELECT_TOGGLE_FILE, payload: path});
};