import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { reorderTodos, selectCompletedTasks } from '../features/todos/todoSlice';
import { Box, Typography, Divider } from '@mui/material';
import TodoItem from './TodoItem';

const DraggableTodoList = ({ todos, onSelectTask }) => {
  const dispatch = useDispatch();
  const completedTasks = useSelector(selectCompletedTasks);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    dispatch(reorderTodos({
      startIndex: result.source.index,
      endIndex: result.destination.index
    }));
  };

  const pendingTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {/* Pending Tasks */}
            <Box>
              {pendingTodos.map((todo, index) => (
                <Draggable 
                  key={todo.id} 
                  draggableId={todo.id} 
                  index={index}
                >
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{
                        transform: snapshot.isDragging ? 'scale(1.02)' : 'none',
                        transition: 'transform 0.2s',
                      }}
                    >
                      <TodoItem todo={todo} onSelect={onSelectTask} />
                    </Box>
                  )}
                </Draggable>
              ))}
            </Box>

            {/* Completed Tasks */}
            {completedTodos.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Divider sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Completed ({completedTasks})
                  </Typography>
                </Divider>
                {completedTodos.map((todo, index) => (
                  <Draggable
                    key={todo.id}
                    draggableId={todo.id}
                    index={pendingTodos.length + index}
                  >
                    {(provided, snapshot) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          transform: snapshot.isDragging ? 'scale(1.02)' : 'none',
                          transition: 'transform 0.2s',
                        }}
                      >
                        <TodoItem todo={todo} onSelect={onSelectTask} />
                      </Box>
                    )}
                  </Draggable>
                ))}
              </Box>
            )}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableTodoList; 