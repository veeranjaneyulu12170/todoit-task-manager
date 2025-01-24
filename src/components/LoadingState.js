import React from 'react';
import { Box, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { shimmer } from '../utils/animations';

const ShimmerSkeleton = styled(Skeleton)(({ theme }) => ({
  background: `linear-gradient(
    90deg,
    ${theme.palette.background.paper} 0%,
    ${theme.palette.action.hover} 50%,
    ${theme.palette.background.paper} 100%
  )`,
  backgroundSize: '200% 100%',
  animation: `${shimmer} 1.5s infinite linear`,
}));

const LoadingState = ({ type = 'list' }) => {
  if (type === 'grid') {
    return (
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
        {[...Array(6)].map((_, i) => (
          <Box key={i} sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
            <ShimmerSkeleton variant="rectangular" height={24} sx={{ mb: 1 }} />
            <ShimmerSkeleton variant="text" width="60%" />
            <ShimmerSkeleton variant="text" width="40%" />
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {[...Array(5)].map((_, i) => (
        <Box
          key={i}
          sx={{
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <ShimmerSkeleton variant="circular" width={24} height={24} />
          <Box sx={{ flex: 1 }}>
            <ShimmerSkeleton variant="text" width="80%" />
            <ShimmerSkeleton variant="text" width="40%" />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default LoadingState; 