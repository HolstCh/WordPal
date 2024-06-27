import { FETCH_MESSAGE_PAIRS, ADD_MESSAGE_PAIR } from '../actions/actionTypes';

const initialState = {
    messagePairs: [],
};

const messagePairReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MESSAGE_PAIRS:
            return {
                ...state,
                messagePairs: action.payload,
            };
        case ADD_MESSAGE_PAIR:
            return {
                ...state,
                messagePairs: [...state.messagePairs, action.payload],
            };
        default:
            return state;
    }
};

export default messagePairReducer;
