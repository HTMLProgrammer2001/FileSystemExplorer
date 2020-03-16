import {
    SELECT_TOGGLE_FILE,
    SELECT_TOGGLE_MODE,
    CHANGE_PATH
} from './actionTypes';

export const toggleSelect = () => (dispatch) => {
    dispatch({type: SELECT_TOGGLE_MODE});
};

export const toggleFile = (path) => (dispatch) => {
  dispatch({type: SELECT_TOGGLE_FILE, payload: path});
};

export const changePath = (path) => (dispatch) => {
  dispatch({type: CHANGE_PATH, payload: path});
};