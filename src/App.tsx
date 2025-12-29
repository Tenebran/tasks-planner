import { useState } from 'react';
import './App.scss';
import { Todolist } from './Todolist';

export type TaskType = {
  task: string;
  isDone: boolean;
  id: number;
};

function App() {
  const todolistTitle1 = 'What To Learn';
  // const todolistTitle2 = 'What To Buy';

  const [tasks, setTasks] = useState<TaskType[]>([
    { task: 'HTML&CSS', isDone: true, id: 1 },
    { task: 'JS', isDone: true, id: 2 },
    { task: 'ReactJS', isDone: false, id: 3 },
    { task: 'Redux', isDone: false, id: 7 },
  ]);

  // const tasks2: TaskType[] = [
  //   { task: 'Milk', isDone: true, id: 4 },
  //   { task: 'Bread', isDone: false, id: 5 },
  //   { task: 'Eggs', isDone: false, id: 6 },
  //   { task: 'Coffe', isDone: false, id: 8 },
  // ];

  const removeTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="App">
      <Todolist title={todolistTitle1} tasks={tasks} removeTask={removeTask} />
    </div>
  );
}

export default App;
