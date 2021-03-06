import axios from 'axios';
import * as actionTypes from '../../constants/actionTypes';
import { ARTICLE_LIST_URL } from '../../services/api';

export const fetchListSuccess = (response) => {
  // console.log(response)
  return {
    type: actionTypes.FETCH_LIST_SUCCESS,
    payload: response,
  };
};


export const fetchListFailed = (bool) => {
  return {
    type: actionTypes.FETCH_LIST_FAILED,
    payload: bool,
  };
};


export const ListIsLoading = (bool) => {
  return {
    type: actionTypes.LIST_IS_LOADING,
    payload: bool,
  };
};

const getToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return { headers: { Authorization: `Token ${token}` } };
  }
  return {};
};

export const fetchList = (url = `${ARTICLE_LIST_URL}/`) => {
  return (dispatch) => {
    dispatch(ListIsLoading(true));
    const token = getToken();
    axios.get(url, token)
      .then((response) => {
        dispatch(fetchListSuccess(response))
      })
      .catch(
        (error) => dispatch(fetchListFailed(true))
    );
  };
};



export const setIgnoreLastFetch = (bool) => {
  return {
    type: actionTypes.SET_IGNORE_LAST_FETCH,
    payload: bool,
  };
};


export const resetList = () => {
  return {
    type: actionTypes.RESET_LIST,
  };
};

