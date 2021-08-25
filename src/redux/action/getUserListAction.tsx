import Constants from '../constants';
import { requestStarted, requestCompleted } from './appAction';
import api from '../../utils/api';

const axios = require('axios');

const _ = require('lodash');

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

export const getUserListAction = (searchText, page, users) => (dispatch, getState) => {


  console.log('getUserListAction: searchText: ', searchText);
  console.log('getUserListAction: page: ', page);
  console.log('getUserListAction:1*** users: ', users);
  if (searchText.length > 0) {

    // Using the _.filter() method
    // The `_.matches` iteratee shorthand
    let filtered_array = _.filter(users,
      {
        'name': {
          'first': searchText
        }
      }
    );

    console.log('getUserListAction:11 users: ', users);
    console.log('getUserListAction:11 filtered_array: ', filtered_array);
    dispatch(
      getCharacterListSuccess(filtered_array),
    );
    return;
  }

  dispatch(getCharacterListPending());
  dispatch(requestStarted());

  axios({
    method: 'get',
    url: api.baseUrl + 'api/?page=' + page + '&results=' + page * 10,

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
