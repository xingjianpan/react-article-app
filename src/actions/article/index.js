import axios from 'axios';
import { browserHistory } from 'react-router';
import * as actionTypes from '../../constants/actionTypes';
import { ARTICLE_LIST_URL } from '../../services/api';

export const fetchItemSuccess = (response) => {
  // console.log(response)
  return {
    type: actionTypes.FETCH_ITEM_SUCCESS,
    payload: response,
  };
};

export const fetchItemFailed = (bool) => {
  return {
    type: actionTypes.FETCH_ITEM_FAILED,
    payload: bool,
  };
};


export const ItemIsLoading = (bool) => {
  return {
    type: actionTypes.ITEM_IS_LOADING,
    payload: bool,
  };
};

export const fetchItem = (id) => {
  return (dispatch) => {
    dispatch(ItemIsLoading(true));
    axios.get(`${ARTICLE_LIST_URL}/${id}/`)
      .then(response => dispatch(fetchItemSuccess(response)))
      .catch(() => dispatch(fetchItemFailed(true)));
  };
};

