import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TodosProvider } from '../context/todosContext';
import { useTodos } from './useTodos';

describe('useTodos', () => {
  it('should throw error when used outside TodosProvider', () => {
    expect(() => renderHook(() => useTodos())).toThrowError(
      'useTodos must be used within a TodosProvider',
    );
  });

  it('should return context when used inside TodosProvider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TodosProvider>{children}</TodosProvider>
    );
    const { result } = renderHook(() => useTodos(), { wrapper });

    expect(result.current).toHaveProperty('todos');
    expect(result.current).toHaveProperty('addTodo');
    expect(result.current).toHaveProperty('deleteTodo');
    expect(result.current).toHaveProperty('editTodo');
  });
});
