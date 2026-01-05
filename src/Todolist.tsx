import React, { useState, type ChangeEvent } from 'react';
import type { FilterType, TaskType } from './App';

type TodolistProps = {
  title: string;
  tasks: TaskType[];
  removeTask: (id: string) => void;
  changeFilter: (filter: FilterType) => void;
  addTasks: (title: string) => void;
  updateTasksStatus: (id: string, isDone: boolean) => void;
};

export const Todolist: React.FC<TodolistProps> = ({
  title,
  tasks,
  removeTask,
  changeFilter,
  addTasks,
  updateTasksStatus,
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  const addTasksHandler = () => {
    if (!newTaskTitle.trim()) return;
    addTasks(newTaskTitle);
    setNewTaskTitle('');
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTasksHandler();
    }
  };

  const isAddBtnDisabled = !newTaskTitle || newTaskTitle.length >= 15;
  const onChangeSetNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTaskTitle(e.currentTarget.value);

  return (
    <div className="todolist">
      <h3>{title}</h3>
      <div>
        <input value={newTaskTitle} onChange={onChangeSetNewTaskTitle} onKeyDown={onInputKeyDown} />
        <button onClick={addTasksHandler} disabled={isAddBtnDisabled}>
          +
        </button>
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
                <span>{t.title}</span>
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
