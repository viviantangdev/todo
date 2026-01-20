import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button type='button' aria-label='Toggle theme' onClick={toggleTheme}>
      {theme === 'light' ? (
        <Moon className='stroke-1 ' />
      ) : (
        <Sun className='stroke-1' />
      )}
    </button>
  );
};
