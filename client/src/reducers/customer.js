import {
    ADD_CUSTOMER,
    DELETE_CUSTOMER,
    EDIT_CUSTOMER,
    END_LOADING,
    FETCH_CUSTOMERS,
    START_LOADING,
} from '../constants/actionTypes';

const customers = (state = { isLoading: true, customers: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_CUSTOMERS:
            return {
                ...state,
                customers: action.payload.data,
            };
        case ADD_CUSTOMER:
            return { ...state, customers: [...state.customers, action.payload] };
        case EDIT_CUSTOMER:
            return {
                ...state,
                customers: state.customers.map((customer) => customer._id === action.payload._id ? action.payload : customer)
            };
        case DELETE_CUSTOMER:
            return { ...state, customers: state.customers.filter((customer) => customer._id !== action.payload) };
        default:
            return state;
    }
}
export default customers;
