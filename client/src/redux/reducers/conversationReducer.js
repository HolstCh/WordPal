import { FETCH_CONVERSATIONS, ADD_CONVERSATION, FETCH_CONVERSATION_MESSAGES, ADD_MESSAGE, PIN_MESSAGE, UNPIN_MESSAGE, FETCH_PINNED_MESSAGES } from '../actions/actionTypes';

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
            const conversationId = action.payload.conversationId;
            const currentMessages = state.messages[conversationId] || [];
            console.log('current state:', state);
            console.log('conversationId:', conversationId);
            console.log('currentMessages:', currentMessages);
            console.log('action payload:', action.payload);
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [conversationId]: [
                        ...currentMessages,
                        action.payload.message,
                    ],
                },
            };
        case PIN_MESSAGE:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.conversationId]: state.messages[action.payload.conversationId].map(message =>
                        message.id === action.payload.messageId ? { ...message, isPinned: true } : message
                    ),
                },
            };
        case UNPIN_MESSAGE:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.conversationId]: state.messages[action.payload.conversationId].map(message =>
                        message.id === action.payload.messageId ? { ...message, isPinned: false } : message
                    ),
                },
            };
        case FETCH_PINNED_MESSAGES:
            console.log("current state: ", state);
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.conversationId]: action.payload.messages,
                },
            };
        default:
            return state;
    }
};

export default conversationReducer;
