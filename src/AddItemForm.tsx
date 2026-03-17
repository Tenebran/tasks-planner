import { Button, TextField } from '@mui/material';
import React, { useState, type ChangeEvent } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { v4 } from 'uuid';

type AddItemForm = {
  todoListId?: string;
  addItem: (title: string, todoListId: string) => void;
};

export const AddItemForm: React.FC<AddItemForm> = ({ todoListId, addItem }) => {
  const [inputError, setInputError] = useState<boolean>(false);
  const [newItemTitle, setNewTaskTitle] = useState<string>('');

  const userMessage =
    newItemTitle.length >= 15 ? 'Your title is too long' : inputError ? 'Your title is empty' : '';

  const isAddBtnDisabled = !newItemTitle || newItemTitle.length >= 15;

  const onChangeSetNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
    setInputError(false);
  };

  const addItemHandler = () => {
    if (!newItemTitle.trim()) {
      setInputError(true);
    } else {
      setInputError(false);
      addItem(newItemTitle, todoListId ? todoListId : v4());
      setNewTaskTitle('');
    }
  };
  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addItemHandler();
    }
  };

  return (
    <>
      <div>
        <TextField
          className={inputError ? 'input_error' : ''}
          value={newItemTitle}
          onChange={onChangeSetNewTaskTitle}
          onKeyDown={onInputKeyDown}
          variant={'outlined'}
          size={'small'}
          label={'Enter new title'}
          error={newItemTitle.length >= 15 || inputError}
          helperText={userMessage}
        />

        <Button
          onClick={addItemHandler}
          disabled={isAddBtnDisabled}
          size={'medium'}
          color={'primary'}
          variant={'contained'}
          sx={{ ml: '5px' }}
          endIcon={<AddBoxIcon />}>
          Add
        </Button>
      </div>
    </>
  );
};
