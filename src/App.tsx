import { AlertTriangle, CircleCheckBig, X } from 'lucide-react';
import { useState } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import AddTodoInput from './components/AddTodoInput';
import CompleteButton from './components/CompleteButton';
import { EmptyState } from './components/EmptyState';
import { ModalDialog } from './components/ModalDialog';
import { TabButton } from './components/TabButton';
import { ThemeButton } from './components/ThemeButton';
import { TAB_CONFIG, type TabType } from './constants/tabs';
import type { TodoItem } from './context/todosContext';
import { useTabs } from './hooks/useTabs';
import { useTheme } from './hooks/useTheme';
import { useTodos } from './hooks/useTodos';

function App() {
  const {
    todos,
    completedTodos,
    unCompletedTodos,
    addTodo,
    deleteTodo,
    toggleComplete,
  } = useTodos();
  const { tabs, activeTab, updateActiveTab } = useTabs();
  const { theme } = useTheme();

  const [newTodo, setNewTodo] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | undefined>(
    undefined
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getFilteredTodos = (type: TabType) => {
    if (type === 'Active') return unCompletedTodos;
    if (type === 'Completed') return completedTodos;
    return todos;
  };

  const counts = {
    total: todos.length,
    active: unCompletedTodos.length,
    completed: completedTodos.length,
  };

  const subTitle = TAB_CONFIG[activeTab].subtitle(counts);
  const filteredTodos = getFilteredTodos(activeTab);

  const handleAddTodo = (todo: string) => {
    addTodo(todo);
    setNewTodo('');
  };

  const handleDialog = (todo: TodoItem) => {
    setSelectedTodo(todo);
    setIsDialogOpen(true);
  };

  const handleDeleteTodos = (id: string) => {
    setIsDialogOpen(false);

    deleteTodo(id);
  };

  return (
    <>
      <div className='relative content flex flex-col gap-5 p-4 h-screen w-full rounded-2xl lg:max-w-180 lg:m-auto'>
        <header>
          <div className='flex justify-between items-center'>
            <h1 className='flex items-center gap-1'>
              <CircleCheckBig className='completeIcon text-shadow-lg' />
              <span className='tracking-wider'>TODO</span>
            </h1>
            <ThemeButton />
          </div>
        </header>

        <main className='flex-1 flex flex-col gap-5 min-h-0'>
          <section>
            <AddTodoInput
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onSubmit={handleAddTodo}
            />
          </section>
          <section>
            <div className='flex flex-wrap gap-2'>
              {tabs.map((tab) => {
                const isActive = activeTab === tab.title;
                const count = TAB_CONFIG[tab.title].getCount(counts);

                return (
                  <TabButton
                    key={tab.title}
                    label={`${tab.title} (${count})`}
                    active={isActive}
                    onClick={() => updateActiveTab(tab.title)}
                  />
                );
              })}
            </div>
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
                      <button
                        aria-label='Delete todo'
                        onClick={() => handleDialog(todo)}
                        className='flex-none text-gray-500 hover:text-red-500'
                      >
                        <X className='h-5 w-5' />
                      </button>
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
        {isDialogOpen && (
          <ModalDialog
            onClose={() => setIsDialogOpen(false)}
            header={{
              title: 'Delete todo',
              headerIcon: { icon: AlertTriangle, styling: 'text-red-500' },
            }}
            content={
              <div className='flex flex-col items-center justify-center gap-3'>
                <p> Are you sure your want to delete this todo?</p>
                <span className='italic font-semibold'>
                  {selectedTodo!.title}
                </span>
              </div>
            }
            footerAcions={[
              <button
                onClick={() => setIsDialogOpen(false)}
                className='secondaryButton w-full'
              >
                Cancel
              </button>,
              <button
                onClick={() => handleDeleteTodos(selectedTodo!.id)}
                className='deleteButton w-full'
              >
                Delete
              </button>,
            ]}
          />
        )}
      </div>
    </>
  );
}

export default App;
