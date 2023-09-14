import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Data } from '../types/types';
import { getNewId } from '../helpers/helpers';

type Props = {
  handleAddItem: (item: Data) => void;
  list: Data[];
}

export default function AddFormDialog({ handleAddItem, list }: Props) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
    setCategory('');
    setName('');
    setText('');
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = () => {
    if (!category.trim() || !name.trim()) {
      setError(true);
      return;
    }
      setError(false);

      const newItem = {
        id: getNewId(list),
        name,
        category,
        text,
      };
      handleAddItem(newItem);

      setCategory('');
      setName('');
      setText('');
      handleClose();
  };

  return (
    <div>
      <Button sx={{ fontWeight: 600 }} variant="outlined" startIcon={<AddCircleOutlineRoundedIcon />} onClick={handleClickOpen}>
        Requisition
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Requisition</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="category"
            label="Category"
            type="text"
            fullWidth
            variant="outlined"
            value={category}
            onChange={handleCategoryChange}
            error={error}
            required 
            helperText={error ? 'Field cannot be empty' : ''}
          />
          <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            error={error}
            required 
            helperText={error ? 'Field cannot be empty' : ''}
          />
          <TextField
            margin="dense"
            id="text"
            label="Text"
            type="text"
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            value={text}
            onChange={handleTextChange}
          />
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>Cancel</Button>
          <Button sx={{ color: '#fafafa' }} variant='contained' onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}