import { useState } from 'react';
import './App.scss';
import { Todolist } from './Todolist';
import { v4 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

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

  const getFilteredTasks = (): TaskStateType => {
    return todoLists.reduce<TaskStateType>((acc, tl) => {
      const allTasks = tasks[tl.id] ?? [];

      switch (tl.filter) {
        case 'active':
          acc[tl.id] = allTasks.filter((t) => !t.isDone);
          break;
        case 'completed':
          acc[tl.id] = allTasks.filter((t) => t.isDone);
          break;
        default:
          acc[tl.id] = allTasks;
      }

      return acc;
    }, {});
  };

  const filteredTasks = getFilteredTasks();

  const removeTask = (taskId: string, todoListId: string) => {
    setTasks({ ...tasks, [todoListId]: tasks[todoListId].filter((t) => t.id !== taskId) });
  };

  const changeTaskFilter = (filter: FilterType, todoListId: string) => {
    setTodoLists(todoLists.map((t) => (t.id === todoListId ? { ...t, filter } : t)));
  };

  const addTask = (title: string, todoListId: string) => {
    const newTasks: TaskType = { title, isDone: false, id: v4() };
    setTasks({ ...tasks, [todoListId]: [newTasks, ...tasks[todoListId]] });
  };

  const changeTaskStatus = (id: string, newIsDoneValue: boolean, todoListId: string) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((t) =>
        t.id === id ? { ...t, isDone: newIsDoneValue } : t,
      ),
    });
  };

  const changeTaskTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string,
    todoListId: string,
  ) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((t) =>
        t.id === id ? { ...t, title: e.currentTarget.value } : t,
      ),
    });
  };

  const removeTodoList = (todoListId: string) => {
    setTodoLists(todoLists.filter((t) => t.id !== todoListId));
    const newTasks = { ...tasks };
    delete newTasks[todoListId];
    setTasks(newTasks);
  };
  const addTodolist = (title: string, todolistId: string) => {
    setTodoLists([...todoLists, { id: todolistId, title, filter: 'all' }]);
    setTasks({ ...tasks, [todolistId]: [] });
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TASKS-PLANNER
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container fixed>
        <Grid container sx={{ p: '10px 0' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todoLists.map((t) => (
            <Grid>
              <Paper elevation={3} sx={{ p: '20px' }}>
                <Todolist
                  key={t.id}
                  title={t.title}
                  tasks={filteredTasks[t.id]}
                  removeTask={removeTask}
                  changeTaskFilter={changeTaskFilter}
                  addTask={addTask}
                  changeTaskStatus={changeTaskStatus}
                  changeTaskTitle={changeTaskTitle}
                  filter={t.filter}
                  todoListId={t.id}
                  removeTodoList={removeTodoList}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
