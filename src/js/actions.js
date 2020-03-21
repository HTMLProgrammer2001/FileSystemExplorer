import {
    SELECT_TOGGLE_FILE,
    SELECT_TOGGLE_MODE,
    CHANGE_PATH,
    FILES_ADD,
    FILES_DELETE,
    SELECT_CLEAR,
    FILES_RENAME,
    FILES_MOVE
} from './actionTypes';

export const toggleSelect = () => (dispatch) => {
    dispatch({type: SELECT_TOGGLE_MODE});
};

export const toggleFile = (itemObj) => (dispatch) => {
  dispatch({type: SELECT_TOGGLE_FILE, payload: itemObj});
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

export const renameFile = (payload) => (dispatch) => {
  dispatch({type: FILES_RENAME, payload});
  dispatch({type: SELECT_CLEAR});
  dispatch({type: SELECT_TOGGLE_MODE});
};

export const moveFiles = (payload) => (dispatch) => {
  dispatch({type: FILES_MOVE, payload});
  dispatch({type: SELECT_CLEAR});
  dispatch({type: SELECT_TOGGLE_MODE});
};
