import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducers';
import notificationReducer from './notification_reducers';
import articleListReducer from './article_list_reducers';
import articleItemReducer from './article_item_reducers';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  notifications: notificationReducer,
  routing: routerReducer,
  articleList: articleListReducer,
  articleItem: articleItemReducer,
});

export default rootReducer;
