import {combineReducers} from "redux";

//import my reducers
import select from './select';
import files from './files';
import active from './active';

export default combineReducers({
    select,
    files,
    active
});
