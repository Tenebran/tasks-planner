import { useState, type ChangeEvent } from 'react';
import './App.scss';
import { Todolist } from './Todolist';
import { v4 } from 'uuid';

export type TaskType = {
  title: string;
  isDone: boolean;
  id: string;
};

export type FilterType = 'all' | 'active' | 'completed';

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterType;
};

export type TaskStateType = {
  [todoListId: string]: TaskType[];
};

function App() {
  const todoListID_1 = v4();
  const todoListID_2 = v4();

  const [todoLists, setTodoLists] = useState<TodoListType[]>([
    { id: todoListID_1, title: 'What To Learn', filter: 'all' },
    { id: todoListID_2, title: 'What To Buy', filter: 'all' },
  ]);

  const [tasks, setTasks] = useState<TaskStateType>({
    [todoListID_1]: [
      { title: 'HTML&CSS', isDone: true, id: v4() },
      { title: 'JS', isDone: true, id: v4() },
      { title: 'ReactJS', isDone: false, id: v4() },
      { title: 'Redux', isDone: false, id: v4() },
    ],
    [todoListID_2]: [
      { title: 'MILK', isDone: true, id: v4() },
      { title: 'BREAD', isDone: true, id: v4() },
      { title: 'MEAT', isDone: false, id: v4() },
    ],
  });

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

  const removeTask = (taskId: string, todoListId: string) => {
    setTasks({ ...tasks, [todoListId]: tasks[todoListId].filter((t) => t.id !== taskId) });
  };

  const changeTaskFilter = (filter: FilterType) => {
    setFilter(filter);
  };

  const addTask = (title: string, todoListId: string) => {
    const newTasks: TaskType = { title, isDone: false, id: v4() };
    setTasks({ ...tasks, [todoListId]: [newTasks, ...tasks[todoListId]] });
  };

  const changeTaskStatus = (id: string, newIsDoneValue: boolean) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, isDone: newIsDoneValue } : t)));
  };

  const changeTaskTitle = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, title: e.currentTarget.value } : t)));
  };

  return (
    <div className="App">
      <Todolist
        title={todolistTitle1}
        tasks={filtereTasks}
        removeTask={removeTask}
        changeTaskFilter={changeTaskFilter}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={changeTaskTitle}
        filter={filter}
      />
    </div>
  );
}

export default App;
