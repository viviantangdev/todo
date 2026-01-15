/* eslint-disable react-refresh/only-export-components */
import { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export type TodoItem = {
  id: string;
  title: string;
  completed: boolean;
};

type TodosContextType = {
  todos: TodoItem[];
  deleteTodo: (id: string) => void;
  toggleComplete: (id: string) => void;
};

const DEFAULT_TODOS: TodoItem[] = [
  { id: '1', title: 'Clean the house', completed: false },
  { id: '2', title: 'Destroy the house', completed: false },
];

export const TodosContext = createContext<TodosContextType | undefined>(
  undefined
);

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useLocalStorage('TODOS', DEFAULT_TODOS);

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <TodosContext.Provider value={{ todos, deleteTodo, toggleComplete }}>
      {children}
    </TodosContext.Provider>
  );
};
