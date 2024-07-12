import { TOGGLE_SIDEBAR, SELECT_CONVO, CURRENT_CONVO, TOGGLE_TYPING } from '../actions/actionTypes';

const initialState = {
    isSidebarOpen: false,
    selectedConvoId: 0,
    isModelTyping: false,
    currentConvoId: 0,
};

const uiReducer = (state = initialState, action) => {
    switch (action.type)
    {
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                isSidebarOpen: !state.isSidebarOpen,
                selectedConvoId: state.selectedConvoId,
            };
        case SELECT_CONVO:
            return {
                ...state,
                isSidebarOpen: state.isSidebarOpen,
                selectedConvoId: action.payload,
            };
        case CURRENT_CONVO:
            return {
                ...state,
                isSidebarOpen: state.isSidebarOpen,
                currentConvoId: action.payload,
            };
        default:
            return state;
    }
};

export default uiReducer;