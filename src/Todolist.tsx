import React from 'react';
import type { TaskType } from './App';

type TodolistProps = {
  title: string;
  tasks?: TaskType[];
};

export const Todolist: React.FC<TodolistProps> = ({ title, tasks }) => {
  return (
    <div className="todolist">
      <h3>{title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {tasks?.map((t) => {
          return (
            <li key={t.id}>
              <input type="checkbox" checked={t.isDone} /> <span>{t.task}</span>
            </li>
          );
        })}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};
