import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectTotalTasks, selectCompletedTasks } from '../features/todos/todoSlice';

const TaskProgress = () => {
  const totalTasks = useSelector(selectTotalTasks);
  const completedTasks = useSelector(selectCompletedTasks);
  const percentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={120}
          thickness={4}
          sx={{ color: 'rgba(255, 255, 255, 0.1)' }}
        />
        <CircularProgress
          variant="determinate"
          value={percentage}
          size={120}
          thickness={4}
          sx={{
            position: 'absolute',
            left: 0,
            color: '#4CAF50',
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4" component="div" color="text.primary">
            {completedTasks}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            of {totalTasks}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Tasks Completed
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 8, height: 8, bgcolor: '#4CAF50', borderRadius: '50%' }} />
            <Typography variant="caption" color="text.secondary">
              Complete
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 8, height: 8, bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%' }} />
            <Typography variant="caption" color="text.secondary">
              Pending
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskProgress; 