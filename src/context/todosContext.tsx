/* eslint-disable react-refresh/only-export-components */
import { CircleCheckBig, Trash2 } from 'lucide-react';
import { createContext } from 'react';
import { toast } from 'react-toastify';
import { useLocalStorage } from '../hooks/useLocalStorage';

export type TodoItem = {
  id: string;
  title: string;
  completed: boolean;
};

type TodosContextType = {
  todos: TodoItem[];
  completedTodos: TodoItem[];
  unCompletedTodos: TodoItem[];
  addTodo: (todoTitle: string) => void;
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
  const completedTodos = todos.filter((todo) => todo.completed === true);
  const unCompletedTodos = todos.filter((todo) => todo.completed === false);

  const addTodo = (title: string) => {
    const newTodo: TodoItem = {
      id: crypto.randomUUID(),
      title: title,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    toast(`Added: ${newTodo.title}`, {
      icon: <CircleCheckBig className='completeIcon' />,
    });
  };

  const deleteTodo = (id: string) => {
    const deletedTodo: TodoItem = todos.filter((todo) => todo.id === id)[0];
    setTodos(todos.filter((todo) => todo.id !== id));
    toast(`Deleted: ${deletedTodo.title}`, {
      icon: <Trash2 className='text-red-400' />,
    });
  };

  const toggleComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        completedTodos,
        unCompletedTodos,
        addTodo,
        deleteTodo,
        toggleComplete,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
