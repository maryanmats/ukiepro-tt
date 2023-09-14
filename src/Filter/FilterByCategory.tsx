import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Data } from '../types/types';

type Props = {
  filteredList: Data[];
  setFilterByCategory: (category: string) => void;
  filterByCategory: string;
}

export default function FilterByCategory({ filteredList, setFilterByCategory, filterByCategory }: Props) {
  const uniqueCategories = Array.from(new Set(filteredList.map((element) => element.category)));

  const handleChange = (event: SelectChangeEvent) => {
    setFilterByCategory(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filterByCategory}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value="All">All</MenuItem>
          {uniqueCategories .map((category, index) => (
            <MenuItem key={index} value={category}>{category}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
