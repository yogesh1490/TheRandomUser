import Constant from '../constants';

const initialState = {
  getUserListData: [],
  getUserListError: null,
  isLoading: false,
};

const getUserListReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constant.GET_USER_LIST_SUCCESS:
      return {
        getUserListData: action.payload,
        getUserListError: null,
        isLoading: false,
      };
    case Constant.GET_USER_LIST_FAILED:
      return {
        getUserListData: [],
        // getUserListError: action.payload,
        getUserListError: [...state.getPicturesListData, ...action.payload],
        isLoading: false,
      };
    case Constant.GET_USER_LIST_PENDING:
      return {
        getUserListData: [],
        getUserListError: null,
        isLoading: true,
      };
    case Constant.RESET_STORE:
      return {
        getUserListData: [],
        getUserListError: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default getUserListReducer;
