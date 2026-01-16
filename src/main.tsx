import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './context/themeContext.tsx';
import { TodosProvider } from './context/todosContext.tsx';
import './index.css';
import { TabsProvider } from './context/tabsContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <TabsProvider>
        <TodosProvider>
          <App />
        </TodosProvider>
      </TabsProvider>
    </ThemeProvider>
  </StrictMode>
);
