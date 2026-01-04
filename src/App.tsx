import { useState } from 'react';
import './App.scss';
import { Todolist } from './Todolist';

export type TaskType = {
  task: string;
  isDone: boolean;
  id: number;
};

export type FilterType = 'all' | 'active' | 'completed';

function App() {
  const todolistTitle1 = 'What To Learn';
  // const todolistTitle2 = 'What To Buy';

  const [tasks, setTasks] = useState<TaskType[]>([
    { task: 'HTML&CSS', isDone: true, id: 1 },
    { task: 'JS', isDone: true, id: 2 },
    { task: 'ReactJS', isDone: false, id: 3 },
    { task: 'Redux', isDone: false, id: 7 },
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

  // const tasks2: TaskType[] = [
  //   { task: 'Milk', isDone: true, id: 4 },

  //   { task: 'Bread', isDone: false, id: 5 },
  //   { task: 'Eggs', isDone: false, id: 6 },
  //   { task: 'Coffe', isDone: false, id: 8 },
  // ];

  const removeTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const changeFilter = (filter: FilterType) => {
    setFilter(filter);
  };

  const addTasks = (newTasks: string) => {
    const createTasks: TaskType = { task: newTasks, isDone: false, id: tasks.length + 1 };
    setTasks([createTasks, ...tasks]);
  };

  return (
    <div className="App">
      <Todolist
        title={todolistTitle1}
        tasks={filtereTasks}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTasks={addTasks}
      />
    </div>
  );
}

export default App;
