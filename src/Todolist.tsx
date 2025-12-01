import React, { useState } from 'react';

type TodolistProps = {
  title: string;
  tasks?: Array<{ task: string; isDone: boolean; id: number }>;
};

export const Todolist: React.FC<TodolistProps> = (props) => {
  const [title] = useState(props.title);

  return (
    <div className="todolist">
      <h3>{title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {props.tasks?.map((t) => {
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
