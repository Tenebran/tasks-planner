import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

type TaskPropsType = {
  changeTaskStatus: (id: string, newIsDoneValue: boolean, todoListId: string) => void;
  removeTask: (taskId: string, todoListId: string) => void;
  id: string;
  title: string;
  isDone: boolean;
  changeTaskTitle: (e: React.ChangeEvent<HTMLInputElement>, id: string, todoListId: string) => void;
  todoListId: string;
};

export const Task: React.FC<TaskPropsType> = ({
  changeTaskStatus,
  removeTask,
  id,
  title,
  isDone,
  changeTaskTitle,
  todoListId,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <li>
      {!open ? (
        <>
          <input
            type="checkbox"
            checked={isDone}
            onChange={(e) => changeTaskStatus(id, e.currentTarget.checked, todoListId)}
          />

          <span className={isDone ? 'task_done' : 'task'} onDoubleClick={() => setOpen(true)}>
            {title}
          </span>
          <IconButton aria-label="delete" onClick={() => removeTask(id, todoListId)}>
            <DeleteIcon />
          </IconButton>
        </>
      ) : (
        <input
          autoFocus
          onBlur={() => setOpen(false)}
          value={title}
          onChange={(e) => changeTaskTitle(e, id, todoListId)}
        />
      )}
    </li>
  );
};
