import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todos/todoSlice';
import authReducer from '../features/auth/authSlice';
import listsReducer from '../features/lists/listsSlice';
import { loadState, saveState } from '../utils/localStorage';
import throttle from 'lodash/throttle';

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    auth: authReducer,
    lists: listsReducer,
  },
  preloadedState,
});

store.subscribe(
  throttle(() => {
    saveState({
      todos: store.getState().todos,
    });
  }, 1000)
); 