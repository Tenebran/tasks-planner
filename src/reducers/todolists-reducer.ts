import type { TodoListType } from '../App';

export type RemoveTodolistAT = {
  type: 'REMOVE-TODOLIST';
  id: string;
};

export type AddTodolistAT = {
  type: 'ADD-TODOLIST';
  title: string;
  id: string;
};

export const todolistsReducer = (
  todolists: TodoListType[],
  action: RemoveTodolistAT | AddTodolistAT,
): TodoListType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return todolists.filter((t) => t.id !== action.id);
    case 'ADD-TODOLIST':
      return [...todolists, { id: action.id, title: action.title, filter: 'all' }];
    default:
      return todolists;
  }
};
