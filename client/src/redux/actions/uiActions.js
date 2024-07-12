import { TOGGLE_SIDEBAR, SELECT_CONVO, CURRENT_CONVO } from './actionTypes';

export const toggleSidebar = () => ({
    type: TOGGLE_SIDEBAR
});

export const selectConvo = (convoId) => ({
    type: SELECT_CONVO,
    payload: convoId,
});

export const currentConvo= (convoId) => ({
    type: CURRENT_CONVO,
    payload: convoId,
});