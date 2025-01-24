import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import Weather from '../components/Weather';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleComplete, toggleImportant, removeTodo, updateTodo } from '../features/todos/todoSlice';
import { isToday } from '../utils/dateUtils';
import TaskDetails from '../components/TaskDetails';

const Todos = ({ filter = 'all' }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => {
    const allTodos = state.todos.todos;
    switch (filter) {
      case 'today':
        return allTodos.filter(todo => todo.date && isToday(new Date(todo.date)));
      case 'important':
        return allTodos.filter(todo => todo.important);
      case 'planned':
        return allTodos.filter(todo => todo.date);
      case 'assigned':
        return allTodos.filter(todo => todo.assignedTo);
      default:
        return allTodos;
    }
  });

  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddTodo = (todo) => {
    dispatch(addTodo(todo));
  };

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id));
  };

  const handleToggleImportant = (id) => {
    dispatch(toggleImportant(id));
  };

  const handleDelete = (id) => {
    dispatch(removeTodo(id));
  };

  const handleUpdateTask = (updatedTask) => {
    dispatch(updateTodo(updatedTask));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Todo List
        </Typography>
        <Weather />
        <TodoInput onAddTodo={handleAddTodo} />
        <TodoList
          todos={todos}
          onToggleComplete={handleToggleComplete}
          onToggleImportant={handleToggleImportant}
          onDelete={handleDelete}
          onSelectTask={(task) => {
            setSelectedTask(task);
            setIsTaskDetailsOpen(true);
          }}
        />
      </Box>

      <TaskDetails
        open={isTaskDetailsOpen}
        onClose={() => setIsTaskDetailsOpen(false)}
        task={selectedTask}
        onUpdate={handleUpdateTask}
      />
    </Container>
  );
};

export default Todos;
