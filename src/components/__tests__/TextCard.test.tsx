import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import TextCard from '@/components/TextCard';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('TextCard', () => {
  it('disables the copy button when no copy text is provided', () => {
    render(
      <TextCard title="Improved Text" showCopyButton>
        Empty
      </TextCard>,
    );

    expect(screen.getByRole('button', { name: /copy/i })).toBeDisabled();
  });

  it('uses the custom copy callback when provided', async () => {
    const onCopy = vi.fn();
    const user = userEvent.setup();

    render(
      <TextCard
        title="Improved Text"
        showCopyButton
        copyText="Improved copy"
        onCopy={onCopy}
      >
        Improved copy
      </TextCard>,
    );

    await user.click(screen.getByRole('button', { name: /copy/i }));

    expect(onCopy).toHaveBeenCalledTimes(1);
  });

  it('falls back to the Clipboard API when no custom callback is provided', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    render(
      <TextCard title="Improved Text" showCopyButton copyText="Improved copy">
        Improved copy
      </TextCard>,
    );

    await user.click(screen.getByRole('button', { name: /copy/i }));

    expect(writeText).toHaveBeenCalledWith('Improved copy');
  });
});
