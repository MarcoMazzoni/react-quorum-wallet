import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { AppActions } from '../interfaces/Actions.interface';
import { nodeReducer } from '../reducers/nodes';

export const rootReducer = combineReducers({
  node: nodeReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
);
