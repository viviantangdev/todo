import { Edit, X } from 'lucide-react';
import type { TodoItem } from '../context/todosContext';
import { useTabs } from '../hooks/useTabs';
import type { MODAL_TYPE } from '../utils/miscellaneous';
import AddTodoInput from './AddTodoInput';
import CompleteButton from './buttons/CompleteButton';
import { EmptyState } from './EmptyState';

type TodoListProps = {
  todos: TodoItem[];
  onOpenModal: (todo: TodoItem, type: MODAL_TYPE) => void;
  onToggleComplete: (id: string) => void;
  newTodoValue: string;
  onChangeNewTodo: (newTodo: string) => void;
  onAddTodo: (todo: string) => void;
};

export const TodoList = ({
  todos,
  onOpenModal,
  onToggleComplete,
  newTodoValue,
  onChangeNewTodo,
  onAddTodo,
}: TodoListProps) => {
  const { activeTab } = useTabs();

  if (todos.length === 0)
    return (
      <EmptyState
        tab={activeTab}
        children={
          <AddTodoInput
            value={newTodoValue}
            onChange={(e) => onChangeNewTodo(e.target.value)}
            onSubmit={onAddTodo}
          />
        }
      />
    );

  return (
    <ul className='flex-1 space-y-2 min-h-0 overflow-y-auto'>
      {todos.map((todo) => {
        return (
          <li
            key={todo.id}
            className='flex items-center justify-between gap-3 p-3 shadow-lg card'
          >
            <div className='flex items-center gap-2 flex-1 min-w-0'>
              <CompleteButton
                item={todo}
                onClick={() => onToggleComplete(todo.id)}
              />
              <p
                className={`flex-1 min-w-0 truncate text-lg text-shadow-2xs${
                  todo.completed && ' text-gray-400'
                }`}
              >
                {todo.title}
              </p>
            </div>
            <div>
              <button
                aria-label='Edit todo'
                onClick={() => onOpenModal(todo, 'EDIT')}
                className='flex-none text-gray-500 hover:text-primary'
              >
                <Edit className='h-5 w-5' />
              </button>
              <button
                aria-label='Delete todo'
                onClick={() => onOpenModal(todo, 'DELETE')}
                className='flex-none text-gray-500 hover:text-red-500'
              >
                <X className='h-5 w-5' />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
