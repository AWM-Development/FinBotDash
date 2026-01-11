# FinBot Dash - Atlas Allocator

AI-Augmented Investing Dashboard

A modern React TypeScript dashboard for managing momentum-based investment strategies with AI-powered rebalancing recommendations, tax-loss harvesting, and comprehensive portfolio analytics.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This will:
1. Run TypeScript type checking (`tsc`)
2. Build optimized production bundle with Vite
3. Output to `dist/` directory

### Preview Production Build

```bash
npm run preview
```

## 🧪 Testing

This project uses **Vitest** and **React Testing Library** with comprehensive test coverage targeting 100%.

### Run Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (development)
npm test -- --watch

# Run tests with interactive UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

### Test Coverage

- ✅ **Entity Tests**: All entity files (AuditLog, Holding, RebalancePacket, Strategy, TLHOpportunity) have comprehensive validation, factory function, and utility tests
- ✅ **Utility Tests**: All utility functions (`utils.ts`, `lib/utils.ts`) are fully tested
- ✅ **Component Tests**: Extensive component tests for UI components, shared components, dashboard components, packet components, and charts
- ✅ **Total**: 260 tests passing with high coverage

### Writing Tests

Tests are located in:
- `src/components/__tests__/` - UI component tests
- `src/test/components/` - Feature component tests  
- `src/test/entities/` - Entity validation and utility tests
- `src/test/lib/` - Library utility tests

Test setup is configured in `src/test/setup.ts` with React Testing Library and jest-dom matchers.

## 🛠 Tech Stack

### Core Framework
- **React 18.2** - UI framework with modern hooks
- **TypeScript 5.3** - Full type safety throughout the application
- **Vite 5.0** - Lightning-fast build tool and dev server

### Routing & Navigation
- **React Router 6.20** - Client-side routing with type-safe page navigation

### Styling
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **tailwindcss-animate** - Animation utilities
- **PostCSS** - CSS processing

### UI Component Library
- **shadcn/ui** - High-quality, accessible component library
- **Radix UI** - Headless UI primitives:
  - `@radix-ui/react-dialog` - Modal dialogs
  - `@radix-ui/react-dropdown-menu` - Dropdown menus
  - `@radix-ui/react-accordion` - Collapsible sections
  - `@radix-ui/react-select` - Select inputs
  - `@radix-ui/react-switch` - Toggle switches
  - `@radix-ui/react-checkbox` - Checkboxes
  - `@radix-ui/react-tooltip` - Tooltips
  - `@radix-ui/react-label` - Accessible labels
  - `@radix-ui/react-slot` - Composition utilities

### Icons & Visualizations
- **Lucide React 0.294** - Comprehensive icon library
- **Recharts 2.10** - Composable charting library for React

### Utilities
- **clsx** - Conditional class name utility
- **tailwind-merge** - Merge Tailwind classes intelligently
- **class-variance-authority** - Component variant management

### Testing
- **Vitest 1.0** - Fast unit test framework (Vite-native)
- **React Testing Library 14.1** - Component testing utilities
- **@testing-library/jest-dom** - Custom Jest matchers for DOM
- **@testing-library/user-event** - User interaction simulation
- **@vitest/coverage-v8** - Code coverage reporting
- **jsdom 23.0** - DOM implementation for testing

### Development Tools
- **TypeScript ESLint** - TypeScript-specific linting rules
- **ESLint** - Code quality and style enforcement
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
FinBotDash/
├── Components/           # Reusable React components
│   ├── charts/          # Chart components (AllocationDonut, EquityCurve, DrawdownChart)
│   ├── dashboard/       # Dashboard-specific components (TodayStatus, PortfolioSnapshot, etc.)
│   ├── help/            # Help/onboarding components
│   ├── packet/          # Rebalance packet components
│   ├── shared/          # Shared/common components (MetricCard, StatusBadge, EmptyState)
│   └── ui/              # Base UI components (Button, Card, Input, etc. - shadcn/ui)
├── Entities/            # TypeScript entity definitions and utilities
│   ├── AuditLog.ts      # Audit log entity with validation
│   ├── Holding.ts       # Portfolio holding entity with calculations
│   ├── RebalancePacket.ts  # Rebalance packet entity with trade utilities
│   ├── Strategy.ts      # Strategy configuration entity
│   └── TLHOpportunity.ts  # Tax-loss harvesting opportunity entity
├── Pages/               # Main page components (routes)
│   ├── Dashboard.tsx    # Main dashboard page
│   ├── Signals.tsx      # Strategy signals and rankings
│   ├── RebalancePacket.tsx  # Monthly rebalance packet review
│   ├── Portfolio.tsx    # Current holdings view
│   ├── Performance.tsx  # Performance metrics and charts
│   ├── Risk.tsx         # Risk analysis and metrics
│   ├── TaxTLH.tsx       # Tax-loss harvesting opportunities
│   ├── LogsAudit.tsx    # Audit trail and logs
│   └── Settings.tsx     # Strategy and system settings
├── Layout.tsx           # Main application layout with sidebar
├── src/
│   ├── App.tsx          # Main app component with routing
│   ├── main.tsx         # Application entry point
│   ├── index.css        # Global styles and Tailwind imports
│   ├── components/      # Legacy component tests location
│   └── test/            # Test files
│       ├── setup.ts     # Test configuration and setup
│       ├── entities/    # Entity validation tests
│       ├── components/  # Component tests
│       └── lib/         # Utility function tests
├── lib/                 # Utility libraries
│   └── utils.ts         # Class name merging utility (cn function)
├── utils.ts             # Application utilities (page URL generation)
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── tsconfig.node.json   # TypeScript config for Node.js files
├── vite.config.ts       # Vite build configuration
├── vitest.config.ts     # Vitest test configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── README.md            # This file
```

## 📝 TypeScript

This project is **fully converted to TypeScript**. All components, utilities, and entity files use TypeScript with strict type checking enabled.

### Key TypeScript Features

- **Strict Mode**: All strict checks enabled (`strict: true`)
- **Path Aliases**: Use `@/` prefix for imports from project root
- **Type-Safe Routing**: `PageName` type ensures correct route references
- **Entity Validation**: Runtime type validation functions for all entities
- **Component Props**: All components have explicit TypeScript interfaces

### Type Definitions

- All React components have typed props interfaces
- Entity types defined in `Entities/` directory
- Utility functions have explicit return types
- Recharts components use proper TypeScript types

## 🎨 Styling

### Tailwind CSS

The project uses Tailwind CSS for all styling. The configuration extends default Tailwind with:
- Custom color palette (indigo, slate, emerald, rose, amber)
- Custom animations via `tailwindcss-animate`
- Responsive breakpoints (sm, md, lg, xl)

### Design System

- **Colors**: Indigo (primary), Slate (neutral), Emerald (success), Rose (danger), Amber (warning)
- **Spacing**: Consistent spacing scale (Tailwind defaults)
- **Typography**: Inter font family (via Tailwind defaults)
- **Components**: shadcn/ui components provide consistent design patterns

### Responsive Design

- Mobile-first approach
- Breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px)
- Mobile sidebar implemented as Sheet component
- Responsive grid layouts throughout

## 🔌 Integration Points

### Backend API Integration

Currently, the application displays **mock data**. To integrate with a backend:

1. **Data Fetching**: Replace hardcoded data arrays with API calls
2. **State Management**: Consider adding React Query or SWR for server state
3. **Error Handling**: Add error boundaries and loading states
4. **API Client**: Create API client utilities in `lib/api/` or similar

### Expected Data Formats

The `Entities/` directory defines the expected data structures:
- `RebalancePacket` - Monthly rebalance recommendations
- `Holding` - Portfolio positions
- `AuditLog` - System events and user actions
- `Strategy` - Strategy configurations
- `TLHOpportunity` - Tax-loss harvesting opportunities

All entities have validation functions that can be used for runtime type checking of API responses.

## 📊 Features

### Dashboard
- Real-time portfolio snapshot
- Performance summary with sparklines
- Action items requiring attention
- AI-generated briefings

### Signals
- ETF rankings by momentum scores
- Trend filter status (200-day SMA)
- Historical signal changes
- Market regime indicators

### Rebalance Packet
- Target allocation recommendations
- Proposed trades with reasoning
- Tax-loss harvesting opportunities
- AI explanations for decisions
- Approval workflow

### Portfolio
- Current holdings breakdown
- Asset class allocation
- Gain/loss tracking
- Contribution schedule

### Performance
- Equity curve with benchmark comparison
- Calendar returns heatmap
- Risk metrics (Sharpe, Sortino, Calmar)
- Rolling returns analysis

### Risk
- Drawdown analysis (underwater plot)
- Volatility tracking vs target
- Regime timeline
- Risk events feed

### Tax & TLH
- Tax-loss harvesting opportunities
- Wash sale restriction tracking
- Realized gains/losses by year
- Holdings breakdown by tax lot

### Logs & Audit
- Complete audit trail
- Event filtering and search
- Decision transparency

### Settings
- Strategy configuration (locked for baseline)
- Risk parameters
- Rebalance schedule
- Universe management
- Data source configuration
- Notification preferences

## 🧩 Component Architecture

### Page Components
Located in `Pages/`, these are top-level route components that compose multiple feature components.

### Feature Components
Located in `Components/dashboard/`, `Components/packet/`, etc. - These are domain-specific components that handle particular features.

### UI Components
Located in `Components/ui/` - Base, reusable UI primitives built on Radix UI and styled with Tailwind.

### Chart Components
Located in `Components/charts/` - Wrapper components around Recharts that handle data formatting and styling.

## 🧪 Testing Strategy

### Entity Testing
- Validation function tests ensure type safety at runtime
- Factory function tests verify object creation
- Utility function tests (calculations, formatting, etc.)

### Component Testing
- Rendering tests verify component structure
- Interaction tests verify user actions
- Edge case handling (empty data, loading states, errors)
- Integration tests for component composition

### Test Utilities
- Custom render functions for components requiring providers (Router, etc.)
- Mock implementations for chart libraries (ResizeObserver)
- Test data factories for consistent test data

## 🔧 Development

### Code Quality

```bash
# Type checking
npm run build  # Includes tsc type checking

# Linting
npm run lint
```

### Type Checking

TypeScript strict mode is enabled with:
- `noUnusedLocals` - Warns about unused variables
- `noUnusedParameters` - Warns about unused function parameters
- `noFallthroughCasesInSwitch` - Prevents switch fallthrough bugs

### Path Aliases

Use `@/` prefix for imports from project root:
```typescript
import { Button } from "@/components/ui/button"
import { createPageUrl } from "@/utils"
```

## 📦 Build Output

Production builds output to `dist/` with:
- Optimized and minified JavaScript
- Extracted CSS
- Asset optimization
- Tree-shaking of unused code

## 🚀 Deployment

The built `dist/` directory contains a static site that can be deployed to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

## 📄 License

Private project

## 🤝 Contributing

This is a private project. For questions or issues, contact the maintainer.
