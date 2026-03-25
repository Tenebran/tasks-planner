import { v1 } from 'uuid';
import type { TodoListType } from '../App';
import { todolistsReducer } from './todolists-reducer';

test('correct todolist should be removed', () => {
  //
  const todolistId1 = v1();
  const todolistId2 = v1();

  const startState: Array<TodoListType> = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];
  //

  const endState = todolistsReducer(startState);

  //
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});
