import type { Mock as VitestMock } from 'vitest';

declare global {
  type Mock<
    TArgs extends readonly unknown[] = any,
    TReturns = any,
  > = VitestMock<TArgs, TReturns>;
}

export {};
