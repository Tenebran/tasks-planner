import type { FilterType, TodoListType } from '../App';

export type RemoveTodolistAT = {
  type: 'REMOVE-TODOLIST';
  id: string;
};

export type AddTodolistAT = {
  type: 'ADD-TODOLIST';
  title: string;
};
export type ChangeTodolistTtitle = {
  type: 'CHANGE-TODOLIST-TITLE';
  id: string;
  title: string;
};

export type ChangeTodolistFilter = {
  type: 'CHANGE-TODOLIST-FILTER';
  id: string;
  filter: FilterType;
};

export type ActionType =
  | RemoveTodolistAT
  | AddTodolistAT
  | ChangeTodolistTtitle
  | ChangeTodolistFilter;

export const todolistsReducer = (todolists: TodoListType[], action: ActionType): TodoListType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return todolists.filter((t) => t.id !== action.id);
    case 'ADD-TODOLIST':
      return [...todolists, { id: crypto.randomUUID(), title: action.title, filter: 'all' }];
    case 'CHANGE-TODOLIST-TITLE':
      return todolists.map((t) => (t.id === action.id ? { ...t, title: action.title } : t));
    case 'CHANGE-TODOLIST-FILTER':
      return todolists.map((t) => (t.id === action.id ? { ...t, filter: action.filter } : t));
    default:
      return todolists;
  }
};
