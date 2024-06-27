import { TOGGLE_SIDEBAR } from '../actions/actionTypes';

const initialState = {
    isSidebarOpen: false,
};

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                isSidebarOpen: !state.isSidebarOpen,
            };
        default:
            return state;
    }
};

export default uiReducer;