import { CircleCheckBig, Plus, X } from 'lucide-react';
import { useState } from 'react';
import CompleteButton from './components/CompleteButton';
import { EmptyState } from './components/EmptyState';
import { TabButton } from './components/TabButton';
import { ThemeButton } from './components/ThemeButton';
import { TAB_CONFIG, type TabType } from './constants/tabs';
import { useTabs } from './hooks/useTabs';
import { useTodos } from './hooks/useTodos';

function App() {
  const {
    todos,
    completedTodos,
    unCompletedTodos,
    deleteTodo,
    toggleComplete,
  } = useTodos();
  const { tabs, activeTab, updateActiveTab } = useTabs();
  const { addTodo } = useTodos();

  const [newTodo, setNewTodo] = useState('');

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

  const handleGoToActive = () => {
    updateActiveTab('Active');
  };

  const handleAddTodo = (todo: string) => {
    addTodo(todo);
    setNewTodo('');
  };

  return (
    <div className=' space-y-5 p-4'>
      <header>
        <div className='flex justify-between items-center'>
          <h1 className='flex items-center gap-1'>
            <CircleCheckBig className='completeIcon text-shadow-lg' />
            <span className='tracking-wider'>TODO</span>
          </h1>
          <ThemeButton />
        </div>
      </header>
      <main className='space-y-4'>
        <section>
          <div className='group relative flex items-center gap-3 rounded-xl bg-white dark:bg-gray-800/70 border border-gray-200/80 dark:border-gray-700/60 p-3 shadow-sm transition-smooth focus-within:shadow-md focus-within:shadow-primary/10 focus-within:border-primary/40 dark:focus-within:border-primary/50 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600'>
            {/* Left icon – always visible, subtle */}
            <CircleCheckBig
              className='text-gray-400 dark:text-gray-500 transition-colors group-focus-within:text-primary/80'
              strokeWidth={2.5}
            />

            {/* Input */}
            <input
              placeholder='What needs to be done?'
              autoComplete='off'
              autoFocus={true} // true for instant focus on mount
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className='w-full bg-transparent outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddTodo(newTodo);
                }
              }}
            />

            {/* Floating Plus button – appears on focus/hover */}
            <button
              type='button'
              className='flex items-center justify-center rounded-full completeIcon opacity-0 group-focus-within:opacity-100 transition-smooth shadow-xl'
              aria-label='Add todo'
              onClick={() => handleAddTodo(newTodo)}
            >
              <Plus strokeWidth={2.5} />
            </button>
          </div>
        </section>
        <section>
          <div className='space-x-1'>
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
        <section className='space-y-2'>
          <p>{subTitle}</p>
          {filteredTodos.length === 0 ? (
            <EmptyState
              tab={activeTab}
              onAddTodo={() => console.log('Add todo')}
              onGoToActive={handleGoToActive}
            />
          ) : (
            <ul className='space-y-2'>
              {filteredTodos.map((todo) => {
                return (
                  <li
                    key={todo.id}
                    className='flex items-center justify-between gap-3 p-3 rounded-xl shadow-lg card'
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
                      onClick={() => deleteTodo(todo.id)}
                      className='flex-none text-gray-500 hover:text-red-500'
                    >
                      <X className='h-5 w-5 ' />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
