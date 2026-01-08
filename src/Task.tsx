import React, { useState, type ChangeEvent } from 'react';

type TaskPropsType = {
  changeTaskStatus: (id: string, newIsDoneValue: boolean) => void;
  removeTask: (id: string) => void;
  id: string;
  title: string;
  isDone: boolean;
  changeTaskTitle: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
};

export const Task: React.FC<TaskPropsType> = ({
  changeTaskStatus,
  removeTask,
  id,
  title,
  isDone,
  changeTaskTitle,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <li>
      {!open ? (
        <>
          <input
            type="checkbox"
            checked={isDone}
            onChange={(e) => changeTaskStatus(id, e.currentTarget.checked)}
          />

          <span className={isDone ? 'task_done' : 'task'} onDoubleClick={() => setOpen(true)}>
            {title}
          </span>

          <button onClick={() => removeTask(id)}>x</button>
        </>
      ) : (
        <input
          autoFocus
          onBlur={() => setOpen(false)}
          value={title}
          onChange={(e) => changeTaskTitle(e, id)}
        />
      )}
    </li>
  );
};
