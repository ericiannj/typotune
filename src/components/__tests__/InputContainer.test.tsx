import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import InputContainer from '@/components/InputContainer';

describe('InputContainer', () => {
  it('shows the character count for the current value', () => {
    render(
      <InputContainer value="Hello world" onChange={vi.fn()} onClear={vi.fn()} />,
    );

    expect(screen.getByText('11 characters')).toBeInTheDocument();
  });

  it('disables the clear button when the value is blank', () => {
    render(<InputContainer value="   " onChange={vi.fn()} onClear={vi.fn()} />);

    expect(screen.getByRole('button', { name: /clear text/i })).toBeDisabled();
  });

  it('calls onClear when the clear button is enabled', async () => {
    const onClear = vi.fn();
    const user = userEvent.setup();

    render(
      <InputContainer value="Text" onChange={vi.fn()} onClear={onClear} />,
    );

    await user.click(screen.getByRole('button', { name: /clear text/i }));

    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('calls onChange when text is entered', () => {
    const onChange = vi.fn();

    render(<InputContainer value="" onChange={onChange} onClear={vi.fn()} />);
    fireEvent.change(screen.getByPlaceholderText(/type or paste/i), {
      target: { value: 'New text' },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
