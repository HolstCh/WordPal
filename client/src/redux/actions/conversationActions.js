import axios from 'axios';
import { FETCH_CONVERSATIONS, ADD_CONVERSATION, FETCH_CONVERSATION_MESSAGES, ADD_MESSAGE } from './actionTypes';

export const fetchConversations = (userId) => {
    return async (dispatch) => {
        try
        {
            const response = await axios.get(`https://localhost:7204/api/conversation/user/${userId}`);
            dispatch({
                type: FETCH_CONVERSATIONS,
                payload: response.data,
            });
        }
        catch (error)
        {
            console.error('Error: Failed to fetch user conversations:', error);
        }
    };
};

export const addConversation = (userId) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('/api/conversation', {
                userId: userId,
                startedAt: new Date().toISOString().slice(0, -1),
                endedAt: new Date().toISOString().slice(0, -1),
                messages: [],
            });
            dispatch({
                type: ADD_CONVERSATION,
                payload: response.data,
            });
        }
        catch (error) {
            console.error('Error creating conversation:', error);
        }
    }
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
