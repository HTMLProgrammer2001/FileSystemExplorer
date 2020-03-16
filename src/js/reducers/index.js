import {combineReducers} from "redux";

//import my reducers
import select from './selectedFiles';
import files from './files';

export default combineReducers({
   select,
    files
});