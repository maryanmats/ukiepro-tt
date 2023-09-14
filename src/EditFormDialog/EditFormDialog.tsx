import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Data } from '../types/types';
import EditIcon from '@mui/icons-material/Edit';

type Props = {
  handleEdit: (item: Data) => void;
  defaultValues: Data;
}

export default function EditFormDialog({ handleEdit, defaultValues }: Props) {
  const {
    id,
    category: defaultCategory,
    name: defaultName,
    text: defaultText,
  } = defaultValues;

  const [category, setCategory] = useState(defaultCategory);
  const [name, setName] = useState(defaultName);
  const [text, setText] = useState(defaultText);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
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
        id,
        name,
        category,
        text,
      };
      handleEdit(newItem);
      handleClose();
  };

  return (
    <div>
      <EditIcon sx={{ '&:hover': { cursor: 'pointer' } }} onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Requisition</DialogTitle>
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