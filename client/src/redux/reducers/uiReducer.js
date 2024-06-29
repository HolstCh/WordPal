import { TOGGLE_SIDEBAR, SELECT_CONVO } from '../actions/actionTypes';

const initialState = {
    isSidebarOpen: false,
    selectedConvoId: 0,
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
        default:
            return state;
    }
};

export default uiReducer;