import * as types from '../actionTypes';
import * as helpers from '../helpers';

const initialState = {
  locationsList: [],
  selectedLocation: {},
  createdLocation: {},
  countries: [],
  cities: [],
  getLocationsStatus: helpers.getDefaultState(),
  getLocationByIdStatus: helpers.getDefaultState(),
  getCountriesStatus: helpers.getDefaultState(),
  getCitiesStatus: helpers.getDefaultState(),
  createLocationStatus: helpers.getDefaultState(),
  getCoordinatesStatus: helpers.getDefaultState()
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LOCATIONS_LIST: {
      return {
        ...state,
        getLocationsStatus: helpers.getRequestState()
      };
    }
    case types.GET_LOCATIONS_LIST_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        locationsList: payload.content,
        getLocationsStatus: helpers.getSuccessState(payload)
      };
    }
    case types.GET_LOCATIONS_LIST_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        getLocationsStatus: helpers.getErrorState(payload)
      };
    }
    case types.CLEAR_LOCATIONS_DATA: {
      return {
        ...state,
        locationsList: []
      };
    }
    case types.GET_LOCATION_BY_ID: {
      return {
        ...state,
        getLocationByIdStatus: helpers.getDefaultState()
      };
    }
    case types.GET_LOCATION_BY_ID_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        selectedLocation: payload,
        getLocationByIdStatus: helpers.getSuccessState(payload)
      };
    }
    case types.GET_LOCATION_BY_ID_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        getLocationByIdStatus: helpers.getErrorState(payload)
      };
    }
    case types.GET_COUNTRIES: {
      return {
        ...state,
        getCountriesStatus: helpers.getRequestState()
      };
    }
    case types.GET_COUNTRIES_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        countries: payload,
        getCountriesStatus: helpers.getSuccessState(payload)
      };
    }
    case types.GET_COUNTRIES_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        getCountriesStatus: helpers.getErrorState(payload)
      };
    }
    case types.CLEAR_GET_COUNTRIES_STATUS: {
      return {
        ...state,
        getCountriesStatus: helpers.getRequestState()
      };
    }
    case types.GET_CITIES: {
      return {
        ...state,
        getCitiesStatus: helpers.getRequestState()
      };
    }
    case types.GET_CITIES_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        cities: payload,
        getCitiesStatus: helpers.getSuccessState(payload)
      };
    }
    case types.GET_CITIES_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        getCitiesStatus: helpers.getErrorState(payload)
      };
    }
    case types.CLEAR_GET_CITIES_STATUS: {
      return {
        ...state,
        getCitiesStatus: helpers.getRequestState()
      };
    }
    case types.CREATE_LOCATION: {
      return {
        ...state,
        createLocationStatus: helpers.getRequestState()
      };
    }
    case types.CREATE_LOCATION_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        createdLocation: payload.data,
        createLocationStatus: helpers.getSuccessState('Success!')
      };
    }
    case types.CREATE_LOCATION_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        createLocationStatus: helpers.getErrorState(payload)
      };
    }
    case types.CLEAR_CREATE_LOCATION_STATUS: {
      return {
        ...state,
        createLocationStatus: helpers.getDefaultState()
      };
    }
    case types.GET_COORDINATES: {
      return {
        ...state,
        getGeocodeStatus: helpers.getRequestState()
      };
    }
    default:
      return state;
  }
};

export default locationReducer;
