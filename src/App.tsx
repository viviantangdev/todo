import { CircleCheckBig, Edit, X } from 'lucide-react';
import { useState } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import AddTodoInput from './components/AddTodoInput';
import CompleteButton from './components/buttons/CompleteButton';
import { ThemeButton } from './components/buttons/ThemeButton';
import { TodoTabs } from './components/buttons/TodoTabs';
import { EmptyState } from './components/EmptyState';
import { DeleteTodoModal } from './components/modals/DeleteTodoModal';
import { EditTodoModal } from './components/modals/EditTodoModal';
import type { TodoItem } from './context/todosContext';
import { useTabs } from './hooks/useTabs';
import { useTheme } from './hooks/useTheme';
import { useTodos } from './hooks/useTodos';
import { getTab, type TabType } from './utils/tabs';

type ModalView = 'Delete' | 'Edit';

function App() {
  const {
    todos,
    completedTodos,
    unCompletedTodos,
    addTodo,
    editTodo,
    deleteTodo,
    toggleComplete,
  } = useTodos();
  const { activeTab } = useTabs();
  const { theme } = useTheme();

  const [newTodo, setNewTodo] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | undefined>(
    undefined,
  );
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const getFilteredTodos = (type: TabType) => {
    if (type === 'ACTIVE') return unCompletedTodos;
    if (type === 'COMPLETED') return completedTodos;
    return todos;
  };

  const counts = {
    total: todos.length,
    active: unCompletedTodos.length,
    completed: completedTodos.length,
  };

  const { subTitle } = getTab(activeTab, counts);
  const filteredTodos = getFilteredTodos(activeTab);

  const handleDialog = (todo: TodoItem, view: ModalView) => {
    setSelectedTodo(todo);

    if (view === 'Edit') {
      setIsEditOpen(true);
    } else {
      setIsDeleteOpen(true);
    }
  };

  const handleAddTodo = (todo: string) => {
    addTodo(todo);
    setNewTodo('');
  };
  const handleEditTodo = (todo: TodoItem) => {
    setIsEditOpen(false);
    editTodo(todo);
  };
  const handleDeleteTodo = (id: string) => {
    setIsDeleteOpen(false);
    deleteTodo(id);
  };

  return (
    <>
      <div className='relative content flex flex-col gap-5 p-4 h-screen w-full lg:rounded-2xl lg:max-w-180 lg:m-auto'>
        <header>
          <div className='flex justify-between items-center'>
            <h1 className='flex items-center gap-1'>
              <CircleCheckBig className='completeIcon text-shadow-lg' />
              <span className='tracking-wider'>TODO</span>
            </h1>
            <ThemeButton />
          </div>
        </header>

        <main className='flex-1 flex flex-col gap-8 min-h-0'>
          <section>
            <AddTodoInput
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onSubmit={handleAddTodo}
            />
          </section>
          <section>
            <TodoTabs counts={counts} />
          </section>
          <section className='flex-1 flex flex-col gap-2 min-h-0'>
            <p>{subTitle}</p>
            {filteredTodos.length === 0 ? (
              <EmptyState
                tab={activeTab}
                children={
                  <AddTodoInput
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onSubmit={handleAddTodo}
                  />
                }
              />
            ) : (
              <ul className='flex-1 space-y-2 min-h-0 overflow-y-auto'>
                {filteredTodos.map((todo) => {
                  return (
                    <li
                      key={todo.id}
                      className='flex items-center justify-between gap-3 p-3 shadow-lg card'
                    >
                      <div className='flex items-center gap-2 flex-1 min-w-0'>
                        <CompleteButton
                          item={todo}
                          onClick={() => toggleComplete(todo.id)}
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
                          onClick={() => handleDialog(todo, 'Edit')}
                          className='flex-none text-gray-500 hover:text-primary'
                        >
                          <Edit className='h-5 w-5' />
                        </button>
                        <button
                          aria-label='Delete todo'
                          onClick={() => handleDialog(todo, 'Delete')}
                          className='flex-none text-gray-500 hover:text-red-500'
                        >
                          <X className='h-5 w-5' />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </main>
        <ToastContainer
          position='bottom-center'
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme={theme}
          transition={Bounce}
        />
        {isEditOpen && (
          <EditTodoModal
            onClose={() => setIsEditOpen(false)}
            todo={selectedTodo}
            onSave={handleEditTodo}
            onChange={(title) =>
              setSelectedTodo((prev) => (prev ? { ...prev, title } : prev))
            }
          />
        )}
        {isDeleteOpen && (
          <DeleteTodoModal
            onClose={() => setIsDeleteOpen(false)}
            todo={selectedTodo}
            onDelete={handleDeleteTodo}
          />
        )}
      </div>
    </>
  );
}

export default App;
