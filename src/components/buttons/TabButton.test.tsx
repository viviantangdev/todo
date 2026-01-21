import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TabButton } from './TabButton';

describe('TabButton', () => {
  it('should render button with label', () => {
    const mockLabel = 'All';
    const mockOnClick = vi.fn();

    render(
      <TabButton label={mockLabel} onClick={mockOnClick} active={false} />,
    );

    expect(screen.getByLabelText(mockLabel)).toBeInTheDocument();
    expect(screen.getByText(mockLabel)).toBeInTheDocument();
  });

  it('should apply activeTab class when active is true', () => {
    const mockLabel = 'All';
    const mockOnClick = vi.fn();

    render(<TabButton label={mockLabel} onClick={mockOnClick} active={true} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('activeTab');
    expect(button).not.toHaveClass('tab');
  });

  it('should call onClick handler when button is clicked', async () => {
    const mockLabel = 'All';
    const mockOnClick = vi.fn();

    render(
      <TabButton label={mockLabel} onClick={mockOnClick} active={false} />,
    );

    await userEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalled();
  });
});
