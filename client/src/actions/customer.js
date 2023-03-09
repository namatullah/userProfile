import * as api from '../api/customer';
import { ADD_CUSTOMER, DELETE_CUSTOMER, EDIT_CUSTOMER, END_LOADING, FETCH_CUSTOMERS, RESPONSE_MESSAGE, START_LOADING } from "../constants/actionTypes";

export const getCustomers = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchCustomers();
        dispatch({ type: FETCH_CUSTOMERS, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}
export const createCustomer = (customer) => async (dispatch) => {
    dispatch({ type: RESPONSE_MESSAGE, payload: null })
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createCustomer(customer);
        dispatch({ type: RESPONSE_MESSAGE, payload: data.responseMessage })
        dispatch({ type: ADD_CUSTOMER, payload: data.newCustomer });
        dispatch({ type: END_LOADING });
    } catch (error) {
        dispatch({ type: RESPONSE_MESSAGE, payload: error.response.data.responseMessage })
        console.log(error.message);
    }
}
export const updateCustomer = (id, customer) => async (dispatch) => {
    dispatch({ type: RESPONSE_MESSAGE, payload: null })
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.updateCustomer(id, customer);
        dispatch({ type: RESPONSE_MESSAGE, payload: data.responseMessage })
        dispatch({ type: EDIT_CUSTOMER, payload: data.updatedCustomer });
        dispatch({ type: END_LOADING });
    } catch (error) {
        dispatch({ type: RESPONSE_MESSAGE, payload: error.response.data.responseMessage })
        console.log(error.message);
    }
}
export const deleteCustomer = (deletedObj) => async (dispatch) => {
    dispatch({ type: RESPONSE_MESSAGE, payload: null })
    const { id } = deletedObj;
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.deleteCustomer(id);
        dispatch({ type: RESPONSE_MESSAGE, payload: data.responseMessage })
        dispatch({ type: DELETE_CUSTOMER, payload: id });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}
