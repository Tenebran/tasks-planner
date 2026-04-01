import { todolistsReducer } from './todolists-reducer';
import type { TodoListType } from '../App';

test('correct todolist should be removed', () => {
  //
  const todolistId1 = 'todolistId1';
  const todolistId2 = 'todolistId2';

  const startState: Array<TodoListType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];
  //

  const endState = todolistsReducer(startState, {
    type: 'REMOVE-TODOLIST',
    id: todolistId1,
  });

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

  const endState = todolistsReducer(startState, {
    type: 'ADD-TODOLIST',
    title: 'New-Todo',
  });

  //
  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe('New-Todo');
});

test('correct todolist should be change title', () => {
  //
  const todolistId1 = 'todolistId1';
  const todolistId2 = 'todolistId2';

  const startState: Array<TodoListType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];
  //

  const endState = todolistsReducer(startState, {
    type: 'CHANGE-TODOLIST-TITLE',
    id: todolistId2,
    title: 'New-Todo',
  });

  //
  expect(endState[1].title).toBe('New-Todo');
  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].id).toBe(todolistId2);
});

test('correct todolist should be change filter', () => {
  //
  const todolistId1 = 'todolistId1';
  const todolistId2 = 'todolistId2';

  const startState: Array<TodoListType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];
  //

  const endState = todolistsReducer(startState, {
    type: 'CHANGE-TODOLIST-FILTER',
    id: todolistId1,
    filter: 'completed',
  });

  //
  expect(endState[0].title).toBe('What to learn');
  expect(endState[0].id).toBe(todolistId1);
  expect(endState[1].id).toBe(todolistId2);
  expect(endState[0].filter).toBe('completed');
  expect(endState[1].filter).toBe('all');
});
