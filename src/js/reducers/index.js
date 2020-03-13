import {combineReducers} from "redux";

//import my reducers
import select from './selectedFiles';
import fileSystem from './fileSystem';

export default combineReducers({
   select,
    fileSystem
});