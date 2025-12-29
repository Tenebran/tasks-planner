import React from 'react';
import type { TaskType } from './App';

type TodolistProps = {
  title: string;
  tasks: TaskType[];
  removeTask: (id: number) => void;
};

export const Todolist: React.FC<TodolistProps> = ({ title, tasks, removeTask }) => {
  return (
    <div className="todolist">
      <h3>{title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {tasks?.length ? (
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
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};
