import { IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import Checkbox from '@mui/material/Checkbox';

type TaskPropsType = {
  changeTaskStatus: (id: string, newIsDoneValue: boolean, todoListId: string) => void;
  removeTask: (taskId: string, todoListId: string) => void;
  id: string;
  title: string;
  isDone: boolean;
  changeTaskTitle: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string,
    todoListId: string,
  ) => void;
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
          <Checkbox
            checked={isDone}
            onChange={(e) => changeTaskStatus(id, e.currentTarget.checked, todoListId)}
          />

          <span className={isDone ? 'task_done' : 'task'} onDoubleClick={() => setOpen(true)}>
            {title}
          </span>
          <IconButton aria-label="delete" onClick={() => removeTask(id, todoListId)}>
            <CancelPresentationIcon color={'error'} />
          </IconButton>
        </>
      ) : (
        <TextField
          autoFocus
          variant={'standard'}
          onBlur={() => setOpen(false)}
          value={title}
          onChange={(e) => changeTaskTitle(e, id, todoListId)}
        />
        // <input
        //   autoFocus
        //   onBlur={() => setOpen(false)}
        //   value={title}
        //   onChange={(e) => changeTaskTitle(e, id, todoListId)}
        // />
      )}
    </li>
  );
};
