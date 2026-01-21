import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';
import type { TodoItem } from '../../context/todosContext';
import CompleteButton from './CompleteButton';

describe('CompleteButton', () => {
  it('should render button with aria-label and icon', () => {
    const mockTodoItem: TodoItem = {
      id: '1',
      title: 'testTodo',
      completed: false,
    };
    const mockOnClick = vi.fn();

    render(<CompleteButton item={mockTodoItem} onClick={mockOnClick} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByLabelText('Toggle complete todo')).toBeInTheDocument();
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('should apply completeIcon when completed is true', () => {
    const mockTodoItem: TodoItem = {
      id: '1',
      title: 'testTodo',
      completed: true,
    };
    const mockOnClick = vi.fn();

    render(<CompleteButton item={mockTodoItem} onClick={mockOnClick} />);

    const button = screen.getByRole('button');
    expect(button.querySelector('.completeIcon')).toBeInTheDocument();
    expect(button.querySelector('.unCompleteIcon')).not.toBeInTheDocument();
  });

  it('should apply unCompleteIcon when completed is false', () => {
    const mockTodoItem: TodoItem = {
      id: '1',
      title: 'testTodo',
      completed: false,
    };
    const mockOnClick = vi.fn();

    render(<CompleteButton item={mockTodoItem} onClick={mockOnClick} />);

    const button = screen.getByRole('button');
    expect(button.querySelector('.unCompleteIcon')).toBeInTheDocument();
    expect(button.querySelector('.completeIcon')).not.toBeInTheDocument();
  });

  it('should call onClick handler when button is clicked', async () => {
    const mockTodoItem: TodoItem = {
      id: '1',
      title: 'testTodo',
      completed: false,
    };
    const mockOnClick = vi.fn();

    render(<CompleteButton item={mockTodoItem} onClick={mockOnClick} />);

    await userEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalled();
  });
});
