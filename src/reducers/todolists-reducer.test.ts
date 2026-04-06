import { todolistsReducer, type ActionType } from './todolists-reducer';
import type { FilterType, TodoListType } from '../App';

test('correct todolist should be removed', () => {
  //
  const todolistId1 = 'todolistId1';
  const todolistId2 = 'todolistId2';

  const startState: Array<TodoListType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];
  //

  const action: ActionType = {
    type: 'REMOVE-TODOLIST',
    id: todolistId1,
  };

  const endState = todolistsReducer(startState, action);

  //
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  //
  const todolistId1 = 'todolistId1';
  const todolistId2 = 'todolistId2';

  const startState: Array<TodoListType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];
  //

  const action: ActionType = {
    type: 'ADD-TODOLIST',
    title: 'New-Todo',
  };

  const endState = todolistsReducer(startState, action);

  //
  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe('New-Todo');
});

test('correct todolist should change ist na,e', () => {
  //
  const todolistId1 = 'todolistId1';
  const todolistId2 = 'todolistId2';
  const newTodolistTitle = 'New-Todo';
  const action: ActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: todolistId2,
    title: newTodolistTitle,
  };

  const startState: Array<TodoListType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];
  //

  const endState = todolistsReducer(startState, action);

  //
  expect(endState[1].title).toBe(newTodolistTitle);
  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].id).toBe(todolistId2);
});

test('correct todolist should be change filter', () => {
  //
  const todolistId1 = 'todolistId1';
  const todolistId2 = 'todolistId2';
  const newFilterValue: FilterType = 'completed';
  const action: ActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: todolistId1,
    filter: newFilterValue,
  };

  const startState: Array<TodoListType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];
  //

  const endState = todolistsReducer(startState, action);

  //
  expect(endState[0].title).toBe('What to learn');
  expect(endState[0].id).toBe(todolistId1);
  expect(endState[1].id).toBe(todolistId2);
  expect(endState[0].filter).toBe(newFilterValue);
  expect(endState[1].filter).toBe('all');
});
