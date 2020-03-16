import {
    SELECT_TOGGLE_FILE,
    SELECT_TOGGLE_MODE,
    CHANGE_PATH,
    FILES_ADD,
    FILES_DELETE, SELECT_CLEAR
} from './actionTypes';

export const toggleSelect = () => (dispatch) => {
    dispatch({type: SELECT_TOGGLE_MODE});
};

export const toggleFile = (path) => (dispatch) => {
  dispatch({type: SELECT_TOGGLE_FILE, payload: path});
};

export const clearSelect = () => (dispatch) => {
  dispatch({type: SELECT_CLEAR});
};

export const changePath = (path) => (dispatch) => {
  dispatch({type: CHANGE_PATH, payload: path});
};

export const addFiles = (payload) => (dispatch) => {
    dispatch({type: FILES_ADD, payload})
};

export const deleteFiles = (payload) => (dispatch) => {
  dispatch({type: FILES_DELETE, payload});
  dispatch({type: SELECT_CLEAR});
  dispatch({type: SELECT_TOGGLE_MODE});
};