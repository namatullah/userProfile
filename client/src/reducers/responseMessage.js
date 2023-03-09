import {RESPONSE_MESSAGE} from '../constants/actionTypes';

const responseMessage = (state = {responseMessage: {type: '', message:''}}, action) => {
    if (action.type === RESPONSE_MESSAGE) {
        return {...state, responseMessage: action.payload};
    } else {
        return state;
    }
}
export default responseMessage;
