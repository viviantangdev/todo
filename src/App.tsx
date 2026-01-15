import { CircleCheckBig, X } from 'lucide-react';
import CompleteButton from './components/CompleteButton';
import { ThemeButton } from './components/ThemeButton';
import { useTodos } from './hooks/useTodos';

function App() {
  const { todos, deleteTodo, toggleComplete } = useTodos();

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
      <main>
        <ul className='space-y-2'>
          {todos.map((todo) => {
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
                  className=' flex-none p-3 text-gray-500 hover:text-red-500 cursor-pointer'
                >
                  <X className='h-5 w-5 ' />
                </button>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default App;
