import { CircleCheckBig, X } from 'lucide-react';
import { useState } from 'react';
import AddTodoInput from './components/AddTodoInput';
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

  const handleAddTodo = (todo: string) => {
    addTodo(todo);
    setNewTodo('');
  };

  return (
    <div className='content flex flex-col gap-5 p-4 h-screen w-full rounded-2xl lg:max-w-180 lg:m-auto'>
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
