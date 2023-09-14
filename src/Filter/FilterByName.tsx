import React from 'react';
import TextField from '@mui/material/TextField';

type Props = {
  setFilterByName: (name: string) => void;
}

const FilterByName = ({ setFilterByName }: Props) => {
  return (
    <div>
      <TextField
        id="name"
        label="Search by name"
        variant="outlined"
        margin="dense"
        onChange={(e) => setFilterByName(e.target.value)}
      />
    </div>
  );
};

export default FilterByName;