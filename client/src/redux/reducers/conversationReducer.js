import { FETCH_CONVERSATIONS, ADD_CONVERSATION, FETCH_CONVERSATION_MESSAGES, ADD_MESSAGE } from '../actions/actionTypes';

const initialState = {
    conversations: [],
    messages: {},
};

const conversationReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CONVERSATIONS:
            return {
                ...state,
                conversations: action.payload,
            };
        case ADD_CONVERSATION:
            return {
                ...state,
                conversations: [...state.conversations, action.payload],
            };
        case FETCH_CONVERSATION_MESSAGES:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.conversationId]: action.payload.messages,
                },
            };
        case ADD_MESSAGE:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.conversationId]: [
                        ...(state.messages[action.payload.conversationId] || []),
                        action.payload.message,
                    ],
                },
            };
        default:
            return state;
    }
};

export default conversationReducer;
