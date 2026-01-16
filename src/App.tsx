import { CircleCheckBig, X } from 'lucide-react';
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
  }

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
