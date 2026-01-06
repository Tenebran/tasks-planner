import { useState } from 'react';
import './App.scss';
import { Todolist } from './Todolist';
import { v4 } from 'uuid';

export type TaskType = {
  title: string;
  isDone: boolean;
  id: string;
};

export type FilterType = 'all' | 'active' | 'completed';

function App() {
  const todolistTitle1 = 'What To Learn';

  const [tasks, setTasks] = useState<TaskType[]>([
    { title: 'HTML&CSS', isDone: true, id: v4() },
    { title: 'JS', isDone: true, id: v4() },
    { title: 'ReactJS', isDone: false, id: v4() },
    { title: 'Redux', isDone: false, id: v4() },
  ]);
  const [filter, setFilter] = useState<FilterType>('all');

  const getFilteredTasks = () => {
    switch (filter) {
      case 'active':
        return tasks.filter((t) => !t.isDone);
      case 'completed':
        return tasks.filter((t) => t.isDone);
      default:
        return tasks;
    }
  };

  const filtereTasks: TaskType[] = getFilteredTasks();

  const removeTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const changeTaskFilter = (filter: FilterType) => {
    setFilter(filter);
  };

  const addTask = (title: string) => {
    const newTasks: TaskType = { title, isDone: false, id: v4() };
    setTasks([newTasks, ...tasks]);
  };

  const changeTaskStatus = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, isDone: !t.isDone } : t)));
  };

  const changeTaskTitle = () => {};

  return (
    <div className="App">
      <Todolist
        title={todolistTitle1}
        tasks={filtereTasks}
        removeTask={removeTask}
        changeTaskFilter={changeTaskFilter}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  );
}

export default App;
