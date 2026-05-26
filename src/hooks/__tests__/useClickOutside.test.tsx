import { render, screen } from '@testing-library/react';
import { useRef } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useClickOutside } from '../useClickOutside';

// Mock React hooks
vi.mock('react', async () => {
  const actualReact = await vi.importActual('react');
  return {
    ...actualReact,
    useRef: vi.fn(() => ({ current: null })),
    useEffect: vi.fn((callback) => callback()), // Execute the callback immediately
  };
});

function TestComponent({ onOutsideClick }: { onOutsideClick: () => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useClickOutside(ref, onOutsideClick);

  return (
    <div>
      <div data-testid="outside">outside</div>
      <div data-testid="inside" ref={ref}>inside</div>
    </div>
  );
}

describe('useClickOutside', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls handler on mousedown outside of the referenced element', () => {
    const handler = vi.fn();
    render(<TestComponent onOutsideClick={handler} />);

    const outside = screen.getByTestId('outside');

    outside.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does not call handler when clicking inside the referenced element', () => {
    const handler = vi.fn();
    render(<TestComponent onOutsideClick={handler} />);

    const inside = screen.getByTestId('inside');
    inside.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(handler).not.toHaveBeenCalled();
  });

  it('works with touchstart events outside', () => {
    const handler = vi.fn();
    render(<TestComponent onOutsideClick={handler} />);

    const outside = screen.getByTestId('outside');
    outside.dispatchEvent(new TouchEvent('touchstart', { bubbles: true }));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('removes listeners on unmount (no calls after unmount)', () => {
    const handler = vi.fn();
    const { unmount } = render(<TestComponent onOutsideClick={handler} />);
    unmount();

    // Dispatch events after unmount; handler should not be called
    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    document.body.dispatchEvent(new TouchEvent('touchstart', { bubbles: true }));
    expect(handler).not.toHaveBeenCalled();
  });
});


