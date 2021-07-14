import * as types from '../actionTypes';

export function getDiscountsList(payload) {
  return {
    type: types.GET_DISCOUNTS,
    payload
  };
}

export function getDiscountsListSuccess(payload) {
  return {
    type: types.GET_DISCOUNTS_SUCCESS,
    payload
  };
}

export function getDiscountsListFailure(payload) {
  return {
    type: types.GET_DISCOUNTS_FAILURE,
    payload
  };
}

export function clearGetDiscountsStatus() {
  return {
    type: types.CLEAR_GET_DISCOUNTS_STATUS
  };
}

export function createDiscount(payload) {
  return {
    type: types.CREATE_DISCOUNT,
    payload
  };
}

export function createDiscountSuccess(payload) {
  return {
    type: types.CREATE_DISCOUNT_SUCCESS,
    payload
  };
}

export function createDiscountFailure(payload) {
  return {
    type: types.CREATE_DISCOUNT_FAILURE,
    payload
  };
}

export function clearCreateDiscountStatus() {
  return {
    type: types.CLEAR_CREATE_DISCOUNT_STATUS
  };
}

export function deleteDiscount(payload) {
  return {
    type: types.DELETE_DISCOUNT,
    payload
  };
}

export function deleteDiscountSuccess(payload) {
  return {
    type: types.DELETE_DISCOUNT_SUCCESS,
    payload
  };
}

export function deleteDiscountFailure(payload) {
  return {
    type: types.DELETE_DISCOUNT_FAILURE,
    payload
  };
}

export function clearDeleteDiscountStatus() {
  return {
    type: types.CLEAR_DELETE_DISCOUNT_STATUS
  };
}

export function updateDiscountsFilters(payload) {
  return {
    type: types.UPDATE_DISCOUNTS_FILTERS,
    payload

  };
}

export function applyDiscountsFilters(payload) {
  return {
    type: types.APPLY_DISCOUNTS_FILTERS,
    payload
  };
}

export function clearDiscountsFilters() {
  return {
    type: types.CLEAR_DISCOUNTS_FILTERS
  };
}

export function getVendorDiscounts(payload) {
  return {
    type: types.GET_VENDOR_DISCOUNTS,
    payload
  };
}
export function getVendorDiscountsSuccess(payload) {
  return {
    type: types.GET_VENDOR_DISCOUNTS_SUCCESS,
    payload
  };
}

export function getVendorDiscountsFailure(payload) {
  return {
    type: types.GET_VENDOR_DISCOUNTS_FAILURE,
    payload
  };
}

export function clearGetVendorDiscountsStatus() {
  return {
    type: types.CLEAR_GET_VENDOR_DISCOUNTS_STATUS
  };
}

export function activateDiscount(payload) {
  return {
    type: types.ACTIVATE_DISCOUNT,
    payload
  };
}

export function activateDiscountSuccess(payload) {
  return {
    type: types.ACTIVATE_DISCOUNT_SUCCESS,
    payload
  };
}

export function activateDiscountFailure(payload) {
  return {
    type: types.ACTIVATE_DISCOUNT_FAILURE,
    payload
  };
}

export function clearActivateDiscountStatus() {
  return {
    type: types.CLEAR_ACTIVATE_DISCOUNT_STATUS
  };
}
