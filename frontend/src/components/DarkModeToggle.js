import React from 'react';
import { Switch, FormControlLabel } from '@mui/material';

function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <FormControlLabel
      control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
      label="Dark Mode"
    />
  );
}

export default DarkModeToggle;
