import axios from 'axios';
import { FETCH_CONVERSATIONS, FETCH_CONVERSATION_MESSAGES, ADD_MESSAGE } from './actionTypes';

export const fetchConversations = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('/api/conversations');
            dispatch({
                type: FETCH_CONVERSATIONS,
                payload: response.data,
            });
        } catch (error) {
            console.error('Failed to fetch conversations:', error);
        }
    };
};

export const fetchConversationMessages = (conversationId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/api/conversations/${conversationId}/messages`);
            dispatch({
                type: FETCH_CONVERSATION_MESSAGES,
                payload: { conversationId, messages: response.data },
            });
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    };
};

export const addMessage = (conversationId, message) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`/api/conversations/${conversationId}/messages`, message);
            dispatch({
                type: ADD_MESSAGE,
                payload: { conversationId, message: response.data },
            });
        } catch (error) {
            console.error('Failed to add message:', error);
        }
    };
};
