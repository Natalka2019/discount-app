import * as types from '../actionTypes';
import * as helpers from '../helpers';

const initialState = {
  categories: [],
  deleteCategoryStatus: helpers.getDefaultState(),
  addCategoryStatus: helpers.getDefaultState(),
  category: null,
  categoryStatus: helpers.getDefaultState()
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CATEGORY: {
      return {
        ...state,
        addCategoryStatus: helpers.getRequestState()
      };
    }
    case types.ADD_CATEGORY_SUCCESS: {
      const successMessage = 'Action successful!';
      return {
        ...state,
        addCategoryStatus: helpers.getSuccessState(successMessage)
      };
    }
    case types.ADD_CATEGORY_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        addCategoryStatus: helpers.getErrorState(payload)
      };
    }
    case types.CLEAR_ADD_CATEGORY_STATUS: {
      return {
        ...state,
        addCategoryStatus: helpers.getDefaultState()
      };
    }
    case types.UPDATE_CATEGORY_SUCCESS: {
      const { payload } = action;
      const successMessage = 'Action successful!';
      const updateCategories = state.categories.map(
        (el) => {
          if (el.id === payload.id) {
            return payload;
          }
          return el;
        }
      );
      return {
        ...state,
        addCategoryStatus: helpers.getSuccessState(successMessage),
        categories: updateCategories
      };
    }
    case types.GET_CATEGORIES: {
      return {
        ...state,
        categoryStatus: helpers.getRequestState()
      };
    }
    case types.GET_CATEGORIES_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        categoryStatus: helpers.getSuccessState('Action success'),
        categories: payload
      };
    }
    case types.GET_CATEGORIES_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        categoryStatus: helpers.getErrorState(payload),
        categories: payload
      };
    }
    case types.CLEAR_GET_CATEGORIES_STATUS: {
      return {
        ...state,
        categoryStatus: helpers.getDefaultState()
      };
    }
    case types.DELETE_CATEGORY: {
      return {
        ...state,
        deleteCategoryStatus: helpers.getRequestState()
      };
    }
    case types.DELETE_CATEGORY_SUCCESS: {
      const { payload } = action;
      console.log(payload);
      const updatedCategories = state.categories.filter((el) => el.id !== payload);
      console.log(updatedCategories);
      const successMessage = 'Category successfully deleted';
      return {
        ...state,
        categories: updatedCategories,
        deleteCategoryStatus: helpers.getSuccessState(successMessage)
      };
    }
    case types.DELETE_CATEGORY_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        deleteCategoryStatus: helpers.getErrorState(payload)
      };
    }
    case types.CLEAR_DELETE_CATEGORY_STATUS: {
      return {
        ...state,
        deleteCategoryStatus: helpers.getDefaultState()
      };
    }
    default:
      return state;
  }
};

export default categoryReducer;
