import './App.css';
import { Todolist } from './todolist';

function App() {
  const todolistTitle1 = 'What To Learn';
  const todolistTitle2 = 'What To Buy';

  return (
    <div className="App">
      <Todolist
        title={todolistTitle1}
        tasks={[
          { task: 'HTML&CSS', isDone: true, id: 1 },
          { task: 'JS', isDone: true, id: 2 },
          { task: 'ReactJS', isDone: false, id: 3 },
        ]}
      />
      <Todolist
        title={todolistTitle2}
        tasks={[
          { task: 'Milk', isDone: true, id: 1 },
          { task: 'Bread', isDone: false, id: 2 },
          { task: 'Eggs', isDone: false, id: 3 },
        ]}
      />
      ‚
    </div>
  );
}

export default App;
