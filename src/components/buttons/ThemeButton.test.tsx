import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';
import { useTheme } from '../../hooks/useTheme';
import { ThemeButton } from './ThemeButton';

// Mock useTheme hook
vi.mock('../../hooks/useTheme.tsx', () => ({ useTheme: vi.fn() }));
const mockUseTheme = vi.mocked(useTheme);

describe('ThemeButton', () => {
  it('should render button with aria-label and icon', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    });

    render(<ThemeButton />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument();
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('should call toggleTheme when button is clicked', async () => {
    const mockToggle = vi.fn();

    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggle,
    });

    render(<ThemeButton />);

    await userEvent.click(screen.getByRole('button'));
    expect(mockToggle).toHaveBeenCalled();
  });
});
