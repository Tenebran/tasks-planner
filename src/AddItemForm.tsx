import React, { useState, type ChangeEvent } from 'react';

type AddItemForm = {
  addTask: (title: string, todoListId: string) => void;
  todoListId: string;
};

export const AddItemForm: React.FC<AddItemForm> = ({ addTask, todoListId }) => {
  const [inputError, setInputError] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  const addTasksHandler = () => {
    if (!newTaskTitle.trim()) {
      setInputError(true);
    } else {
      setInputError(false);
      addTask(newTaskTitle, todoListId);
      setNewTaskTitle('');
    }
  };

  const isAddBtnDisabled = !newTaskTitle || newTaskTitle.length >= 15;

  const userMessage =
    newTaskTitle.length >= 15
      ? 'Your title is too long'
      : inputError
        ? 'Your title is empty'
        : 'Enter new title';

  const onChangeSetNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
    setInputError(false);
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTasksHandler();
    }
  };

  return (
    <>
      <div>
        <input
          className={inputError ? 'input_error' : ''}
          value={newTaskTitle}
          onChange={onChangeSetNewTaskTitle}
          onKeyDown={onInputKeyDown}
        />
        <button onClick={addTasksHandler} disabled={isAddBtnDisabled}>
          +
        </button>
      </div>
      <span>{userMessage}</span>
    </>
  );
};
