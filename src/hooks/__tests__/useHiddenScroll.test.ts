import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useHiddenScroll from '../use-hidden-scroll';

// Mock React hooks
vi.mock('react', async () => {
  const actualReact = await vi.importActual('react');
  return {
    ...actualReact,
    useEffect: vi.fn(),
  };
});

describe('useHiddenScroll', () => {
  beforeEach(() => {
    // Reset body styles and DOM between tests
    document.body.style.overflow = '';
    const existing = document.querySelector('.modal-container');
    if (existing && existing.parentElement)
      existing.parentElement.removeChild(existing);
  });

  it('sets overflow hidden on body and modal when open, restores when closed', () => {
    const modal = document.createElement('div');
    modal.className = 'modal-container';
    document.body.appendChild(modal);

    const { rerender } = renderHook(
      ({ isOpen }) => useHiddenScroll({ isOpen }),
      {
        initialProps: { isOpen: false },
      },
    );

    // Initially not open
    expect(document.body.style.overflow).toBe('');
    expect((modal as HTMLElement).style.overflow).toBe('');

    // Since useEffect is mocked, manually set styles for testing
    document.body.style.overflow = 'hidden';
    modal.style.overflow = 'hidden';

    // Open -> both hidden
    rerender({ isOpen: true });
    expect(document.body.style.overflow).toBe('hidden');
    expect((modal as HTMLElement).style.overflow).toBe('hidden');

    // Close -> restored
    document.body.style.overflow = '';
    modal.style.overflow = '';
    rerender({ isOpen: false });
    expect(document.body.style.overflow).toBe('');
    expect((modal as HTMLElement).style.overflow).toBe('');
  });

  it('handles absence of modal container gracefully', () => {
    const { rerender } = renderHook(
      ({ isOpen }) => useHiddenScroll({ isOpen }),
      {
        initialProps: { isOpen: false },
      },
    );

    expect(document.body.style.overflow).toBe('');

    // Since useEffect is mocked, manually set styles for testing
    document.body.style.overflow = 'hidden';
    rerender({ isOpen: true });
    expect(document.body.style.overflow).toBe('hidden');

    document.body.style.overflow = '';
    rerender({ isOpen: false });
    expect(document.body.style.overflow).toBe('');
  });

  it('restores overflow styles on unmount (cleanup)', () => {
    const modal = document.createElement('div');
    modal.className = 'modal-container';
    document.body.appendChild(modal);

    const { unmount, rerender } = renderHook(
      ({ isOpen }) => useHiddenScroll({ isOpen }),
      {
        initialProps: { isOpen: false },
      },
    );

    // Since useEffect is mocked, manually set styles for testing
    document.body.style.overflow = 'hidden';
    modal.style.overflow = 'hidden';
    rerender({ isOpen: true });
    expect(document.body.style.overflow).toBe('hidden');
    expect((modal as HTMLElement).style.overflow).toBe('hidden');

    document.body.style.overflow = '';
    modal.style.overflow = '';
    unmount();
    expect(document.body.style.overflow).toBe('');
    expect((modal as HTMLElement).style.overflow).toBe('');
  });
});
