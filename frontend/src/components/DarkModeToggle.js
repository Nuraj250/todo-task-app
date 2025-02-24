import React from 'react';
import { Switch, FormControlLabel } from '@mui/material';

// DarkModeToggle component to enable/disable dark mode
function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <FormControlLabel
      // Toggle switch for dark mode
      control={
        <Switch 
          checked={darkMode} // Switch state based on the current dark mode setting
          onChange={() => setDarkMode(!darkMode)} // Toggle dark mode state on switch change
        />
      }
      label="Dark Mode" // Label next to the switch
    />
  );
}

export default DarkModeToggle;
