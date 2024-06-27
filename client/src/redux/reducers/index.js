import { combineReducers } from 'redux';
import conversationReducer from './conversationReducer';
import uiReducer from './uiReducer';
import messagePairReducer from './messagePairReducer'


const rootReducer = combineReducers({
    conversationState: conversationReducer,
    uiState: uiReducer,
    messagePairState: messagePairReducer,
});

export default rootReducer;