// import axios from 'API';
import vendorsList from '../mockData/VendorsListPage';

export const addVendor = (data) => {
  console.log(data); // temporary to check flow

  return 'Vendor successfully added'; // temporary to check flow
};

export const updateVendor = (data) => {
  console.log(data); // temporary to check flow

  return 'Vendor successfully updated'; // temporary to check flow
};

export const deleteVendor = (id) => {
  console.log(id); // temporary to check flow

  return 'Vendor successfully deleted'; // temporary to check flow
};

export const getVendors = () => {
  console.log('Get Vendors!'); // temporary to check flow

  // return  new Promise(resolve, reject) {
  //   setTimeout
  // }; // temporary to check flow
  return vendorsList; // temporary to check flow
};
