import React from 'react';
import { TextField, Box } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const CustomDatePicker = ({ value, onChange, label }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        startText={`Start ${label}`}
        endText={`End ${label}`}
        value={value}
        onChange={onChange}
        renderInput={(startProps, endProps) => (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              {...startProps}
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                bgcolor: '#f0f0f0',
                borderRadius: '8px',
              }}
            />
            <TextField
              {...endProps}
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                bgcolor: '#f0f0f0',
                borderRadius: '8px',
              }}
            />
          </Box>
        )}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
