import { createSlice } from '@reduxjs/toolkit';

const loadTodosFromStorage = () => {
  try {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  } catch (error) {
    console.error('Error loading todos from localStorage:', error);
    return [];
  }
};

const saveTodosToStorage = (todos) => {
  try {
    localStorage.setItem('todos', JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos to localStorage:', error);
  }
};

const initialState = {
  todos: loadTodosFromStorage(),
  currentView: 'all',
  selectedTask: null,
  searchQuery: '',
  customLists: [],
  loading: false,
  error: null,
  theme: 'dark',
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      saveTodosToStorage(state.todos);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      saveTodosToStorage(state.todos);
    },
    toggleComplete: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        saveTodosToStorage(state.todos);
      }
    },
    toggleImportant: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.important = !todo.important;
        saveTodosToStorage(state.todos);
      }
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
        saveTodosToStorage(state.todos);
      }
    },
    updateTodoPriority: (state, action) => {
      const { id, priority } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.priority = priority;
        saveTodosToStorage(state.todos);
      }
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
      saveTodosToStorage(state.todos);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      saveTodosToStorage(state.todos);
    },
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
      state.searchQuery = '';
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    setDueDate: (state, action) => {
      const { id, date } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.dueDate = date;
        saveTodosToStorage(state.todos);
      }
    },
    setReminder: (state, action) => {
      const { id, reminder } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.reminder = reminder;
        saveTodosToStorage(state.todos);
      }
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    reorderTodos: (state, action) => {
      const { startIndex, endIndex } = action.payload;
      const [removed] = state.todos.splice(startIndex, 1);
      state.todos.splice(endIndex, 0, removed);
    },
    addCustomList: (state, action) => {
      state.customLists.push(action.payload);
      state.currentView = action.payload.id;
    },
    deleteCustomList: (state, action) => {
      state.customLists = state.customLists.filter(list => list.id !== action.payload);
      if (state.currentView === action.payload) {
        state.currentView = 'all';
      }
    },
    addTodoToList: (state, action) => {
      const { listId, todoId } = action.payload;
      const list = state.customLists.find(l => l.id === listId);
      if (list) {
        list.tasks.push(todoId);
      }
    },
    updateCustomList: (state, action) => {
      const index = state.customLists.findIndex(list => list.id === action.payload.id);
      if (index !== -1) {
        state.customLists[index] = action.payload;
      }
    },
    reorderCustomLists: (state, action) => {
      const { startIndex, endIndex } = action.payload;
      const [removed] = state.customLists.splice(startIndex, 1);
      state.customLists.splice(endIndex, 0, removed);
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
  },
});

export const { 
  addTodo, 
  removeTodo, 
  toggleComplete, 
  toggleImportant, 
  updateTodo, 
  updateTodoPriority, 
  setTodos,
  deleteTodo,
  setCurrentView,
  setSelectedTask,
  setDueDate,
  setReminder,
  setSearchQuery,
  reorderTodos,
  addCustomList,
  deleteCustomList,
  addTodoToList,
  updateCustomList,
  reorderCustomLists,
  toggleTheme,
} = todoSlice.actions;

// Selectors
export const selectTodos = (state) => {
  const searchQuery = state.todos.searchQuery || '';
  const todos = state.todos.todos || [];
  
  return todos.filter(todo => {
    const matchesSearch = todo.title 
      ? todo.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    return matchesSearch;
  });
};

export const selectTotalTasks = (state) => state.todos.todos?.length || 0;
export const selectCompletedTasks = (state) => 
  state.todos.todos?.filter(todo => todo.completed)?.length || 0;
export const selectCurrentView = (state) => state.todos.currentView;
export const selectSelectedTask = (state) => state.todos.selectedTask;
export const selectSearchQuery = (state) => state.todos.searchQuery;

export const selectTodayTasks = (state) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return state.todos.todos.filter((todo) => {
    if (!todo.dueDate) return false;
    const dueDate = new Date(todo.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate.getTime() === today.getTime();
  }).length;
};

export const selectImportantTasks = (state) => 
  state.todos.todos.filter((todo) => todo.important).length;

export const selectPlannedTasks = (state) => 
  state.todos.todos.filter((todo) => todo.dueDate).length;

export const selectAssignedTasks = (state) => 
  state.todos.todos.filter((todo) => todo.assignedTo).length;

export const selectCustomLists = (state) => state.todos.customLists;

export const selectTheme = (state) => state.todos.theme;

export default todoSlice.reducer;