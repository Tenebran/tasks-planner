import React, { useState, type ChangeEvent } from 'react';
import type { FilterType, TaskType } from './App';
import { Task } from './Task';
import { Button } from '@mui/material';

type TodolistProps = {
  title: string;
  tasks: TaskType[];
  removeTask: (taskId: string, todoListId: string) => void;
  changeTaskFilter: (filter: FilterType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeTaskStatus: (id: string, newIsDoneValue: boolean, todoListId: string) => void;
  changeTaskTitle: (e: ChangeEvent<HTMLInputElement>, id: string, todoListId: string) => void;
  filter: FilterType;
  todoListId: string;
  removeTodoList: (todoListId: string) => void;
};

export const Todolist: React.FC<TodolistProps> = ({
  title,
  tasks,
  removeTask,
  changeTaskFilter,
  addTask,
  changeTaskStatus,
  changeTaskTitle,
  filter,
  todoListId,
  removeTodoList,
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [inputError, setInputError] = useState<boolean>(false);

  const addTasksHandler = () => {
    if (!newTaskTitle.trim()) {
      setInputError(true);
    } else {
      setInputError(false);
      addTask(newTaskTitle, todoListId);
      setNewTaskTitle('');
    }
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTasksHandler();
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

  return (
    <div className="todolist">
      <div className="todolist-header">
        <h3>{title}</h3>
        <button className="todolist-header_button" onClick={() => removeTodoList(todoListId)}>
          X
        </button>
      </div>
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
      <ul>
        {tasks.length ? (
          tasks?.map((t) => {
            return (
              <Task
                key={t.id}
                removeTask={removeTask}
                id={t.id}
                title={t.title}
                isDone={t.isDone}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                todoListId={todoListId}
              />
            );
          })
        ) : (
          <div>No tasks available</div>
        )}
      </ul>
      <div>
        <Button
          variant="contained"
          color={filter === 'all' ? 'secondary' : 'primary'}
          size={'small'}
          onClick={() => changeTaskFilter('all', todoListId)}>
          All
        </Button>
        <Button
          variant="contained"
          color={filter === 'active' ? 'secondary' : 'primary'}
          size={'small'}
          onClick={() => changeTaskFilter('active', todoListId)}>
          Active
        </Button>
        <Button
          variant="contained"
          color={filter === 'completed' ? 'secondary' : 'primary'}
          size={'small'}
          onClick={() => changeTaskFilter('completed', todoListId)}>
          Completed
        </Button>
      </div>
    </div>
  );
};
