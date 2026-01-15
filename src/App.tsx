import { CircleCheckBig, X } from 'lucide-react';
import { ThemeButton } from './components/ThemeButton';
import { useTodos } from './hooks/useTodos';

function App() {
  const { todos, deleteTodo, toggleComplete } = useTodos();

  return (
    <div className='p-4'>
      <header>
        <div className='flex justify-between items-center'>
          <h1>Todo</h1>
          <ThemeButton />
        </div>
      </header>
      <main>
        <ul className='space-y-2'>
          {todos.map((todo) => {
            return (
              <li
                key={todo.id}
                className='flex items-center justify-between gap-3 p-3 rounded-xl shadow-sm bg-white dark:bg-gray-800'
              >
                <div className='flex items-center gap-2 flex-1 min-w-0'>
                  <CircleCheckBig
                    onClick={() => toggleComplete(todo.id)}
                    className={`flex-none h-5 w-5 ${
                      todo.completed ? 'text-blue-500' : 'text-gray-500'
                    } cursor-pointer`}
                  />
                  <p className='flex-1 min-w-0 truncate'>{todo.title}</p>
                </div>
                <X
                  onClick={() => deleteTodo(todo.id)}
                  className='flex-none h-5 w-5 text-gray-500 hover:text-red-500 cursor-pointer'
                />
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default App;
