# FinBot Dash - Atlas Allocator

AI-Augmented Investing Dashboard

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Testing

### Run Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - UI component library
- **Lucide React** - Icon library
- **Radix UI** - Headless UI primitives
- **Vitest** - Testing framework
- **React Testing Library** - Component testing utilities
- **Recharts** - Charting library

## Project Structure

- `/Pages` - Main page components
- `/Components` - Reusable UI components
- `/Entities` - Data models and entities
- `/src` - Entry point and app configuration
  - `/src/components/__tests__` - Component tests
  - `/src/test` - Test setup files

## TypeScript

This project is being migrated to TypeScript. See [CONVERSION_GUIDE.md](./CONVERSION_GUIDE.md) for details on the conversion status and patterns.

## Development

### Type Checking

The build command includes TypeScript type checking:

```bash
npm run build
```

### Linting

```bash
npm run lint
```

