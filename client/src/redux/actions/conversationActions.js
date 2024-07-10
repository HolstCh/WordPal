import axios from 'axios';
import { FETCH_CONVERSATIONS, ADD_CONVERSATION, FETCH_CONVERSATION_MESSAGES, ADD_MESSAGE, PIN_MESSAGE, UNPIN_MESSAGE, FETCH_PINNED_MESSAGES } from './actionTypes';

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
            const response = await axios.get(`/api/conversation/${conversationId}`);
            dispatch({
                type: FETCH_CONVERSATION_MESSAGES,
                payload: { conversationId, messages: response.data.messages},
            });
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    };
};

export const addMessage = (conversationId, message) => {
    return async (dispatch) => {
        try
        {
            const response = await axios.post(`/api/message`, message);
            dispatch({
                type: ADD_MESSAGE,
                payload: { conversationId, message: response.data },
            });
        }
        catch (error)
        {
            console.error('Failed to add message:', error);
        }
    };
};

export const pinMessage = (conversationId, messageId) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`/api/conversation/${conversationId}/pin/${messageId}`, null, null);
            console.log(response.data);
            dispatch({
                type: PIN_MESSAGE,
                payload: { conversationId, messageId }
            });
        } catch (error) {
            console.error('Failed to pin message:', error);
        }
    };
};

export const unpinMessage = (conversationId, messageId) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`/api/conversation/${conversationId}/unpin/${messageId}`, null, null);
            console.log(response.data);
            dispatch({
                type: UNPIN_MESSAGE,
                payload: { conversationId, messageId }
            });
        } catch (error) {
            console.error('Failed to unpin message:', error);
        }
    };
};


export const fetchPinnedMessages = (conversationId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/conversations/${conversationId}/pinned`);
            dispatch({ type: FETCH_PINNED_MESSAGES, payload: { conversationId, messages: response.data } });
        }
        catch (error) {
            console.error('Failed to fetch pinned messages:', error);
        }
    }
};
