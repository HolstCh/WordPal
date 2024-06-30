import { combineReducers } from 'redux';
import conversationReducer from './conversationReducer';
import uiReducer from './uiReducer';


const rootReducer = combineReducers({
    conversationState: conversationReducer,
    uiState: uiReducer,
});

export default rootReducer;