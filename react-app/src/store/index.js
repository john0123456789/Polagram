import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { postsReducer } from './posts';
import { commentReducer } from './comments';
import { likesReducer } from './likes';
import { usersReducer } from './users';
import session from './session'
import followersReducer from './followers';

const rootReducer = combineReducers({
  session,
  posts: postsReducer,
  comments: commentReducer,
  likes: likesReducer,
  followers: followersReducer,
  users: usersReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
