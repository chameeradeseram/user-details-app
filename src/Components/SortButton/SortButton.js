import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import './SortButton.css'

const SortButton = ({ isSorted, onClick }) => {
  return (
    <Tooltip title="Sort by First Name">
      <IconButton onClick={onClick}>
        <SortIcon style={{ transform: isSorted ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </IconButton>
    </Tooltip>
    
  );
};

export default SortButton;
