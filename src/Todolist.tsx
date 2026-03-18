import React, { useState } from 'react';
import type { FilterType, TaskType } from './App';
import { Task } from './Task';
import { Button, ButtonGroup, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddItemForm } from './AddItemForm';

type TodolistProps = {
  title: string;
  tasks: TaskType[];
  removeTask: (taskId: string, todoListId: string) => void;
  changeTaskFilter: (filter: FilterType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeTaskStatus: (id: string, newIsDoneValue: boolean, todoListId: string) => void;
  changeTaskTitle: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string,
    todoListId: string,
  ) => void;
  filter: FilterType;
  todoListId: string;
  removeTodoList: (todoListId: string) => void;
  changeTodolistTitle: (
    todolistId: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
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
  changeTodolistTitle,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="todolist">
      <div className="todolist-header">
        {!open ? (
          <>
            <h3 onDoubleClick={() => setOpen(true)}> {title}</h3>
            <IconButton aria-label="delete" onClick={() => removeTodoList(todoListId)}>
              <DeleteIcon color={'error'} />
            </IconButton>
          </>
        ) : (
          <TextField
            autoFocus
            onBlur={() => setOpen(false)}
            value={title}
            sx={{ mb: '10px' }}
            onChange={(e) => changeTodolistTitle(todoListId, e)}
          />
        )}
      </div>
      <AddItemForm todoListId={todoListId} addItem={addTask} />
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
        <ButtonGroup variant="contained" size={'small'} disableElevation fullWidth>
          <Button
            color={filter === 'all' ? 'secondary' : 'primary'}
            sx={{ mr: '2px' }}
            onClick={() => changeTaskFilter('all', todoListId)}>
            All
          </Button>
          <Button
            color={filter === 'active' ? 'secondary' : 'primary'}
            sx={{ mr: '2px' }}
            onClick={() => changeTaskFilter('active', todoListId)}>
            Active
          </Button>
          <Button
            color={filter === 'completed' ? 'secondary' : 'primary'}
            onClick={() => changeTaskFilter('completed', todoListId)}>
            Completed
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};
