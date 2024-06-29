import { TOGGLE_SIDEBAR, SELECT_CONVO } from './actionTypes';

export const toggleSidebar = () => ({
    type: TOGGLE_SIDEBAR
});

export const selectConvo = (convoId) => ({
    type: SELECT_CONVO,
    payload: convoId,
})