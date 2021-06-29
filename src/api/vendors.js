import axios from './axiosClient';

export const addVendor = (data) => axios.post(`/vendors`, data);

export const updateVendor = (data) => axios.put(`/vendors/${data.id}`, data);

export const deleteVendor = (id) => axios.delete(`/vendors/${id}`);

export const getVendors = () => {
  console.log('Get Vendors!'); // temporary to check flow
  return axios.get('/vendors');
};

export const getVendorById = (id) => axios.get(`/vendors/${id}`);
