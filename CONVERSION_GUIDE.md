# TypeScript Conversion Guide

This project has been partially converted to TypeScript. Here's what has been done and what remains:

## ✅ Completed

- TypeScript configuration files (tsconfig.json, tsconfig.node.json)
- Vite configuration converted to TypeScript (vite.config.ts)
- Vitest configuration (vitest.config.ts)
- Testing setup with Vitest + React Testing Library
- Utility files converted (utils.ts, lib/utils.ts)
- Main entry files converted (src/main.tsx, src/App.tsx)
- Key UI components converted (Button, Badge, Card, Input, Label, Switch)
- Example tests created (Button.test.tsx, Card.test.tsx)

## 📝 Remaining Files to Convert

### UI Components (`.jsx` → `.tsx`)
- Components/ui/accordion.jsx
- Components/ui/checkbox.jsx
- Components/ui/dialog.jsx
- Components/ui/dropdown-menu.jsx
- Components/ui/select.jsx
- Components/ui/sheet.jsx
- Components/ui/table.jsx
- Components/ui/textarea.jsx
- Components/ui/tooltip.jsx

### Pages (`.jsx` → `.tsx`)
- Pages/Dashboard.jsx
- Pages/Signals.jsx
- Pages/RebalancePacket.jsx
- Pages/Portfolio.jsx
- Pages/Performance.jsx
- Pages/Risk.jsx
- Pages/TaxTLH.jsx
- Pages/LogsAudit.jsx
- Pages/Settings.jsx

### Components (`.jsx` → `.tsx`)
- Components/help/HelpDrawer.jsx
- Components/packet/*.jsx
- Components/dashboard/*.jsx
- Components/charts/*.jsx
- Components/shared/*.jsx
- Components/UserNotRegisteredError.jsx
- Layout.jsx

### Entities (`.js` → `.ts`)
- Entities/Strategy.js
- Entities/RebalancePacket.js
- Entities/Holding.js
- Entities/AuditLog.js
- Entities/TLHOpportunity.js

### Config Files (`.js` → `.ts`)
- tailwind.config.js → tailwind.config.ts (optional, can stay .js)
- postcss.config.js → postcss.config.ts (optional, can stay .js)

## 🔄 Conversion Pattern

### For React Components:

**Before (.jsx):**
```jsx
export default function MyComponent({ prop1, prop2 }) {
  return <div>{prop1}</div>
}
```

**After (.tsx):**
```tsx
interface MyComponentProps {
  prop1: string
  prop2?: number
}

export default function MyComponent({ prop1, prop2 }: MyComponentProps) {
  return <div>{prop1}</div>
}
```

### For UI Components with forwardRef:

**Before (.jsx):**
```jsx
const Component = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={className} {...props} />
))
```

**After (.tsx):**
```tsx
export interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={className} {...props} />
  )
)
```

## 🧪 Running Tests

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## 📦 TypeScript Commands

```bash
# Type check
npm run build  # This runs tsc && vite build

# Lint TypeScript files
npm run lint
```

## 🎯 Next Steps

1. Convert remaining UI components (start with most used)
2. Convert Pages (can be done incrementally)
3. Convert Components (prioritize by usage)
4. Convert Entities (add proper types/models)
5. Add more comprehensive tests
6. Enable stricter TypeScript checks gradually
