import axios from './axiosClient';

export const getDiscounts = () => axios.get('/discounts');

export const getDiscountsById = (id) => axios.get(`/discounts/${id}`);

export const createDiscount = (data) => axios.post('/discounts', data);

export const updateDiscount = (data) => axios.put(`/discounts/${data.id}`, data);
