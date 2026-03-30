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
