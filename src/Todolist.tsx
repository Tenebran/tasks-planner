import React from 'react';
import type { FilterType, TaskType } from './App';

type TodolistProps = {
  title: string;
  tasks: TaskType[];
  removeTask: (id: number) => void;
  changeFilter: (filter: FilterType) => void;
};

export const Todolist: React.FC<TodolistProps> = ({ title, tasks, removeTask, changeFilter }) => {
  return (
    <div className="todolist">
      <h3>{title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {tasks.length ? (
          tasks?.map((t) => {
            return (
              <li key={t.id}>
                <input type="checkbox" checked={t.isDone} /> <span>{t.task}</span>
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
