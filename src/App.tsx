import { CircleCheckBig } from 'lucide-react';
import { useState } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import AddTodoInput from './components/AddTodoInput';
import { ThemeButton } from './components/buttons/ThemeButton';
import { TodoTabs } from './components/buttons/TodoTabs';
import { DeleteTodoModal } from './components/modals/DeleteTodoModal';
import { EditTodoModal } from './components/modals/EditTodoModal';
import { TodoList } from './components/TodoList';
import type { TodoItem } from './context/todosContext';
import { useTabs } from './hooks/useTabs';
import { useTheme } from './hooks/useTheme';
import { useTodos } from './hooks/useTodos';
import type { MODAL_TYPE } from './utils/miscellaneous';
import { getTab, type TabType } from './utils/tabs';

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

  const handleModal = (todo: TodoItem, type: MODAL_TYPE) => {
    setSelectedTodo(todo);

    if (type === 'EDIT') {
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
      <div className='relative content flex flex-col p-4 h-screen w-full lg:rounded-2xl lg:max-w-180 lg:m-auto'>
        <header className='mb-5'>
          <div className='flex justify-between items-center'>
            <h1 className='flex items-center gap-1'>
              <CircleCheckBig className='completeIcon text-shadow-lg' />
              <span className='tracking-wider'>TODO</span>
            </h1>
            <ThemeButton />
          </div>
        </header>

        <main className='flex-1 flex flex-col gap-8 min-h-0 overflow-y-auto'>
          <section>
            <AddTodoInput
              value={newTodo}
              onChange={setNewTodo}
              onSubmit={handleAddTodo}
            />
          </section>
          <section>
            <TodoTabs counts={counts} />
          </section>
          <section className='flex-1 flex flex-col gap-2 min-h-0'>
            <p>{subTitle}</p>
            <TodoList
              todos={filteredTodos}
              onOpenModal={handleModal}
              onToggleComplete={toggleComplete}
              newTodoValue={newTodo}
              onChangeNewTodo={setNewTodo}
              onAddTodo={handleAddTodo}
            />
          </section>
        </main>
        <footer className='shrink-0 mt-5'>
          <div className='text-xs opacity-50'>
            <span>&copy; {new Date().getFullYear()} </span>
            <a
              href='https://viviantangdev.netlify.app/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Vivian Tang
            </a>
          </div>
        </footer>
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
