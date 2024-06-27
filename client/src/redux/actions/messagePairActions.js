import axios from 'axios';
import { FETCH_MESSAGE_PAIRS, ADD_MESSAGE_PAIR } from './actionTypes';

export const fetchMessagePairs = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('/api/messagepairs');
            dispatch({
                type: FETCH_MESSAGE_PAIRS,
                payload: response.data,
            });
        } catch (error) {
            console.error('Failed to fetch message pairs:', error);
        }
    };
};

export const addMessagePair = (messagePair) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('/api/messagepairs', messagePair);
            dispatch({
                type: ADD_MESSAGE_PAIR,
                payload: response.data,
            });
        } catch (error) {
            console.error('Failed to add message pair:', error);
        }
    };
};
