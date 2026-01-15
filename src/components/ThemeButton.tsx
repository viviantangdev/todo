import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button type='button' className='cursor-pointer'>
      {theme === 'light' ? (
        <Moon onClick={toggleTheme} />
      ) : (
        <Sun onClick={toggleTheme} />
      )}
    </button>
  );
};
