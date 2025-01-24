import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Close as CloseIcon } from '@mui/icons-material';

const Calendar = ({ open, onClose, value, onChange }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Select Due Date
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={value}
            onChange={(newValue) => {
              onChange(newValue);
              onClose();
            }}
            renderInput={() => null}
          />
        </LocalizationProvider>
      </DialogContent>
    </Dialog>
  );
};

export default Calendar; 