//Implement sor by dop down with menu options
import React, { useState } from 'react';
import {Select, MenuItem, FormControl, InputLabel} from '@mui/material';

const SortByDropDown = ({ sortOptions, selectedSortOption, setSelectedSortOption }) => {
  
    
    const handleChange = (event) => {      
        setSelectedSortOption(event.target.value);       
    };
    
    return (
        <FormControl>
        <InputLabel id="sort-by-label">Sort By</InputLabel>
        <Select
            labelId="sort-by-label"
            value={selectedSortOption}
            onChange={handleChange}
            label="Sort By"
        >
            {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>
            ))}
        </Select>
        </FormControl>
    );
    }   

    export default SortByDropDown;

