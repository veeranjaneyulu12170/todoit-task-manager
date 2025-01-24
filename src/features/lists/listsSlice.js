import { createSlice } from '@reduxjs/toolkit';

const loadListsFromStorage = () => {
  try {
    const storedLists = localStorage.getItem('lists');
    return storedLists ? JSON.parse(storedLists) : [];
  } catch (error) {
    console.error('Error loading lists from localStorage:', error);
    return [];
  }
};

const saveListsToStorage = (lists) => {
  try {
    localStorage.setItem('lists', JSON.stringify(lists));
  } catch (error) {
    console.error('Error saving lists to localStorage:', error);
  }
};

const initialState = {
  lists: loadListsFromStorage(),
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, action) => {
      state.lists.push(action.payload);
      saveListsToStorage(state.lists);
    },
    removeList: (state, action) => {
      state.lists = state.lists.filter(list => list.id !== action.payload);
      saveListsToStorage(state.lists);
    },
    updateList: (state, action) => {
      const index = state.lists.findIndex(list => list.id === action.payload.id);
      if (index !== -1) {
        state.lists[index] = action.payload;
        saveListsToStorage(state.lists);
      }
    },
  },
});

export const { addList, removeList, updateList } = listsSlice.actions;
export default listsSlice.reducer; 