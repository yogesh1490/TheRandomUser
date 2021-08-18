import Constants from '../constants';
import {requestStarted, requestCompleted} from './appAction';
import api from '../../utils/api';

const axios = require('axios');

const getCharacterListSuccess = data => dispatch => {
  dispatch({
    type: Constants.GET_USER_LIST_SUCCESS,
    payload: data,
  });
};

const getCharacterListFailure = error => dispatch => {
  dispatch({
    type: Constants.GET_USER_LIST_FAILED,
    payload: error,
  });
};

const getCharacterListPending = () => dispatch => {
  dispatch({
    type: Constants.GET_USER_LIST_PENDING,
  });
};

export const getUserListAction = (searchText,page) => (dispatch, getState) => {
  dispatch(getCharacterListPending());
  dispatch(requestStarted());

  console.log('getUserListAction: searchText: ', searchText);
  console.log('getUserListAction: page: ', page);

  axios({
    method: 'get',
    url: api.baseUrl + 'api/?page='+page+'&results='+page *10+'&name='+searchText,

    data: {},
  })
    .then(function (response) {
      console.log('getUserListAction: response:', response);

      dispatch(
        getCharacterListSuccess(response.data !== undefined ? response.data.results : []),
      );

      dispatch(requestCompleted());
    })
    .catch(function (error) {
      console.log('getUserListAction: error: ', error);
      dispatch(requestCompleted());
      dispatch(getCharacterListFailure(error));
    });
};
