import { expect, afterEach, beforeAll, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom/vitest'

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers)

// Set up React testing environment
beforeAll(() => {
  // Ensure React is in development mode for tests
  if (typeof process !== 'undefined') {
    process.env.NODE_ENV = 'development'
  }
  // Enable React's act environment
  // @ts-ignore - IS_REACT_ACT_ENVIRONMENT is a React internal
  if (typeof globalThis !== 'undefined') {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true
  }

  // Mock ResizeObserver for recharts
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
})

// Cleanup after each test
afterEach(() => {
  cleanup()
})
