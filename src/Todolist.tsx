import React, { useState } from 'react';
import type { FilterType, TaskType } from './App';

type TodolistProps = {
  title: string;
  tasks: TaskType[];
  removeTask: (id: number) => void;
  changeFilter: (filter: FilterType) => void;
  addTasks: (newTasks: string) => void;
  updateTasksStatus: (id: number, isDone: boolean) => void;
};

export const Todolist: React.FC<TodolistProps> = ({
  title,
  tasks,
  removeTask,
  changeFilter,
  addTasks,
  updateTasksStatus,
}) => {
  const [value, setValue] = useState<string>('');

  const addTasksHandler = () => {
    if (!value.trim()) return;
    addTasks(value);
    setValue('');
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTasksHandler();
    }
  };

  return (
    <div className="todolist">
      <h3>{title}</h3>
      <div>
        <input
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          onKeyDown={onInputKeyDown}
        />
        <button onClick={addTasksHandler}>+</button>
      </div>
      <ul>
        {tasks.length ? (
          tasks?.map((t) => {
            return (
              <li key={t.id}>
                <input
                  type="checkbox"
                  checked={t.isDone}
                  onChange={(e) => updateTasksStatus(t.id, e.currentTarget.checked)}
                />
                <span>{t.task}</span>
                <button className="closeButton" onClick={() => removeTask(t.id)}>
                  x
                </button>
              </li>
            );
          })
        ) : (
          <div>No tasks available</div>
        )}
      </ul>
      <div>
        <button onClick={() => changeFilter('all')}>All</button>
        <button onClick={() => changeFilter('active')}>Active</button>
        <button onClick={() => changeFilter('completed')}>Completed</button>
      </div>
    </div>
  );
};
