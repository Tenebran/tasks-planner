import React, { useState, type ChangeEvent } from 'react';
import type { FilterType, TaskType } from './App';
import { Task } from './Task';

type TodolistProps = {
  title: string;
  tasks: TaskType[];
  removeTask: (id: string) => void;
  changeTaskFilter: (filter: FilterType) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (id: string, newIsDoneValue: boolean) => void;
  changeTaskTitle: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  filter: FilterType;
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
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [inputError, setInputError] = useState<boolean>(false);

  const addTasksHandler = () => {
    if (!newTaskTitle.trim()) {
      setInputError(true);
    } else {
      setInputError(false);
      addTask(newTaskTitle);
      setNewTaskTitle('');
    }
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTasksHandler();
    }
  };

  const isAddBtnDisabled = !newTaskTitle || newTaskTitle.length >= 15;

  const userMessage =
    newTaskTitle.length >= 15
      ? 'Your title is too long'
      : inputError
      ? 'Your title is empty'
      : 'Enter new title';

  const onChangeSetNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
    setInputError(false);
  };
  console.log('test');
  const filterHandler = (filterButton: FilterType) => {
    return filter === filterButton ? 'filter_active' : '';
  };

  return (
    <div className="todolist">
      <h3>{title}</h3>
      <div>
        <input
          className={inputError ? 'input_error' : ''}
          value={newTaskTitle}
          onChange={onChangeSetNewTaskTitle}
          onKeyDown={onInputKeyDown}
        />
        <button onClick={addTasksHandler} disabled={isAddBtnDisabled}>
          +
        </button>
      </div>
      <span>{userMessage}</span>
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
              />
            );
          })
        ) : (
          <div>No tasks available</div>
        )}
      </ul>
      <div>
        <button className={filterHandler('all')} onClick={() => changeTaskFilter('all')}>
          All
        </button>
        <button className={filterHandler('active')} onClick={() => changeTaskFilter('active')}>
          Active
        </button>
        <button
          className={filterHandler('completed')}
          onClick={() => changeTaskFilter('completed')}>
          Completed
        </button>
      </div>
    </div>
  );
};
