import { Button } from '@mui/material';
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
    newItemTitle.length >= 15
      ? 'Your title is too long'
      : inputError
        ? 'Your title is empty'
        : 'Enter new title';

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
        <input
          className={inputError ? 'input_error' : ''}
          value={newItemTitle}
          onChange={onChangeSetNewTaskTitle}
          onKeyDown={onInputKeyDown}
        />
        <Button
          onClick={addItemHandler}
          disabled={isAddBtnDisabled}
          size={'small'}
          color={'primary'}
          variant={'contained'}
          sx={{ ml: '5px' }}
          endIcon={<AddBoxIcon />}>
          Add
        </Button>
      </div>
      <span>{userMessage}</span>
    </>
  );
};
