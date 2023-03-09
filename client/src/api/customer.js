import API from "./index";

export const fetchCustomers = () => API.get('/customers');
export const createCustomer = (customer) => API.post('/customers', customer);
export const updateCustomer = (id, customer) => API.patch(`/customers/${id}`, customer);
export const deleteCustomer = (id) => API.delete(`/customers/${id}`);
