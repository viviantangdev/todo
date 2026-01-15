import { Moon, Sun } from 'lucide-react';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <header>
        <div className='flex justify-between items-center p-4'>
          <h1>Todo</h1>
          <button>
            {theme === 'light' ? (
              <Moon onClick={toggleTheme} />
            ) : (
              <Sun onClick={toggleTheme} />
            )}
          </button>
        </div>
      </header>
    </>
  );
}

export default App;
