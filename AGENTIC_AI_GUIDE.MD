# FinBot Dash - Agentic AI Integration Guide

**Purpose**: Comprehensive technical documentation for AI agents and supervisory systems to understand, modify, and integrate with the FinBot Dash frontend application.

**Target Audience**: Agentic AI systems with large context windows that need to understand the complete frontend architecture, data structures, component hierarchy, routing, state management, and integration points for backend connectivity.

**Last Updated**: Current as of full TypeScript conversion and test suite implementation

---

## Table of Contents

1. [Application Overview](#application-overview)
2. [Architecture & Design Patterns](#architecture--design-patterns)
3. [Technology Stack Deep Dive](#technology-stack-deep-dive)
4. [File Structure & Organization](#file-structure--organization)
5. [Data Models & Entities](#data-models--entities)
6. [Routing & Navigation System](#routing--navigation-system)
7. [Component Hierarchy & Composition](#component-hierarchy--composition)
8. [State Management](#state-management)
9. [Styling System](#styling-system)
10. [Data Flow & Integration Points](#data-flow--integration-points)
11. [Testing Architecture](#testing-architecture)
12. [Build & Development Workflow](#build--development-workflow)
13. [Backend Integration Specifications](#backend-integration-specifications)
14. [Modification Patterns](#modification-patterns)
15. [Common Tasks & Solutions](#common-tasks--solutions)

---

## Application Overview

### Purpose
FinBot Dash (Atlas Allocator) is a React TypeScript dashboard application for managing momentum-based investment strategies. It provides:
- Portfolio visualization and management
- AI-powered rebalancing recommendations
- Tax-loss harvesting opportunity identification
- Performance analytics and risk metrics
- Strategy configuration and backtesting
- Audit trails for compliance and transparency

### Application Type
- **SPA (Single Page Application)**: Client-side routing with React Router
- **Type**: Dashboard/Admin Interface
- **State Management**: Local component state (React hooks) - NO global state management library
- **Data Layer**: Currently uses hardcoded mock data - **READY FOR BACKEND INTEGRATION**
- **Build Tool**: Vite 5.0 with TypeScript
- **Testing**: Vitest + React Testing Library with 260+ tests

### Key Characteristics
- **Fully TypeScript**: 100% TypeScript conversion with strict type checking
- **Component-Based**: Modular React component architecture
- **Responsive Design**: Mobile-first Tailwind CSS implementation
- **Type-Safe**: End-to-end type safety from entities to UI components
- **Test-Driven**: Comprehensive test coverage targeting 100%
- **Accessible**: Built on Radix UI primitives for accessibility compliance

---

## Architecture & Design Patterns

### Application Architecture Pattern
**Pattern**: Component Composition with Layered Architecture

```
┌─────────────────────────────────────────┐
│         Application Shell (Layout)      │
│  ┌──────────┐  ┌─────────────────────┐ │
│  │ Sidebar  │  │   Main Content      │ │
│  │ (Nav)    │  │   (Route Content)   │ │
│  └──────────┘  └─────────────────────┘ │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│         Page Components (Routes)        │
│  Dashboard | Signals | Portfolio | etc. │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│      Feature Components (Domain)        │
│  TodayStatus | TargetAllocation | etc.  │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│    UI Primitives (shadcn/ui + Radix)    │
│  Button | Card | Table | Dialog | etc.  │
└─────────────────────────────────────────┘
```

### Design Patterns Used

1. **Component Composition**: Small, focused components composed into larger features
2. **Props Interface Pattern**: All components use explicit TypeScript interfaces for props
3. **Factory Pattern**: Entity files include factory functions for creating validated objects
4. **Validation Pattern**: Runtime type validation using TypeScript type guards
5. **Default Props Pattern**: Components use default parameter values for optional props
6. **Container/Presentational Pattern**: Pages (containers) compose presentational components

### State Management Approach

**Current State**: Local component state using React hooks (`useState`)

- No global state management (Redux, Zustand, Context API)
- Each component manages its own state
- Parent-to-child data flow via props
- Child-to-parent communication via callback functions

**State Locations**:
- `Layout.tsx`: Selected strategy, mobile menu state
- `Pages/Signals.tsx`: Filter states (asset class, eligibility)
- `Pages/TaxTLH.tsx`: TLH opportunity state
- `Pages/Settings.tsx`: Form field states
- `Pages/Performance.tsx`: Benchmark selection, tax view toggle
- `Pages/Portfolio.tsx`: View toggle (ticker vs asset class)
- `Components/packet/ApprovalWorkflow.tsx`: Workflow status, notes, deviation dialog state

**Future State Management**: When integrating with backend, consider:
- React Query / SWR for server state
- Zustand or Context API for global UI state (selected strategy, current user)
- Local state remains appropriate for form inputs and temporary UI states

---

## Technology Stack Deep Dive

### React 18.2
- **JSX Runtime**: Automatic (new JSX transform)
- **React Version**: 18.2.0 with concurrent features
- **Strict Mode**: Enabled in `src/main.tsx`
- **Key Features Used**:
  - Functional components with hooks
  - `useState` for local state
  - No `useEffect` currently (all data is mock/static)
  - React Router hooks (`useLocation`)
  - Forward refs for Radix UI components

### TypeScript 5.3
- **Strict Mode**: Enabled with all strict checks
- **Target**: ES2020
- **Module**: ESNext
- **JSX**: `react-jsx` (automatic JSX transform)
- **Path Resolution**: Bundler mode (Vite-specific)
- **Key Configuration**:
  ```json
  {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
  ```

### Vite 5.0
- **Plugins**: `@vitejs/plugin-react` with automatic JSX
- **Build Tool**: esbuild + Rollup (production)
- **Dev Server**: Native ESM with HMR
- **Path Aliases**: `@/` resolves to project root
- **Optimization**: Tree-shaking, code splitting, asset optimization

### React Router 6.20
- **Routing Type**: Client-side hashless routing
- **Pattern**: Nested routes with layout wrapper
- **Route Structure**:
  ```
  / → Dashboard
  /dashboard → Dashboard
  /signals → Signals page
  /rebalance-packet → RebalancePacket page
  /portfolio → Portfolio page
  /performance → Performance page
  /risk → Risk page
  /tax-tlh → TaxTLH page
  /logs-audit → LogsAudit page
  /settings → Settings page
  ```
- **Navigation**: Programmatic via `Link` components, URL generation via `createPageUrl()` utility

### Tailwind CSS 3.3
- **Configuration**: Extended default config with custom colors
- **Customization**: 
  - Color palette: indigo (primary), slate (neutral), emerald (success), rose (danger), amber (warning)
  - Animations: `tailwindcss-animate` plugin
  - Typography: Default Inter font
- **Usage Pattern**: Utility-first classes, no CSS modules or styled-components
- **Responsive**: Mobile-first breakpoints (sm: 640px, md: 768px, lg: 1024px)

### shadcn/ui + Radix UI
- **Architecture**: shadcn/ui is a collection of pre-styled Radix UI components
- **Installation Pattern**: Components copied into `Components/ui/` (not installed via npm)
- **Base Primitives**: All accessible, keyboard navigable, ARIA compliant
- **Styling**: Tailwind CSS classes with `cn()` utility for conditional classes
- **Variants**: Uses `class-variance-authority` for component variants (Button, Badge)

### Recharts 2.10
- **Chart Types Used**:
  - `PieChart` (AllocationDonut)
  - `LineChart` (EquityCurve, PerformanceSummary sparkline)
  - `AreaChart` (DrawdownChart)
- **Responsive**: All charts wrapped in `ResponsiveContainer`
- **Customization**: Custom tooltips, axis formatters, color schemes
- **Testing**: Mocked in tests (ResizeObserver polyfill needed)

### Vitest 1.0
- **Test Runner**: Vite-native test framework
- **Environment**: jsdom (browser-like environment)
- **Globals**: Enabled (describe, it, expect available without imports)
- **Setup File**: `src/test/setup.ts` - configures React Testing Library, jest-dom matchers, ResizeObserver mock
- **Coverage**: @vitest/coverage-v8 provider

---

## File Structure & Organization

### Root Level Files

```
FinBotDash/
├── index.html                    # HTML entry point (references src/main.tsx)
├── Layout.tsx                    # Main application layout component
├── utils.ts                      # Application-level utilities (page URL generation)
├── package.json                  # Dependencies and npm scripts
├── tsconfig.json                 # TypeScript config for application code
├── tsconfig.node.json            # TypeScript config for Node.js tools (Vite, Vitest)
├── vite.config.ts                # Vite build configuration
├── vitest.config.ts              # Vitest test configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration (processes Tailwind)
└── README.md                     # Human-readable documentation
```

### Source Directory (`src/`)

```
src/
├── main.tsx                      # React application entry point
├── App.tsx                       # Root component with routing configuration
├── index.css                     # Global styles, Tailwind directives (@tailwind base/components/utilities)
├── components/
│   └── __tests__/               # Legacy test location (Button, Card, Input tests)
└── test/                        # Main test directory
    ├── setup.ts                 # Test configuration, mocks, globals
    ├── entities/                # Entity validation and utility tests
    │   ├── AuditLog.test.ts
    │   ├── Holding.test.ts
    │   ├── RebalancePacket.test.ts
    │   ├── Strategy.test.ts
    │   └── TLHOpportunity.test.ts
    ├── components/              # Component tests organized by feature
    │   ├── ui/                  # UI component tests
    │   ├── shared/              # Shared component tests
    │   ├── charts/              # Chart component tests
    │   ├── dashboard/           # Dashboard component tests
    │   └── packet/              # Rebalance packet component tests
    ├── lib/                     # Utility function tests
    │   └── utils.test.ts
    └── utils.test.ts            # Application utility tests
```

### Pages Directory (`Pages/`)

All page components are route-level components that compose feature components:

```
Pages/
├── Dashboard.tsx                 # Main dashboard (/dashboard, /)
├── Signals.tsx                   # Strategy signals and rankings (/signals)
├── RebalancePacket.tsx           # Monthly rebalance packet (/rebalance-packet)
├── Portfolio.tsx                 # Current holdings view (/portfolio)
├── Performance.tsx               # Performance metrics (/performance)
├── Risk.tsx                      # Risk analysis (/risk)
├── TaxTLH.tsx                    # Tax-loss harvesting (/tax-tlh)
├── LogsAudit.tsx                 # Audit trail (/logs-audit)
└── Settings.tsx                  # Configuration (/settings)
```

**Page Component Pattern**:
- Import feature components from `Components/`
- Use layout grid system (Tailwind grid)
- Manage local state for filters, toggles, selections
- Currently use hardcoded mock data (ready for API integration)
- Export default function component
- TypeScript interfaces for all props (if any)

### Components Directory (`Components/`)

Organized by feature/domain area:

```
Components/
├── ui/                          # Base UI components (shadcn/ui)
│   ├── button.tsx              # Button with variants (default, outline, ghost, secondary)
│   ├── card.tsx                # Card container (Card, CardHeader, CardContent, etc.)
│   ├── badge.tsx               # Status badges
│   ├── input.tsx               # Text input
│   ├── label.tsx               # Form labels
│   ├── select.tsx              # Dropdown select (Radix UI)
│   ├── checkbox.tsx            # Checkbox input
│   ├── switch.tsx              # Toggle switch
│   ├── textarea.tsx            # Multi-line text input
│   ├── table.tsx               # Table components (Table, TableHeader, TableBody, etc.)
│   ├── dialog.tsx              # Modal dialogs
│   ├── sheet.tsx               # Slide-out panels (mobile sidebar)
│   ├── dropdown-menu.tsx       # Dropdown menus
│   ├── accordion.tsx           # Collapsible sections
│   └── tooltip.tsx             # Hover tooltips
│
├── charts/                     # Chart wrapper components
│   ├── AllocationDonut.tsx    # Pie/donut chart for asset allocation
│   ├── EquityCurve.tsx        # Line chart for portfolio value over time
│   └── DrawdownChart.tsx      # Area chart for drawdown visualization
│
├── dashboard/                  # Dashboard-specific components
│   ├── TodayStatus.tsx        # Current status card (next rebalance, regime, risk posture)
│   ├── PortfolioSnapshot.tsx  # Portfolio overview with allocation chart
│   ├── PerformanceSummary.tsx # Performance metrics with sparkline chart
│   ├── ActionNeeded.tsx       # Action items list (links to other pages)
│   └── AIBrief.tsx            # AI-generated summary/explanation
│
├── packet/                     # Rebalance packet components
│   ├── TargetAllocation.tsx   # Target vs current allocation visualization
│   ├── ProposedTrades.tsx     # Trade recommendations table
│   ├── TaxNotes.tsx           # Tax considerations and TLH opportunities
│   ├── AIExplanation.tsx      # AI explanation of rebalance rationale
│   └── ApprovalWorkflow.tsx   # Approval workflow with state management
│
├── shared/                     # Shared/common components
│   ├── MetricCard.tsx         # Reusable metric display card
│   ├── StatusBadge.tsx        # Status badge with icons and colors
│   └── EmptyState.tsx         # Empty state placeholder component
│
├── help/                       # Help/onboarding
│   └── HelpDrawer.tsx         # Help drawer with accordion FAQ
│
└── UserNotRegisteredError.tsx  # Error boundary/state component (if needed)
```

### Entities Directory (`Entities/`)

TypeScript entity definitions with validation and utilities:

```
Entities/
├── AuditLog.ts                 # Audit log entity and validation
├── Holding.ts                  # Portfolio holding entity with calculations
├── RebalancePacket.ts          # Rebalance packet entity with trade utilities
├── Strategy.ts                 # Strategy configuration entity
└── TLHOpportunity.ts           # Tax-loss harvesting opportunity entity
```

**Entity File Structure Pattern**:
1. Type definitions (interfaces, type unions)
2. Validation functions (`validateEntityName`)
3. Factory functions (`createEntityName`)
4. Utility functions (calculations, formatting, queries)

### Library Directory (`lib/`)

```
lib/
└── utils.ts                    # Class name utility (cn function for Tailwind merging)
```

**Key Utility**: `cn(...inputs)` - Merges Tailwind classes using `clsx` and `tailwind-merge`. Critical for conditional styling and variant management.

---

## Data Models & Entities

### Entity: AuditLog

**File**: `Entities/AuditLog.ts`

**Purpose**: Tracks all system events, user actions, and decision points for audit trails.

**Type Definition**:
```typescript
export type AuditLogEventType =
  | "packet_generated"
  | "data_update"
  | "signals_changed"
  | "packet_reviewed"
  | "packet_approved"
  | "override_recorded"
  | "trade_executed";

export interface AuditLog {
  id?: number;
  event_type: AuditLogEventType;
  description: string;
  ticker?: string | null;
  packet_month?: string | null;
  metadata?: AuditLogMetadata;  // { [key: string]: unknown }
  notes?: string | null;
  timestamp?: string;            // ISO 8601 format
  user?: string;                 // Default: "System"
}
```

**Validation Function**: `validateAuditLog(unknown): boolean` - Type guard that validates structure and enums.

**Factory Function**: `createAuditLog(eventType, description, options?)` - Creates validated AuditLog with defaults (timestamp, user).

**Utility Functions**:
- `formatAuditLog(log): string` - Formats log for display (description + ticker + month).

**Usage Locations**:
- `Pages/LogsAudit.tsx` - Displays audit log timeline
- Backend integration: All user actions should create AuditLog entries

**Integration Notes**:
- When integrating backend, POST new audit logs to `/api/audit-logs`
- Fetch audit logs from `/api/audit-logs?month=January+2026&type=packet_approved`
- Use `validateAuditLog()` to type-check API responses

---

### Entity: Holding

**File**: `Entities/Holding.ts`

**Purpose**: Represents a single portfolio position (ETF holding).

**Type Definition**:
```typescript
export type AssetClass = "equity" | "bonds" | "real_assets" | "cash";

export interface Holding {
  ticker: string;                  // Required
  shares: number;                  // Required, must be >= 0
  current_value?: number;          // Optional, current market value
  cost_basis?: number;             // Optional, purchase cost
  unrealized_gain_loss?: number;   // Optional, calculated if value and cost_basis provided
  asset_class?: AssetClass;        // Optional, defaults to "equity" in grouping
  purchase_date?: string;          // Optional, ISO date string
}
```

**Validation Function**: `validateHolding(unknown): boolean` - Validates structure, types, and constraints (non-negative numbers, valid asset class).

**Factory Function**: `createHolding(ticker, shares, options?)` - Creates validated Holding. Automatically calculates `unrealized_gain_loss` if both `current_value` and `cost_basis` provided.

**Utility Functions**:
- `calculateTotalValue(holdings[]): number` - Sums current_value across holdings
- `calculateTotalCostBasis(holdings[]): number` - Sums cost_basis
- `calculateTotalUnrealizedGainLoss(holdings[]): number` - Sums unrealized gains/losses
- `groupByAssetClass(holdings[]): Record<AssetClass, Holding[]>` - Groups holdings by asset class, defaults missing to "equity"

**Usage Locations**:
- `Pages/Portfolio.tsx` - Displays current holdings table
- `Components/dashboard/PortfolioSnapshot.tsx` - Portfolio summary
- Backend integration: Fetch from `/api/portfolio/holdings`, POST updates to `/api/portfolio/holdings/:id`

**Integration Notes**:
- Real-time price updates should update `current_value` (shares * current_price)
- Cost basis tracking required for tax calculations
- Purchase date needed for long-term vs short-term capital gains determination

---

### Entity: RebalancePacket

**File**: `Entities/RebalancePacket.ts`

**Purpose**: Represents a monthly rebalancing recommendation packet with target allocations, proposed trades, and explanations.

**Type Definition**:
```typescript
export type RebalancePacketStatus = "pending" | "reviewed" | "approved" | "executed";

export interface TargetAllocation {
  ticker: string;
  target_weight: number;      // 0-100 percentage
  current_weight: number;     // 0-100 percentage
}

export interface ProposedTrade {
  action: "Buy" | "Sell";
  ticker: string;
  amount: number;             // Dollar amount (positive)
  shares: number;             // Number of shares (positive)
  reason?: string;            // e.g., "Rebalance", "Regime shift", "TLH swap"
  notes?: string;             // Additional trade notes
}

export interface TaxNotes {
  tlh_opportunities?: Array<{
    ticker: string;
    unrealized_loss: number;
    replacement: string;
    estimated_savings: number;
  }>;
  wash_sale_warnings?: Array<{
    ticker: string;
    sold_date: string;
    end_date: string;
    days_remaining: number;
  }>;
  estimated_realized_gain_loss?: number;
}

export interface AIExplanation {
  why_these_holdings?: string;
  risk_posture_change?: string;
  what_could_go_wrong?: string;
  what_would_cause_flip?: string[];  // Array of scenarios
}

export interface RebalancePacket {
  id?: number;
  month: string;                      // Required, e.g., "January 2026"
  strategy_id?: string;
  status?: RebalancePacketStatus;     // Default: "pending"
  target_allocations?: TargetAllocation[];
  proposed_trades?: ProposedTrade[];
  tax_notes?: TaxNotes;
  ai_explanation?: AIExplanation;
  regime?: string;                    // e.g., "Risk-On", "Choppy", "Risk-Off"
  risk_posture?: string;              // e.g., "Neutral", "Aggressive", "Defensive"
  reviewed_at?: string;               // ISO 8601 datetime
  approved_at?: string;               // ISO 8601 datetime
  reviewer_notes?: string;
  generated_at?: string;              // ISO 8601 datetime
}
```

**Validation Function**: `validateRebalancePacket(unknown): boolean` - Comprehensive validation including:
- Required `month` field
- Valid status enum
- Target allocations (weights 0-100, ticker required)
- Proposed trades (valid action, positive amounts/shares)

**Factory Function**: `createRebalancePacket(month, options?)` - Creates packet with defaults (status: "pending", generated_at: now).

**Utility Functions**:
- `calculateTotalTradeAmount(packet): number` - Calculates net trade amount (buys positive, sells negative)
- `getTradeCountsByAction(packet): { buy: number, sell: number }` - Counts trades by action type

**Usage Locations**:
- `Pages/RebalancePacket.tsx` - Main packet review page
- `Components/packet/*.tsx` - All packet sub-components
- Backend integration: Fetch from `/api/rebalance-packets/:month`, POST status updates to `/api/rebalance-packets/:id/status`

**Integration Notes**:
- Generated monthly by backend system
- Status transitions: pending → reviewed → approved → executed
- Approval triggers trade execution (separate backend process)
- AI explanations generated by backend AI service

---

### Entity: Strategy

**File**: `Entities/Strategy.ts`

**Purpose**: Represents a trading strategy configuration with settings and metadata.

**Type Definition**:
```typescript
export type StrategyStatus = "active" | "paper" | "archived";

export interface StrategySettings {
  momentum_weights?: {
    three_month: number;
    six_month: number;
    twelve_month: number;
  };
  trend_filter?: {
    enabled: boolean;
    sma_period?: number;          // Default: 200
  };
  selection_count?: number;       // Default: 3
  equal_weight?: boolean;         // Default: true
  volatility_targeting?: {
    enabled: boolean;
    target_volatility?: number;   // Default: 15
  };
  risk_free_rate?: number;        // Default: 4.5 (for Sharpe calculation)
  rebalance_day?: number | "first-trading" | "last-trading";  // Default: 1
}

export interface Strategy {
  id?: string;
  name: string;                   // Required
  version?: string;               // e.g., "1.0.0"
  description?: string;
  is_baseline?: boolean;          // Default: false (locked strategies)
  settings?: StrategySettings;
  status?: StrategyStatus;        // Default: "active"
  created_at?: string;            // ISO 8601 datetime
  updated_at?: string;            // ISO 8601 datetime
}
```

**Validation Function**: `validateStrategy(unknown): boolean` - Validates structure, types, and enum values.

**Factory Function**: `createStrategy(name, options?)` - Creates strategy with defaults (status: "active", is_baseline: false, timestamps).

**Utility Functions**:
- `isStrategyLocked(strategy): boolean` - Returns true if `is_baseline === true`
- `canEditStrategy(strategy): boolean` - Returns false if locked or archived
- `getDefaultStrategySettings(): StrategySettings` - Returns default settings object (can be cloned/modified)

**Usage Locations**:
- `Pages/Settings.tsx` - Strategy configuration page
- `Layout.tsx` - Strategy selector dropdown
- Backend integration: Fetch from `/api/strategies`, POST updates to `/api/strategies/:id` (if not locked)

**Integration Notes**:
- Baseline strategies (`is_baseline: true`) cannot be modified (locked)
- Strategy cloning creates new strategy with modified settings
- Settings changes trigger strategy backtesting/revalidation on backend

---

### Entity: TLHOpportunity

**File**: `Entities/TLHOpportunity.ts`

**Purpose**: Represents a tax-loss harvesting opportunity with wash sale restrictions.

**Type Definition**:
```typescript
export type TLHStatus = "available" | "added_to_packet" | "executed" | "expired";

export interface TLHOpportunity {
  id?: number;
  ticker: string;                      // Required
  unrealized_loss: number;             // Required, must be < 0
  replacement_ticker?: string;         // Wash-sale safe replacement ETF
  wash_sale_end_date?: string;         // ISO date, when restriction ends
  status?: TLHStatus;                  // Default: "available"
  notes?: string;
  detected_at?: string;                // ISO 8601 datetime
  estimated_savings?: number;          // Calculated: |loss| * (tax_bracket / 100)
  tax_bracket?: number;                // 0-100 percentage
}
```

**Validation Function**: `validateTLHOpportunity(unknown): boolean` - Validates structure, ensures `unrealized_loss < 0`, valid status enum, tax_bracket in range 0-100.

**Factory Function**: `createTLHOpportunity(ticker, unrealizedLoss, options?)` - Creates opportunity. Automatically calculates `estimated_savings` if `tax_bracket` provided.

**Utility Functions**:
- `calculateEstimatedSavings(unrealizedLoss, taxBracket): number` - Calculates tax savings: `|loss| * (tax_bracket / 100)`
- `isTLHOpportunityAvailable(opportunity): boolean` - Returns false if executed/expired or wash sale restriction active
- `isTLHOpportunityExpired(opportunity): boolean` - Returns true if loss >= 0 or wash sale date passed
- `getDaysUntilWashSaleEnd(opportunity): number | null` - Calculates days remaining until restriction ends (null if no restriction)

**Usage Locations**:
- `Pages/TaxTLH.tsx` - TLH opportunities page
- `Components/packet/TaxNotes.tsx` - Tax notes in rebalance packet
- Backend integration: Fetch from `/api/tlh-opportunities`, POST status updates to `/api/tlh-opportunities/:id/status`

**Integration Notes**:
- Detected automatically by backend system scanning holdings
- Wash sale tracking requires 30-day lookback/forward from sale date
- Replacement tickers must be "substantially similar" but not identical (IRS rules)
- Estimated savings calculated client-side or server-side (both implemented)

---

## Routing & Navigation System

### Route Configuration

**File**: `src/App.tsx`

**Pattern**: All routes wrapped in `Layout` component which provides sidebar navigation and header.

```typescript
// Route structure
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout><Dashboard /></Layout>} />
    <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
    <Route path="/signals" element={<Layout><Signals /></Layout>} />
    <Route path="/rebalance-packet" element={<Layout><RebalancePacket /></Layout>} />
    // ... etc
  </Routes>
</BrowserRouter>
```

**Active Route Detection**: `Layout` receives `currentPageName` prop from `AppRoutes` component which uses `useLocation()` hook to determine current page.

### Page Name Type System

**File**: `utils.ts`

```typescript
export type PageName = 
  | 'Dashboard'
  | 'Signals'
  | 'RebalancePacket'
  | 'Portfolio'
  | 'Performance'
  | 'Risk'
  | 'TaxTLH'
  | 'LogsAudit'
  | 'Settings';

export function createPageUrl(pageName: PageName): string {
  const pageMap: Record<PageName, string> = {
    Dashboard: '/dashboard',
    Signals: '/signals',
    RebalancePacket: '/rebalance-packet',
    Portfolio: '/portfolio',
    Performance: '/performance',
    Risk: '/risk',
    TaxTLH: '/tax-tlh',
    LogsAudit: '/logs-audit',
    Settings: '/settings',
  };
  return pageMap[pageName] || '/dashboard';
}
```

**Usage**: 
- `Layout.tsx` - Navigation items use `createPageUrl()` for type-safe routing
- `Components/dashboard/ActionNeeded.tsx` - Action links use `createPageUrl()` with `PageName` type

**Benefits**:
- Type safety: Cannot create invalid route references
- Centralized URL mapping: Change URL structure in one place
- IDE autocomplete: TypeScript suggests valid page names

### Navigation Component Structure

**File**: `Layout.tsx`

**Navigation Items Array**:
```typescript
const navItems: NavItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, page: "Dashboard" },
  { name: "Signals", icon: Signal, page: "Signals" },
  // ... etc
];
```

**Active State**: Determined by comparing `currentPageName` prop with `item.page`.

**Mobile Navigation**: Uses `Sheet` component (slide-out panel) on mobile, hidden on desktop (`lg:flex`).

**Badge Indicators**: "Rebalance Packet" nav item shows "Review" badge (hardcoded, should be conditional based on packet status).

---

## Component Hierarchy & Composition

### Layout Component

**File**: `Layout.tsx`

**Structure**:
```
Layout
├── Desktop Sidebar (lg:fixed, lg:flex)
│   ├── Header ("Atlas Allocator" branding)
│   ├── Navigation (navItems.map → Link components)
│   └── Footer (System Health indicator)
│
├── Mobile Header (lg:hidden, fixed top)
│   ├── Menu Button (Sheet trigger)
│   ├── Title
│   └── Notifications Button
│
└── Main Content Area (lg:pl-64)
    ├── Top Bar (desktop header)
    │   ├── Strategy Selector (DropdownMenu)
    │   ├── Month Selector (DropdownMenu)
    │   ├── Status Badge ("Needs Review")
    │   └── User Actions (HelpDrawer, Notifications, Avatar)
    │
    └── Page Content (children prop)
```

**State Management**:
- `selectedStrategy`: Currently selected strategy (default: first in array)
- `mobileOpen`: Mobile menu open/closed state

**Props Interface**:
```typescript
interface LayoutProps {
  children: React.ReactNode;
  currentPageName: PageName;
}
```

**Key Features**:
- Responsive: Desktop sidebar + mobile drawer
- Strategy switching: Dropdown to select active strategy (state managed locally)
- Month selector: Dropdown for selecting time period (hardcoded options, needs backend)
- System health indicator: Always shows "Healthy" (needs backend status)
- Active page highlighting: Visual indication of current route

### Dashboard Page

**File**: `Pages/Dashboard.tsx`

**Component Composition**:
```
Dashboard
├── Header (title + description)
└── Grid Layout (lg:grid-cols-3)
    ├── Left Column (lg:col-span-2)
    │   ├── Grid (md:grid-cols-2)
    │   │   ├── TodayStatus
    │   │   └── PortfolioSnapshot
    │   ├── PerformanceSummary
    │   └── AIBrief
    │
    └── Right Column
        ├── ActionNeeded
        └── Quick Stats Grid (2x2)
            ├── YTD Return
            ├── vs SPY
            ├── Max Drawdown
            └── Sharpe Ratio
```

**Data Flow**: All components use hardcoded mock data. No props passed, all have internal default values.

**Integration Points**:
- Replace hardcoded values with API data
- Add loading states during data fetch
- Add error boundaries for failed requests

### Signals Page

**File**: `Pages/Signals.tsx`

**Component Composition**:
```
Signals
├── Header (title + description)
├── Explainer Panel (Info card with strategy explanation)
├── Filters
│   ├── Filter Select (all/eligible/selected)
│   └── Asset Class Select (all/equity/bonds/real_assets/cash)
├── Signals Table
│   └── TableRows (signalsData.map)
│       └── Columns: Ticker, Name, Momentum, Trend, Eligible, Rank, Status
└── Signal History Card
    └── History Items (signalHistory.map)
```

**State Management**:
- `filter`: "all" | "eligible" | "selected" (default: "all")
- `assetClassFilter`: "all" | AssetClass (default: "all")

**Data Structures**:
```typescript
interface SignalData {
  ticker: string;
  name: string;
  assetClass: AssetClass;
  momentum: number;           // 0-10 scale (blended 3/6/12 month)
  trend: "above" | "below";   // Relative to 200-day SMA
  eligible: boolean;          // Above SMA AND momentum > threshold
  rank: number;               // Rank among eligible (1 = highest momentum)
  selected: boolean;          // Top 3 eligible are selected
}

interface SignalHistoryItem {
  month: string;
  selections: string[];       // Ticker symbols
  regime: string;             // "Risk-On", "Choppy", "Risk-Off"
  change: string | null;      // e.g., "IWM → QQQ" or null
}
```

**Filtering Logic**: Client-side filtering of `signalsData` array based on filter states.

**Integration Points**:
- Fetch signals from `/api/signals?month=January+2026`
- Real-time updates when signals change
- Historical signals from `/api/signals/history?limit=12`

### Rebalance Packet Page

**File**: `Pages/RebalancePacket.tsx`

**Component Composition**:
```
RebalancePacket
├── Header
│   ├── Title ("January 2026 Rebalance Packet")
│   └── Status Badge ("Needs Review")
├── Packet Info Bar (Card)
│   ├── Generated timestamp
│   ├── Strategy name
│   └── Validation status
└── Grid Layout (lg:grid-cols-3)
    ├── Main Content (lg:col-span-2)
    │   ├── TargetAllocation
    │   ├── ProposedTrades
    │   └── AIExplanation
    │
    └── Sidebar
        ├── TaxNotes
        └── ApprovalWorkflow
```

**Data Flow**: All sub-components use hardcoded data. `ApprovalWorkflow` receives `status="pending"` prop.

**Integration Points**:
- Fetch packet from `/api/rebalance-packets/January+2026`
- Status updates POST to `/api/rebalance-packets/:id/status`
- Approval triggers backend trade execution workflow

### Portfolio Page

**File**: `Pages/Portfolio.tsx`

**Component Composition**:
```
Portfolio
├── Header (title + description)
├── Summary Cards Grid (4 columns)
│   ├── Total Value
│   ├── Cash Available
│   ├── Holdings Count
│   └── Unrealized P/L
├── Cash Banner (if cash awaiting deployment)
└── Grid Layout (lg:grid-cols-3)
    ├── Holdings Table (lg:col-span-2)
    │   └── TableRows (holdings.map)
    │       └── Columns: Ticker, Name, Shares, Value, Cost Basis, Gain/Loss, Class
    │
    └── Sidebar
        ├── Allocation Chart Card
        │   ├── View Toggle (By Ticker / By Class)
        │   ├── PieChart (Recharts)
        │   └── Legend
        └── Contribution Schedule Card
```

**State Management**:
- `view`: "ticker" | "class" (default: "ticker") - Controls pie chart data source

**Data Structures**:
```typescript
interface Holding {
  ticker: string;
  name: string;
  shares: number;
  value: number;
  costBasis: number;
  assetClass: AssetClass;
}

// Calculated from holdings
const allocationByClass: AllocationByClass = {
  equity: 88580,      // Sum of equity holdings
  bonds: 0,
  real_assets: 31080,
  cash: 6510
};
```

**Calculations**:
- Total value: Sum of `holdings.map(h => h.value)`
- Total cost basis: Sum of `holdings.map(h => h.costBasis)`
- Unrealized P/L: `totalValue - totalCostBasis`
- Allocation by class: Reduce holdings into asset class buckets

**Integration Points**:
- Fetch holdings from `/api/portfolio/holdings`
- Real-time price updates (WebSocket or polling)
- Contribution schedule from `/api/portfolio/contributions`

### Performance Page

**File**: `Pages/Performance.tsx`

**Component Composition**:
```
Performance
├── Header
│   ├── Title + description
│   └── Controls
│       ├── Benchmark Select (SPY/VTI/60-40)
│       └── Tax View Toggle (Pre-Tax / After-Tax)
├── Metrics Grid (5 columns)
│   ├── CAGR
│   ├── Volatility
│   ├── Sharpe Ratio
│   ├── Max Drawdown
│   └── Win Rate
├── Equity Curve Card
│   └── EquityCurve component (LineChart)
└── Grid Layout (lg:grid-cols-2)
    ├── Calendar Returns Heatmap
    ├── Worst Months Card
    ├── Additional Metrics Card
    └── Rolling Returns Card
```

**State Management**:
- `benchmark`: "SPY" | "VTI" | "60-40" (default: "SPY")
- `taxView`: "pre-tax" | "after-tax" (default: "pre-tax")

**Data Structures**:
```typescript
interface EquityData {
  date: string;          // "Jan 22", "Feb 22", etc.
  portfolio: number;     // Portfolio value
  benchmark: number;     // Benchmark value (SPY, etc.)
}

interface CalendarReturns {
  [year: string]: {
    [month: string]: number | null;  // "Jan": 2.1, "Feb": 1.8, etc.
  };
}

interface WorstMonth {
  date: string;          // "Jun 2024"
  return: number;        // -1.2
  benchmark: number;     // -0.8
}
```

**Data Generation**: Currently uses `generateEquityData()` function creating 36 months of mock data. Should be replaced with API call.

**Integration Points**:
- Equity curve: `/api/performance/equity-curve?startDate=2022-01-01&endDate=2026-01-28`
- Calendar returns: `/api/performance/calendar-returns?year=2024`
- Metrics: `/api/performance/metrics?benchmark=SPY&taxView=pre-tax`
- Worst months: `/api/performance/worst-months?limit=3`

### Risk Page

**File**: `Pages/Risk.tsx`

**Component Composition**:
```
Risk
├── Header (title + description)
├── Current Risk Status Cards (4 columns)
│   ├── Current Drawdown
│   ├── Current Volatility
│   ├── Risk Posture
│   └── Exposure
├── Drawdown Chart Card
│   └── DrawdownChart component (AreaChart)
└── Grid Layout (lg:grid-cols-2)
    ├── Volatility vs Target Card
    ├── Exposure Summary Card
    ├── Regime Timeline Card
    └── Risk Events Feed Card
```

**Data Structures**:
```typescript
interface DrawdownData {
  date: string;
  drawdown: number;      // Negative percentage (e.g., -2.1)
}

interface RegimeHistoryItem {
  date: string;
  regime: "Risk-On" | "Choppy" | "Risk-Off";
  volatility: number;    // Annualized volatility percentage
}

interface RiskEvent {
  date: string;
  event: string;
  severity: "warning" | "info" | "alert";
}
```

**Data Generation**: Uses `generateDrawdownData()` creating 12 months of mock drawdown data.

**Integration Points**:
- Drawdown data: `/api/risk/drawdowns?startDate=2024-01-01`
- Current metrics: `/api/risk/current-status`
- Regime history: `/api/risk/regime-history?limit=5`
- Risk events: `/api/risk/events?severity=warning,alert`

### TaxTLH Page

**File**: `Pages/TaxTLH.tsx`

**Component Composition**:
```
TaxTLH
├── Header (title + description)
├── Summary Cards (4 columns)
│   ├── YTD Realized
│   ├── TLH Available
│   ├── Est. Tax Savings
│   └── Wash Sale Risks
├── TLH Opportunities Card
│   └── Table (opportunities.map)
│       └── Columns: Ticker, Unrealized Loss, Replacement, Est. Savings, Status, Actions
├── Grid Layout (lg:grid-cols-2)
│   ├── Wash Sale Calendar Card
│   └── Realized Gains/Losses Card
└── Tax Posture Card
    └── Holdings Breakdown Table (by tax lot holding period)
```

**State Management**:
- `opportunities`: TLHOpportunity[] (default: `tlhOpportunities` array)

**Functions**:
- `addToPacket(id)`: Updates opportunity status to "added_to_packet"

**Data Structures**: Uses interfaces defined in `Entities/TLHOpportunity.ts` plus:
```typescript
interface WashSaleRestriction {
  ticker: string;
  soldDate: string;
  endDate: string;
  daysRemaining: number;
}

interface RealizedGainsLosses {
  [year: string]: {
    shortTerm: number;
    longTerm: number;
    net: number;
  };
}

interface HoldingsBreakdown {
  ticker: string;
  value: number;
  shortTerm: number;      // Value held < 1 year
  longTerm: number;       // Value held >= 1 year
}
```

**Integration Points**:
- TLH opportunities: `/api/tlh-opportunities?status=available`
- Wash sale restrictions: `/api/tax/wash-sale-restrictions`
- Realized gains/losses: `/api/tax/realized-gains-losses?year=2025`
- Holdings breakdown: `/api/portfolio/holdings/tax-breakdown`
- Add to packet: POST `/api/rebalance-packets/:id/tlh-opportunities` (adds trade to packet)

### LogsAudit Page

**File**: `Pages/LogsAudit.tsx`

**Component Composition**:
```
LogsAudit
├── Header (title + description)
├── Filters Card
│   ├── Search Input
│   ├── Event Type Select
│   └── Month Select
├── Event Timeline Card
│   └── Event Items (filteredEvents.map)
│       ├── Icon + Color (based on event type)
│       ├── Description + Ticker Badge (if applicable)
│       ├── Metadata (timestamp, user, month)
│       ├── Notes (if present)
│       └── Type Badge
└── Export Button
```

**State Management**:
- `search`: string (default: "")
- `typeFilter`: "all" | EventType (default: "all")
- `monthFilter`: "all" | string (default: "all")

**Filtering Logic**: Client-side filtering of `auditEvents` array using all three filter states.

**Data Structures**: Uses `AuditLog` interface from `Entities/AuditLog.ts`. Display includes:
- Event icons (mapped by `event_type`)
- Event colors (mapped by `event_type`)
- Formatted timestamps
- Expandable notes sections

**Integration Points**:
- Fetch audit logs: `/api/audit-logs?search=packet&type=packet_approved&month=January+2026`
- Export: GET `/api/audit-logs/export?format=csv&filters=...`
- Real-time updates: WebSocket or polling for new audit events

### Settings Page

**File**: `Pages/Settings.tsx`

**Component Composition**:
```
Settings
├── Header (title + description)
├── Baseline Warning Card (if isBaseline)
│   └── Clone Strategy Button
└── Settings Sections (Cards)
    ├── Strategy Settings Card
    │   └── Read-only fields (if locked) or editable inputs
    ├── Risk Settings Card
    │   ├── Volatility Targeting Toggle
    │   ├── Target Volatility Input
    │   └── Risk-Free Rate Input
    ├── Rebalance Schedule Card
    │   ├── Rebalance Day Select
    │   └── Next Rebalance Info
    ├── Universe Card
    │   └── Universe ETFs Table
    ├── Data Sources Card
    │   ├── Price Data Status
    │   └── Last Update + Refresh Button
    └── Notifications Card
        ├── Notification Toggles (Switches)
        └── Notification Email Input
```

**State Management**:
- `isBaseline`: boolean (default: true) - Controls editability
- `riskFreeRate`: string (default: "4.5")
- `volatilityTarget`: boolean (default: true)
- `targetVol`: string (default: "15")
- `rebalanceDay`: string (default: "1")

**Data Structures**:
```typescript
interface UniverseETF {
  ticker: string;
  name: string;
  assetClass: string;  // "Equity", "Bonds", "Real Assets", "Cash"
}
```

**Locked State**: When `isBaseline === true`, all inputs are `disabled`. Strategy cloning creates editable copy.

**Integration Points**:
- Fetch strategy: `/api/strategies/:id`
- Update settings: POST `/api/strategies/:id/settings` (if not locked)
- Clone strategy: POST `/api/strategies/:id/clone`
- Universe management: GET/POST `/api/strategies/:id/universe`
- Data source status: GET `/api/data-sources/status`
- Refresh data: POST `/api/data-sources/refresh`
- Notification preferences: PUT `/api/user/preferences/notifications`

---

## Component Hierarchy & Composition (Detailed)

### Dashboard Components

#### TodayStatus

**File**: `Components/dashboard/TodayStatus.tsx`

**Purpose**: Displays current system status including next rebalance date, market regime, risk posture, and data freshness.

**Props Interface**:
```typescript
interface TodayStatusProps {
  nextRebalance?: string;      // Default: "Feb 3, 2026"
  regime?: string;             // Default: "Choppy Risk-On"
  riskPosture?: string;        // Default: "Neutral"
  dataFreshness?: string;      // Default: "today 4:00pm ET"
}
```

**Structure**:
- Card container
- 4 status rows:
  1. Next rebalance (Calendar icon)
  2. Regime (Activity icon + Badge)
  3. Risk posture (Shield icon + Badge)
  4. Prices updated (RefreshCw icon + timestamp)

**Integration**: Replace default props with API data from `/api/status/current`.

---

#### PortfolioSnapshot

**File**: `Components/dashboard/PortfolioSnapshot.tsx`

**Purpose**: Shows portfolio overview with total value, cash percentage, holdings count, and allocation chart.

**Props Interface**:
```typescript
interface PortfolioSnapshotProps {
  totalValue?: number;         // Default: 125420
  cashPercent?: number;        // Default: 5.2
  holdingsCount?: number;      // Default: 4
  allocation?: AllocationData; // Default: { equity: 62.5, bonds: 25.3, real_assets: 7.0, cash: 5.2 }
  size?: number;               // Chart size, passed to AllocationDonut (default: 140)
}
```

**Structure**:
- Card container
- 3-column grid with metrics
- `AllocationDonut` component (140px size)

**Integration**: Fetch from `/api/portfolio/snapshot` or calculate from holdings.

---

#### PerformanceSummary

**File**: `Components/dashboard/PerformanceSummary.tsx`

**Purpose**: Displays performance sparkline chart and period selector buttons.

**Props**: None (all data hardcoded internally)

**State Management**:
- `selectedPeriod`: string (default: "YTD") - Selected performance period
- `benchmark`: string (default: "SPY") - Selected benchmark

**Data**:
- `mockSparkline`: Array of 30 data points (generated)
- `performanceData`: Object mapping period to value and trend

**Structure**:
- Card container
- Header with benchmark selector buttons
- Sparkline chart (LineChart, 80px height)
- Period selector buttons (1M, 3M, YTD, 1Y, Since inception)
- Large performance value + trend icon + vs benchmark text

**Integration**: Replace with `/api/performance/summary?period=YTD&benchmark=SPY`.

---

#### ActionNeeded

**File**: `Components/dashboard/ActionNeeded.tsx`

**Purpose**: Lists action items requiring user attention with links to relevant pages.

**Props**: None (hardcoded `actions` array)

**Data Structure**:
```typescript
interface Action {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  page: PageName;              // Links to this page
  priority: "high" | "medium" | "low";
  completed: boolean;
}
```

**Structure**:
- Card container
- List of action items (actions.map)
  - Icon + color (based on priority)
  - Title + description
  - Link to page (via `createPageUrl()`)
  - Hover effects

**Integration**: Fetch from `/api/actions/needed` filtering `completed: false`, ordered by priority.

---

#### AIBrief

**File**: `Components/dashboard/AIBrief.tsx`

**Purpose**: AI-generated summary of recent changes, recommended actions, and risk notes.

**Props**: None (all content hardcoded)

**Structure**:
- Gradient card (indigo-50 to white)
- Header with Sparkles icon + "High Confidence" badge
- Sections:
  1. "What Changed" - Description of recent signal changes
  2. "Recommended Action" - Visual action chips (Sell X → Buy Y)
  3. "Risk note" - Warning about concentration or risks

**Integration**: Fetch from `/api/ai/brief?month=January+2026` - Backend AI service generates this content.

---

### Packet Components

#### TargetAllocation

**File**: `Components/packet/TargetAllocation.tsx`

**Purpose**: Visualizes target vs current allocation for each selected ETF.

**Props**: None (hardcoded `allocations` array)

**Data Structure**:
```typescript
interface Allocation {
  ticker: string;
  name: string;
  target: number;      // Target weight percentage (33.33)
  current: number;     // Current weight percentage (28.5)
}
```

**Structure**:
- Card container
- List of allocations (allocations.map)
  - Header: Ticker + name, diff percentage (colored)
  - Progress bar: Current weight (gray bar) + Target indicator (vertical line)
  - Footer: "Current: X%" and "Target: Y%"

**Calculations**:
- `diff = target - current` (positive = need to buy, negative = need to sell)
- Color: emerald (positive), rose (negative), slate (zero)

**Integration**: Part of `RebalancePacket` entity's `target_allocations` array.

---

#### ProposedTrades

**File**: `Components/packet/ProposedTrades.tsx`

**Purpose**: Table of recommended trades with actions, amounts, shares, reasons, and notes.

**Props**: None (hardcoded `trades` array)

**Data Structure**:
```typescript
interface Trade {
  action: "Buy" | "Sell";
  ticker: string;
  amount: number;        // Dollar amount
  shares: number;        // Number of shares
  reason: string;        // "Rebalance", "Regime shift", "Risk scaling", "TLH swap"
  notes: string;         // Trade execution notes
}
```

**Structure**:
- Card container
- Header with title + description
- Table with columns:
  - Action (icon + text, colored)
  - Ticker (bold)
  - Amount (formatted: $6,150)
  - Est. Shares (~12)
  - Reason (Badge with color)
  - Notes (text)

**Reason Colors**: Mapped via `reasonColors` object.

**Integration**: Part of `RebalancePacket` entity's `proposed_trades` array.

---

#### TaxNotes

**File**: `Components/packet/TaxNotes.tsx`

**Purpose**: Displays tax considerations for the rebalance packet including TLH opportunities and wash sale warnings.

**Props**: None (hardcoded content)

**Structure**:
- Card container
- Sections:
  1. TLH Opportunity panel (emerald background)
     - Ticker pair (VTI → ITOT)
     - Estimated savings
  2. Wash Sale Warning panel (amber background)
     - Restriction details
     - End date
  3. Realized gain/loss estimate
     - Net impact
     - Tax bracket disclaimer

**Integration**: Part of `RebalancePacket` entity's `tax_notes` object.

---

#### AIExplanation

**File**: `Components/packet/AIExplanation.tsx`

**Purpose**: AI-generated explanation of rebalance rationale.

**Props**: None (hardcoded content)

**Structure**:
- Gradient card (indigo-50 to white)
- Sections with icons:
  1. "Why These Holdings" (Zap icon) - Explanation text
  2. "Risk Posture Change" (RefreshCw icon) - Regime shift explanation
  3. "What Could Go Wrong" (AlertCircle icon) - Risk factors
  4. "What Would Cause Next Month to Flip" (list) - Scenarios that would trigger different selections

**Integration**: Part of `RebalancePacket` entity's `ai_explanation` object. Backend AI service generates this content.

---

#### ApprovalWorkflow

**File**: `Components/packet/ApprovalWorkflow.tsx`

**Purpose**: Manages rebalance packet approval workflow with state transitions.

**Props Interface**:
```typescript
interface ApprovalWorkflowProps {
  status?: "pending" | "reviewed" | "approved";  // Default: "pending"
}
```

**State Management**:
- `currentStatus`: Derived from props initially, then managed internally
- `notes`: string - Reviewer notes textarea
- `deviationReason`: string - Deviation explanation textarea
- `showDeviation`: boolean - Deviation dialog open/closed

**Functions**:
- `handleReview()`: Sets status to "reviewed"
- `handleApprove()`: Sets status to "approved"

**Structure**:
- Card container
- Status badge (colored by status)
- Action buttons:
  - "Mark as Reviewed" (disabled if already reviewed/approved)
  - "Approve Packet" (disabled if not reviewed)
  - "Export Orders" (always enabled)
- Notes textarea
- "I Deviated from Recommendations" button (opens Dialog)
- Deviation Dialog:
  - Title: "Record Deviation"
  - Textarea for deviation explanation
  - Save/Cancel buttons
- Audit info section (reviewer name, last action timestamp)

**State Transitions**:
```
pending → [Mark as Reviewed] → reviewed → [Approve Packet] → approved
```

**Integration**:
- Status updates: POST `/api/rebalance-packets/:id/status` with new status
- Notes: POST `/api/rebalance-packets/:id/notes` with reviewer notes
- Deviation: POST `/api/rebalance-packets/:id/deviations` with deviation record
- Export: GET `/api/rebalance-packets/:id/orders/export?format=csv`

---

### Shared Components

#### MetricCard

**File**: `Components/shared/MetricCard.tsx`

**Purpose**: Reusable card component for displaying metrics with optional trend indicators.

**Props Interface**:
```typescript
interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: string;              // e.g., "+5%" or "-2.1%"
  changeLabel?: string;         // e.g., "vs SPY" or "this month"
  trend?: "up" | "down" | "neutral";
  icon?: LucideIcon;
  className?: string;
}
```

**Behavior**:
- If `change` provided, displays change instead of subtitle
- Trend determines icon color (emerald=up, rose=down, slate=neutral)
- Icon displayed if provided

**Usage**: Used throughout Dashboard, Performance, Risk pages for consistent metric display.

---

#### StatusBadge

**File**: `Components/shared/StatusBadge.tsx`

**Purpose**: Configurable status badge with icons and color coding.

**Props Interface**:
```typescript
interface StatusBadgeProps {
  status?: string;              // Optional, defaults to "pending"
  showIcon?: boolean;           // Default: true
  className?: string;
}
```

**Status Mapping**:
```typescript
const statusConfig: Record<string, StatusConfig> = {
  eligible: { className: "bg-emerald-50...", icon: CheckCircle },
  selected: { className: "bg-indigo-50...", icon: CheckCircle },
  warning: { className: "bg-amber-50...", icon: AlertTriangle },
  pending: { className: "bg-slate-100...", icon: Clock },
  approved: { className: "bg-emerald-50...", icon: CheckCircle },
  reviewed: { className: "bg-blue-50...", icon: CheckCircle },
  ineligible: { className: "bg-slate-100...", icon: XCircle },
  "risk-on": { className: "bg-emerald-50...", icon: TrendingUp },
  "risk-off": { className: "bg-rose-50...", icon: TrendingDown },
  choppy: { className: "bg-amber-50...", icon: AlertTriangle },
  buy: { className: "bg-emerald-50...", icon: TrendingUp },
  sell: { className: "bg-rose-50...", icon: TrendingDown },
};
```

**Behavior**:
- Looks up status in `statusConfig` (case-insensitive)
- Falls back to "pending" config if status not found
- Formats status text: capitalizes first letter, replaces hyphens with spaces
- Hides icon if `showIcon={false}`

**Usage**: Used in Signals table, RebalancePacket page, various status indicators.

---

#### EmptyState

**File**: `Components/shared/EmptyState.tsx`

**Purpose**: Placeholder component for empty data states.

**Props Interface**:
```typescript
interface EmptyStateProps {
  icon?: LucideIcon;            // Default: FileQuestion
  title?: string;               // Default: "No data available"
  description?: string;         // Default: "There's nothing to show here yet."
  action?: () => void;          // Optional action button callback
  actionLabel?: string;         // Default: "Take action"
}
```

**Structure**:
- Card container (centered, padded)
- Icon in colored circle
- Title (h3)
- Description (paragraph)
- Action button (if `action` provided)

**Usage**: Used in TaxTLH page when no opportunities, LogsAudit when no events match filters.

---

### Chart Components

#### AllocationDonut

**File**: `Components/charts/AllocationDonut.tsx`

**Purpose**: Donut/pie chart for asset allocation visualization.

**Props Interface**:
```typescript
interface AllocationDonutProps {
  data: AllocationData;         // { equity?: number, bonds?: number, real_assets?: number, cash?: number }
  size?: number;                // Default: 200 (width and height in pixels)
}
```

**Data Processing**:
1. Converts data object to array: `Object.entries(data).map(...)`
2. Maps keys to labels via `LABELS` object
3. Maps keys to colors via `COLORS` object
4. Filters out zero values: `.filter(d => d.value > 0)`
5. Creates chart data points: `{ name, value, color }`

**Chart Configuration**:
- Inner radius: `size * 0.35`
- Outer radius: `size * 0.45`
- Padding angle: 2 degrees
- Custom tooltip component
- Legend displayed as list (not chart legend)

**Structure**:
- Flex container (horizontal)
- Chart container (ResponsiveContainer with PieChart)
- Legend list (vertical list with color squares + labels + percentages)

**Integration**: Data comes from portfolio holdings aggregation or allocation props.

---

#### EquityCurve

**File**: `Components/charts/EquityCurve.tsx`

**Purpose**: Line chart showing portfolio value over time with optional benchmark comparison.

**Props Interface**:
```typescript
interface EquityCurveProps {
  data: EquityData[];           // Array of { date, portfolio, benchmark }
  showBenchmark?: boolean;      // Default: true
  height?: number;              // Default: 300
}
```

**Chart Configuration**:
- Two lines: portfolio (solid, indigo) and benchmark (dashed, slate)
- Custom tooltip with formatted values
- Y-axis: Formatted as "$Xk" (thousands)
- X-axis: Date labels
- Legend at top
- Cartesian grid (horizontal lines only)

**Data Format**:
```typescript
interface EquityData {
  date: string;          // "Jan 22", "Feb 22", etc.
  portfolio: number;     // Portfolio value
  benchmark: number;     // Benchmark value
}
```

**Integration**: Fetch from `/api/performance/equity-curve?startDate=X&endDate=Y&benchmark=SPY`.

---

#### DrawdownChart

**File**: `Components/charts/DrawdownChart.tsx`

**Purpose**: Area chart (underwater plot) showing drawdowns from peak over time.

**Props Interface**:
```typescript
interface DrawdownChartProps {
  data: DrawdownData[];         // Array of { date, drawdown }
  height?: number;              // Default: 200
}
```

**Chart Configuration**:
- Area chart with gradient fill (rose color, transparent at bottom)
- Y-axis: Domain `['auto', 0]` (always shows 0 at top, negative values below)
- X-axis: Date labels
- Custom tooltip with formatted percentage
- Cartesian grid (horizontal lines only)
- Stroke color: `#f43f5e` (rose-500)
- Gradient: From 30% opacity at top to 0% opacity at bottom

**Data Format**:
```typescript
interface DrawdownData {
  date: string;          // "Jan 22", "Feb 22", etc.
  drawdown: number;      // Negative percentage (e.g., -2.1)
}
```

**Integration**: Fetch from `/api/risk/drawdowns?startDate=2024-01-01&endDate=2026-01-28`.

---

## Styling System

### Tailwind CSS Architecture

**Configuration File**: `tailwind.config.js`

**Key Features**:
- **Dark Mode**: Class-based (`darkMode: ["class"]`) - supports `.dark` class on root element
- **Content Paths**: Scans all `.js`, `.jsx`, `.ts`, `.tsx` files in project root
- **Custom Colors**: Extended color palette using CSS variables (HSL format)
- **Border Radius**: Uses CSS variable `--radius` (default: 0.5rem) with calculated variants
- **Animations**: `tailwindcss-animate` plugin for transitions and animations

### CSS Variables System

**File**: `src/index.css`

**Color System**: All colors defined as HSL CSS variables in `:root` and `.dark` selectors:

```css
:root {
  --background: 0 0% 100%;           /* White */
  --foreground: 222.2 84% 4.9%;      /* Dark slate */
  --primary: 222.2 47.4% 11.2%;      /* Indigo */
  --secondary: 210 40% 96.1%;        /* Light slate */
  --muted: 210 40% 96.1%;            /* Light gray */
  --accent: 210 40% 96.1%;          /* Light slate */
  --destructive: 0 84.2% 60.2%;      /* Red */
  --border: 214.3 31.8% 91.4%;       /* Light gray */
  --ring: 222.2 84% 4.9%;            /* Dark slate */
  --radius: 0.5rem;                  /* Border radius */
  --chart-1 through --chart-5:       /* Chart color palette */
}
```

**Usage**: Colors accessed via `bg-background`, `text-foreground`, `border-border`, etc. Tailwind processes `hsl(var(--variable))` at build time.

**Dark Mode**: All variables redefined in `.dark` selector for dark theme support (currently not implemented in UI, but infrastructure ready).

### Utility Classes Pattern

**Common Patterns**:
- **Spacing**: `p-4`, `px-6`, `py-2`, `gap-4`, `space-y-2`
- **Layout**: `flex`, `grid`, `grid-cols-3`, `lg:grid-cols-2`
- **Responsive**: Mobile-first (`sm:`, `md:`, `lg:` prefixes)
- **Colors**: Semantic (`bg-primary`, `text-destructive`, `border-border`)
- **Typography**: `text-sm`, `font-medium`, `text-slate-500`
- **Borders**: `rounded-lg`, `border`, `border-slate-200`

### Class Name Merging Utility

**File**: `lib/utils.ts`

**Function**: `cn(...inputs: ClassValue[])`

**Purpose**: Merges Tailwind classes intelligently, resolving conflicts and deduplicating.

**Implementation**:
```typescript
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Usage Pattern**:
```typescript
// Conditional classes
<button className={cn(
  "px-4 py-2 rounded",
  isActive && "bg-indigo-500",
  isDisabled && "opacity-50"
)} />

// Variant-based classes
<Card className={cn("p-6", variant === "compact" && "p-4")} />
```

**Why Needed**: `tailwind-merge` resolves conflicts (e.g., `p-4` and `p-6` → `p-6`), `clsx` handles conditional logic.

### Component Variant System

**Library**: `class-variance-authority` (CVA)

**Usage**: Button and Badge components use CVA for variant management.

**Example** (Button):
```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "border border-input bg-background",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

**Benefits**: Type-safe variants, automatic class merging, consistent styling.

### Responsive Design Strategy

**Breakpoints**:
- `sm`: 640px (small tablets)
- `md`: 768px (tablets)
- `lg`: 1024px (desktops)
- `xl`: 1280px (large desktops)

**Pattern**: Mobile-first - base styles for mobile, add `lg:` prefixes for desktop.

**Example**:
```typescript
// Mobile: single column, Desktop: 3 columns
<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
  {/* Content */}
</div>

// Mobile: hidden sidebar, Desktop: fixed sidebar
<aside className="hidden lg:flex lg:fixed lg:inset-y-0">
  {/* Sidebar */}
</aside>
```

### Color Semantics

**Color Usage Guidelines**:
- **Indigo** (`indigo-*`): Primary actions, links, active states
- **Slate** (`slate-*`): Neutral text, borders, backgrounds
- **Emerald** (`emerald-*`): Success states, positive metrics, "buy" actions
- **Rose** (`rose-*`): Danger, errors, "sell" actions, drawdowns
- **Amber** (`amber-*`): Warnings, caution states, pending status

**Status Colors** (via StatusBadge component):
- `eligible`, `selected`, `approved`: Emerald
- `pending`, `ineligible`: Slate
- `warning`, `choppy`: Amber
- `risk-off`, `sell`: Rose
- `risk-on`, `buy`: Emerald

---

## Data Flow & Integration Points

### Current Data Architecture

**Status**: All data is **hardcoded mock data** - application is ready for backend integration.

**Data Sources**:
- Entity files (`Entities/*.ts`) define types and validation
- Page components contain hardcoded arrays/objects
- No API calls, no data fetching, no state management library

### Data Flow Pattern (Current)

```
Hardcoded Data (in component)
    ↓
Component State (useState)
    ↓
Props (parent → child)
    ↓
UI Rendering
```

**Example** (Portfolio Page):
```typescript
// Pages/Portfolio.tsx
const holdings = [  // Hardcoded
  { ticker: "SPY", shares: 100, value: 45000, ... },
  // ...
];

// Passed to child components
<HoldingsTable holdings={holdings} />
```

### Integration Points by Page

#### Dashboard
- **Status**: `/api/status/current` - Next rebalance, regime, risk posture, data freshness
- **Portfolio Snapshot**: `/api/portfolio/snapshot` - Total value, cash %, holdings count, allocation
- **Performance Summary**: `/api/performance/summary?period=YTD&benchmark=SPY` - Returns, sparkline data
- **Action Items**: `/api/actions/needed` - Filter `completed: false`, ordered by priority
- **AI Brief**: `/api/ai/brief?month=January+2026` - AI-generated summary

#### Signals
- **Signals Data**: `/api/signals?month=January+2026` - All signals with momentum, trend, eligibility
- **Signal History**: `/api/signals/history?limit=12` - Historical selections and regime changes

#### Rebalance Packet
- **Packet Data**: `/api/rebalance-packets/January+2026` - Full packet with allocations, trades, explanations
- **Status Update**: `POST /api/rebalance-packets/:id/status` - Update status (pending → reviewed → approved)
- **Notes**: `POST /api/rebalance-packets/:id/notes` - Reviewer notes
- **Deviation**: `POST /api/rebalance-packets/:id/deviations` - Record deviation from recommendations
- **Export Orders**: `GET /api/rebalance-packets/:id/orders/export?format=csv`

#### Portfolio
- **Holdings**: `/api/portfolio/holdings` - Current positions with real-time prices
- **Price Updates**: WebSocket `/ws/portfolio/prices` or polling `/api/portfolio/prices/latest`
- **Contributions**: `/api/portfolio/contributions` - Contribution schedule

#### Performance
- **Equity Curve**: `/api/performance/equity-curve?startDate=2022-01-01&endDate=2026-01-28&benchmark=SPY`
- **Calendar Returns**: `/api/performance/calendar-returns?year=2024`
- **Metrics**: `/api/performance/metrics?benchmark=SPY&taxView=pre-tax`
- **Worst Months**: `/api/performance/worst-months?limit=3`

#### Risk
- **Drawdown Data**: `/api/risk/drawdowns?startDate=2024-01-01&endDate=2026-01-28`
- **Current Status**: `/api/risk/current-status` - Current drawdown, volatility, posture, exposure
- **Regime History**: `/api/risk/regime-history?limit=5`
- **Risk Events**: `/api/risk/events?severity=warning,alert`

#### Tax TLH
- **TLH Opportunities**: `/api/tlh-opportunities?status=available`
- **Wash Sale Restrictions**: `/api/tax/wash-sale-restrictions`
- **Realized Gains/Losses**: `/api/tax/realized-gains-losses?year=2025`
- **Tax Breakdown**: `/api/portfolio/holdings/tax-breakdown`
- **Add to Packet**: `POST /api/rebalance-packets/:id/tlh-opportunities`

#### Logs Audit
- **Audit Logs**: `/api/audit-logs?search=packet&type=packet_approved&month=January+2026`
- **Export**: `GET /api/audit-logs/export?format=csv&filters=...`
- **Real-time Updates**: WebSocket `/ws/audit-logs` or polling

#### Settings
- **Strategy**: `GET /api/strategies/:id` - Strategy configuration
- **Update Settings**: `POST /api/strategies/:id/settings` (if not locked)
- **Clone Strategy**: `POST /api/strategies/:id/clone`
- **Universe**: `GET /api/strategies/:id/universe`, `POST /api/strategies/:id/universe`
- **Data Sources**: `GET /api/data-sources/status`, `POST /api/data-sources/refresh`
- **Notifications**: `PUT /api/user/preferences/notifications`

### Recommended Data Fetching Strategy

**Library**: React Query (TanStack Query) or SWR

**Benefits**:
- Automatic caching and refetching
- Loading and error states
- Optimistic updates
- Request deduplication

**Example Integration**:
```typescript
// hooks/usePortfolio.ts
import { useQuery } from '@tanstack/react-query'

export function usePortfolio() {
  return useQuery({
    queryKey: ['portfolio', 'holdings'],
    queryFn: async () => {
      const response = await fetch('/api/portfolio/holdings')
      const data = await response.json()
      // Validate with entity validation function
      if (Array.isArray(data) && data.every(validateHolding)) {
        return data
      }
      throw new Error('Invalid portfolio data')
    },
    staleTime: 30000, // 30 seconds
  })
}

// Usage in component
const { data: holdings, isLoading, error } = usePortfolio()
```

### Entity Validation in API Integration

**Pattern**: Always validate API responses using entity validation functions.

```typescript
// Before using API data
const response = await fetch('/api/rebalance-packets/January+2026')
const data = await response.json()

if (!validateRebalancePacket(data)) {
  console.error('Invalid packet data:', data)
  // Handle error (show error state, log to monitoring)
  return
}

// Now TypeScript knows data is RebalancePacket
const packet: RebalancePacket = data
```

**Why**: Runtime validation ensures type safety even if backend returns unexpected data.

### Error Handling Strategy

**Recommended Pattern**:
1. **Network Errors**: Show user-friendly error message, retry button
2. **Validation Errors**: Log to monitoring, show fallback UI
3. **404 Errors**: Show empty state with helpful message
4. **500 Errors**: Show error boundary with support contact

**Example**:
```typescript
const { data, error, isLoading } = useQuery({
  queryKey: ['portfolio'],
  queryFn: fetchPortfolio,
  retry: 2,
  onError: (error) => {
    // Log to error tracking service
    logError('Portfolio fetch failed', error)
  },
})

if (isLoading) return <LoadingSpinner />
if (error) return <ErrorState message="Failed to load portfolio" />
if (!data) return <EmptyState />
return <PortfolioView holdings={data} />
```

---

## Testing Architecture

### Test Framework Configuration

**File**: `vitest.config.ts`

**Key Settings**:
- **Environment**: `jsdom` (browser-like DOM simulation)
- **Globals**: Enabled (`describe`, `it`, `expect` available without imports)
- **Setup File**: `src/test/setup.ts` - Configures React Testing Library, jest-dom matchers, mocks
- **CSS**: Enabled (processes CSS imports in tests)
- **Coverage**: v8 provider with text, JSON, and HTML reporters
- **Path Alias**: `@/` resolves to project root (same as Vite config)

### Test Setup File

**File**: `src/test/setup.ts`

**Responsibilities**:
1. **jest-dom Matchers**: Extends Vitest's `expect` with DOM matchers (`toBeInTheDocument`, `toHaveClass`, etc.)
2. **React Testing Library**: Configures cleanup after each test
3. **ResizeObserver Mock**: Required for Recharts components (charts need ResizeObserver)
4. **React Act Environment**: Ensures React 18 concurrent features work in tests

**Key Mocks**:
```typescript
// ResizeObserver mock for Recharts
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
```

### Test Organization

**Directory Structure**:
```
src/test/
├── setup.ts                    # Global test configuration
├── entities/                   # Entity validation and utility tests
│   ├── AuditLog.test.ts
│   ├── Holding.test.ts
│   ├── RebalancePacket.test.ts
│   ├── Strategy.test.ts
│   └── TLHOpportunity.test.ts
├── components/                # Component tests by feature
│   ├── ui/                   # UI component tests
│   ├── shared/               # Shared component tests
│   ├── charts/               # Chart component tests
│   ├── dashboard/            # Dashboard component tests
│   └── packet/               # Packet component tests
├── lib/                      # Utility function tests
│   └── utils.test.ts
└── utils.test.ts             # Application utility tests
```

### Entity Testing Pattern

**Test Coverage**:
1. **Validation Functions**: Test valid objects, invalid objects, edge cases
2. **Factory Functions**: Test default values, option overrides, automatic calculations
3. **Utility Functions**: Test calculations, formatting, queries

**Example** (Holding.test.ts):
```typescript
describe('validateHolding', () => {
  it('validates correct holding', () => {
    expect(validateHolding({ ticker: 'SPY', shares: 100 })).toBe(true)
  })
  
  it('rejects negative shares', () => {
    expect(validateHolding({ ticker: 'SPY', shares: -10 })).toBe(false)
  })
  
  it('rejects missing ticker', () => {
    expect(validateHolding({ shares: 100 })).toBe(false)
  })
})

describe('createHolding', () => {
  it('creates holding with defaults', () => {
    const holding = createHolding('SPY', 100)
    expect(holding.ticker).toBe('SPY')
    expect(holding.shares).toBe(100)
  })
  
  it('calculates unrealized gain/loss', () => {
    const holding = createHolding('SPY', 100, {
      current_value: 45000,
      cost_basis: 40000,
    })
    expect(holding.unrealized_gain_loss).toBe(5000)
  })
})
```

### Component Testing Pattern

**Test Coverage**:
1. **Rendering**: Component renders without errors
2. **Props**: Component accepts and displays props correctly
3. **Interactions**: User interactions (clicks, inputs) trigger expected behavior
4. **Edge Cases**: Empty data, loading states, error states
5. **Accessibility**: ARIA attributes, keyboard navigation

**Example** (Button.test.tsx):
```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '@/Components/ui/button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })
  
  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
  
  it('applies variant classes', () => {
    render(<Button variant="outline">Click</Button>)
    expect(screen.getByRole('button')).toHaveClass('border')
  })
})
```

### Chart Component Testing

**Challenge**: Recharts requires ResizeObserver (mocked in setup.ts)

**Pattern**: Test that charts render and accept data, but don't test chart rendering details (that's Recharts' responsibility).

**Example** (AllocationDonut.test.tsx):
```typescript
describe('AllocationDonut', () => {
  it('renders with data', () => {
    const data = { equity: 50, bonds: 30, cash: 20 }
    render(<AllocationDonut data={data} />)
    // Test that component renders (chart library handles rendering)
    expect(screen.getByText('Equity')).toBeInTheDocument()
  })
  
  it('filters out zero values', () => {
    const data = { equity: 50, bonds: 0, cash: 20 }
    render(<AllocationDonut data={data} />)
    expect(screen.queryByText('Bonds')).not.toBeInTheDocument()
  })
})
```

### Test Utilities

**Custom Render Functions**: For components requiring providers (Router, QueryClient, etc.)

**Example**:
```typescript
// test/utils.tsx
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

export function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}
```

**Mock Data Factories**: Consistent test data generation

**Example**:
```typescript
// test/factories.ts
export function createMockHolding(overrides?: Partial<Holding>): Holding {
  return createHolding('SPY', 100, {
    current_value: 45000,
    cost_basis: 40000,
    ...overrides,
  })
}
```

### Running Tests

**Commands**:
- `npm test` - Run all tests once
- `npm test -- --watch` - Watch mode (re-runs on file changes)
- `npm run test:ui` - Interactive UI (Vitest UI)
- `npm run test:coverage` - Generate coverage report

**Coverage Report**: Generated in `coverage/` directory (HTML report in `coverage/index.html`)

**Coverage Exclusions**:
- `node_modules/`
- `src/test/` (test files themselves)
- `**/*.d.ts` (TypeScript declaration files)
- `**/*.config.*` (config files)
- `**/mockData` (mock data files)

### Test Best Practices

1. **Test Behavior, Not Implementation**: Test what users see and do, not internal state
2. **Use Semantic Queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Test Edge Cases**: Empty data, loading states, error states
4. **Keep Tests Isolated**: Each test should be independent
5. **Mock External Dependencies**: API calls, timers, browser APIs
6. **Use TypeScript**: Type test data and assertions

---

## Build & Development Workflow

### Development Server

**Command**: `npm run dev`

**Technology**: Vite dev server

**Features**:
- **HMR (Hot Module Replacement)**: Instant updates without page refresh
- **Fast Refresh**: React component state preserved during updates
- **Native ESM**: Uses browser native ES modules (no bundling in dev)
- **Path Aliases**: `@/` resolves to project root
- **Port**: Default `http://localhost:5173` (configurable via `--port`)

**Usage**:
```bash
npm run dev              # Start dev server
npm run dev -- --port 3000  # Custom port
```

### Production Build

**Command**: `npm run build`

**Process**:
1. **Type Checking**: Runs `tsc` to validate TypeScript (no emit, just type checking)
2. **Vite Build**: Bundles and optimizes for production
3. **Output**: `dist/` directory with optimized assets

**Build Optimizations**:
- **Code Splitting**: Automatic route-based code splitting
- **Tree Shaking**: Removes unused code
- **Minification**: JavaScript and CSS minified
- **Asset Optimization**: Images and fonts optimized
- **Source Maps**: Generated for debugging (can be disabled for smaller builds)

**Output Structure**:
```
dist/
├── index.html           # Entry HTML
├── assets/
│   ├── index-[hash].js # Main bundle
│   ├── index-[hash].css # Styles
│   └── [other assets]  # Images, fonts, etc.
```

### Preview Production Build

**Command**: `npm run preview`

**Purpose**: Serves the `dist/` directory locally to test production build before deployment.

**Usage**: Run `npm run build` first, then `npm run preview` to test.

### Type Checking

**Command**: `npm run build` (includes `tsc`)

**Configuration**: `tsconfig.json`

**Strict Settings**:
- `strict: true` - All strict checks enabled
- `noUnusedLocals: true` - Warns about unused variables
- `noUnusedParameters: true` - Warns about unused function parameters
- `noFallthroughCasesInSwitch: true` - Requires break/return in switch cases

**Standalone Type Check** (if needed):
```bash
npx tsc --noEmit  # Type check without building
```

### Linting

**Command**: `npm run lint`

**Configuration**: `.eslintrc.cjs`

**Linter**: ESLint with TypeScript and React plugins

**Rules**:
- TypeScript-specific rules (`@typescript-eslint/*`)
- React rules (`react/*`, `react-hooks/*`)
- React Refresh rules (ensures HMR works correctly)
- Max warnings: 0 (treats warnings as errors)

**Auto-fix**:
```bash
npm run lint -- --fix  # Auto-fix fixable issues
```

### Build Configuration Files

#### Vite Config (`vite.config.ts`)

**Key Settings**:
- **React Plugin**: Automatic JSX transform
- **Path Alias**: `@/` → project root
- **Optimize Dependencies**: esbuild options for JSX in `.js` files

#### TypeScript Config (`tsconfig.json`)

**Key Settings**:
- **Target**: ES2020
- **Module**: ESNext
- **JSX**: `react-jsx` (automatic JSX transform)
- **Path Resolution**: Bundler mode (Vite-specific)
- **Strict**: All strict checks enabled

#### PostCSS Config (`postcss.config.js`)

**Plugins**:
- `tailwindcss` - Processes Tailwind directives
- `autoprefixer` - Adds vendor prefixes

### Development Workflow

**Typical Flow**:
1. Start dev server: `npm run dev`
2. Make changes to files
3. See updates instantly (HMR)
4. Run tests: `npm test -- --watch` (in separate terminal)
5. Check types: `npm run build` (or `tsc --noEmit`)
6. Lint: `npm run lint`
7. Build for production: `npm run build`
8. Preview: `npm run preview`

### Dependency Management

**Package Manager**: npm (or yarn, pnpm - all supported)

**Install Dependencies**:
```bash
npm install [package-name]
```

**Update Dependencies**:
```bash
npm update
```

**Lock File**: `yarn.lock` (or `package-lock.json` if using npm)

### Environment Variables

**Pattern**: Vite uses `.env` files (not currently used, but ready for backend URL configuration)

**Example** (if needed):
```bash
# .env.local
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000
```

**Usage**:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## Backend Integration Specifications

### API Contract Requirements

**Base URL**: To be configured (currently no backend)

**Authentication**: To be implemented (likely JWT tokens or session-based)

**Response Format**: JSON

**Error Format**:
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": { /* optional additional info */ }
}
```

### Entity Validation on API Responses

**Critical**: Always validate API responses using entity validation functions before using data.

**Pattern**:
```typescript
async function fetchRebalancePacket(month: string): Promise<RebalancePacket> {
  const response = await fetch(`/api/rebalance-packets/${month}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch packet: ${response.statusText}`)
  }
  const data = await response.json()
  
  // Validate response
  if (!validateRebalancePacket(data)) {
    throw new Error('Invalid packet data received from API')
  }
  
  return data as RebalancePacket
}
```

### Required API Endpoints

#### Portfolio Endpoints

**GET `/api/portfolio/holdings`**
- Returns: `Holding[]`
- Response validation: Each item must pass `validateHolding()`

**GET `/api/portfolio/snapshot`**
- Returns: `{ totalValue: number, cashPercent: number, holdingsCount: number, allocation: AllocationData }`

**GET `/api/portfolio/prices/latest`**
- Returns: `{ [ticker: string]: number }` (latest prices)
- Used for: Real-time price updates

**GET `/api/portfolio/contributions`**
- Returns: Contribution schedule data

#### Signals Endpoints

**GET `/api/signals?month=January+2026`**
- Returns: `SignalData[]`
- Query params: `month` (required)

**GET `/api/signals/history?limit=12`**
- Returns: `SignalHistoryItem[]`
- Query params: `limit` (optional, default: 12)

#### Rebalance Packet Endpoints

**GET `/api/rebalance-packets/:month`**
- Returns: `RebalancePacket`
- Path param: `month` (e.g., "January+2026")
- Response validation: Must pass `validateRebalancePacket()`

**POST `/api/rebalance-packets/:id/status`**
- Body: `{ status: RebalancePacketStatus }`
- Updates packet status (pending → reviewed → approved)

**POST `/api/rebalance-packets/:id/notes`**
- Body: `{ notes: string }`
- Updates reviewer notes

**POST `/api/rebalance-packets/:id/deviations`**
- Body: `{ reason: string }`
- Records deviation from recommendations

**GET `/api/rebalance-packets/:id/orders/export?format=csv`**
- Returns: CSV file
- Query params: `format` (csv, json, etc.)

#### Performance Endpoints

**GET `/api/performance/equity-curve?startDate=2022-01-01&endDate=2026-01-28&benchmark=SPY`**
- Returns: `EquityData[]`
- Query params: `startDate`, `endDate`, `benchmark`

**GET `/api/performance/calendar-returns?year=2024`**
- Returns: `CalendarReturns` object

**GET `/api/performance/metrics?benchmark=SPY&taxView=pre-tax`**
- Returns: Performance metrics object

**GET `/api/performance/worst-months?limit=3`**
- Returns: `WorstMonth[]`

#### Risk Endpoints

**GET `/api/risk/drawdowns?startDate=2024-01-01&endDate=2026-01-28`**
- Returns: `DrawdownData[]`

**GET `/api/risk/current-status`**
- Returns: Current risk metrics

**GET `/api/risk/regime-history?limit=5`**
- Returns: `RegimeHistoryItem[]`

**GET `/api/risk/events?severity=warning,alert`**
- Returns: `RiskEvent[]`

#### Tax TLH Endpoints

**GET `/api/tlh-opportunities?status=available`**
- Returns: `TLHOpportunity[]`
- Response validation: Each item must pass `validateTLHOpportunity()`

**GET `/api/tax/wash-sale-restrictions`**
- Returns: Wash sale restriction data

**GET `/api/tax/realized-gains-losses?year=2025`**
- Returns: Realized gains/losses by year

**GET `/api/portfolio/holdings/tax-breakdown`**
- Returns: Holdings breakdown by tax lot

**POST `/api/rebalance-packets/:id/tlh-opportunities`**
- Body: `{ opportunityId: number }`
- Adds TLH opportunity to packet

#### Audit Log Endpoints

**GET `/api/audit-logs?search=packet&type=packet_approved&month=January+2026`**
- Returns: `AuditLog[]`
- Query params: `search` (optional), `type` (optional), `month` (optional)
- Response validation: Each item must pass `validateAuditLog()`

**GET `/api/audit-logs/export?format=csv&filters=...`**
- Returns: CSV/JSON export file

**POST `/api/audit-logs`**
- Body: `AuditLog` (without id, timestamp auto-generated)
- Creates new audit log entry

#### Settings Endpoints

**GET `/api/strategies/:id`**
- Returns: `Strategy`
- Response validation: Must pass `validateStrategy()`

**POST `/api/strategies/:id/settings`**
- Body: `StrategySettings`
- Updates strategy settings (only if not locked)

**POST `/api/strategies/:id/clone`**
- Returns: `Strategy` (new cloned strategy)
- Creates editable copy of locked strategy

**GET `/api/strategies/:id/universe`**
- Returns: Universe ETF list

**POST `/api/strategies/:id/universe`**
- Body: Universe ETF list
- Updates universe

**GET `/api/data-sources/status`**
- Returns: Data source status

**POST `/api/data-sources/refresh`**
- Triggers data refresh

**PUT `/api/user/preferences/notifications`**
- Body: Notification preferences
- Updates user notification settings

### WebSocket Integration (Optional)

**Purpose**: Real-time updates for prices, audit logs, packet status changes

**Endpoints** (if implemented):
- `ws://api/portfolio/prices` - Real-time price updates
- `ws://api/audit-logs` - New audit log events
- `ws://api/rebalance-packets/:id/status` - Packet status changes

**Implementation Pattern**:
```typescript
const ws = new WebSocket('ws://api/portfolio/prices')
ws.onmessage = (event) => {
  const prices = JSON.parse(event.data)
  // Update component state with new prices
}
```

### Error Handling Standards

**HTTP Status Codes**:
- `200` - Success
- `400` - Bad Request (validation error)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

**Error Response Format**:
```json
{
  "error": "Human-readable error message",
  "code": "ERROR_CODE",
  "details": {
    "field": "validation error details"
  }
}
```

**Client-Side Handling**:
- Network errors: Show retry button
- 401/403: Redirect to login
- 404: Show empty state
- 500: Show error boundary with support contact

---

## Modification Patterns

### Adding a New Page

**Steps**:
1. Create page component in `Pages/` directory
2. Add route in `src/App.tsx`
3. Add `PageName` type in `utils.ts`
4. Add navigation item in `Layout.tsx`
5. Create feature components in `Components/` if needed

**Example**:
```typescript
// 1. Pages/NewPage.tsx
export default function NewPage() {
  return (
    <div className="container mx-auto p-6">
      <h1>New Page</h1>
      {/* Content */}
    </div>
  )
}

// 2. src/App.tsx - Add route
<Route path="/new-page" element={<Layout><NewPage /></Layout>} />

// 3. utils.ts - Add PageName
export type PageName = ... | 'NewPage'

export function createPageUrl(pageName: PageName): string {
  const pageMap: Record<PageName, string> = {
    // ...
    NewPage: '/new-page',
  }
}

// 4. Layout.tsx - Add nav item
const navItems: NavItem[] = [
  // ...
  { name: "New Page", icon: NewIcon, page: "NewPage" },
]
```

### Adding a New Entity

**Steps**:
1. Create entity file in `Entities/` directory
2. Define TypeScript interface
3. Create validation function (type guard)
4. Create factory function with defaults
5. Add utility functions if needed
6. Write tests in `src/test/entities/`

**Example**:
```typescript
// Entities/NewEntity.ts
export interface NewEntity {
  id?: number
  name: string
  value: number
}

export function validateNewEntity(data: unknown): data is NewEntity {
  if (typeof data !== 'object' || data === null) return false
  const obj = data as Record<string, unknown>
  return (
    typeof obj.name === 'string' &&
    typeof obj.value === 'number' &&
    obj.value >= 0
  )
}

export function createNewEntity(name: string, value: number): NewEntity {
  return { name, value }
}
```

### Adding a New UI Component

**Steps**:
1. Create component in `Components/ui/` (if base component) or appropriate feature directory
2. Use shadcn/ui pattern if base component (copy from shadcn/ui)
3. Define TypeScript props interface
4. Use Tailwind classes with `cn()` utility
5. Write tests

**Example**:
```typescript
// Components/ui/new-component.tsx
import { cn } from '@/lib/utils'

interface NewComponentProps {
  className?: string
  children: React.ReactNode
}

export function NewComponent({ className, children }: NewComponentProps) {
  return (
    <div className={cn("base-styles", className)}>
      {children}
    </div>
  )
}
```

### Modifying Existing Components

**Pattern**:
1. Read component file to understand current implementation
2. Identify what needs to change
3. Make minimal changes (preserve existing functionality)
4. Update tests if behavior changes
5. Check for breaking changes in props interface

**Best Practices**:
- Maintain backward compatibility when possible
- Add new props as optional
- Use default parameter values for new optional props
- Update component documentation/comments

### Adding Backend Integration

**Steps**:
1. Install data fetching library (React Query recommended)
2. Create API client functions (or use React Query hooks)
3. Replace hardcoded data with API calls
4. Add loading states
5. Add error handling
6. Validate API responses with entity validation functions
7. Update tests to mock API calls

**Example**:
```typescript
// Before (hardcoded)
const holdings = [
  { ticker: 'SPY', shares: 100, value: 45000 },
]

// After (API integration)
const { data: holdings, isLoading, error } = useQuery({
  queryKey: ['portfolio', 'holdings'],
  queryFn: async () => {
    const response = await fetch('/api/portfolio/holdings')
    const data = await response.json()
    if (!Array.isArray(data) || !data.every(validateHolding)) {
      throw new Error('Invalid holdings data')
    }
    return data
  },
})

if (isLoading) return <LoadingSpinner />
if (error) return <ErrorState />
return <HoldingsTable holdings={holdings} />
```

### Styling Modifications

**Pattern**:
1. Use Tailwind utility classes (preferred)
2. Use `cn()` utility for conditional classes
3. Modify `tailwind.config.js` for new colors/utilities
4. Modify `src/index.css` for global styles or CSS variables

**Example**:
```typescript
// Conditional styling
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  variant === "large" && "large-classes"
)} />

// Responsive styling
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" />
```

---

## Common Tasks & Solutions

### Task: Replace Hardcoded Data with API Call

**Solution**:
1. Install React Query: `npm install @tanstack/react-query`
2. Wrap app in QueryClientProvider (in `src/main.tsx` or `src/App.tsx`)
3. Create hook for data fetching:
```typescript
// hooks/useHoldings.ts
import { useQuery } from '@tanstack/react-query'
import { validateHolding } from '@/Entities/Holding'

export function useHoldings() {
  return useQuery({
    queryKey: ['portfolio', 'holdings'],
    queryFn: async () => {
      const res = await fetch('/api/portfolio/holdings')
      const data = await res.json()
      if (!Array.isArray(data) || !data.every(validateHolding)) {
        throw new Error('Invalid data')
      }
      return data
    },
  })
}
```
4. Use in component:
```typescript
const { data: holdings, isLoading } = useHoldings()
if (isLoading) return <LoadingSpinner />
return <HoldingsTable holdings={holdings} />
```

### Task: Add Loading State to Component

**Solution**:
```typescript
// Option 1: Inline loading state
if (isLoading) {
  return <div className="p-6">Loading...</div>
}

// Option 2: Loading skeleton
if (isLoading) {
  return <LoadingSkeleton />
}

// Option 3: Disable interaction
<Button disabled={isLoading} onClick={handleClick}>
  {isLoading ? 'Loading...' : 'Submit'}
</Button>
```

### Task: Add Error Handling

**Solution**:
```typescript
const { data, error, isError } = useQuery({ ... })

if (isError) {
  return (
    <div className="p-6">
      <p className="text-rose-600">Error: {error.message}</p>
      <Button onClick={() => refetch()}>Retry</Button>
    </div>
  )
}
```

### Task: Add Form Validation

**Solution**:
```typescript
const [errors, setErrors] = useState<Record<string, string>>({})

function validateForm(data: FormData): boolean {
  const newErrors: Record<string, string> = {}
  
  if (!data.name) {
    newErrors.name = 'Name is required'
  }
  
  if (data.value < 0) {
    newErrors.value = 'Value must be positive'
  }
  
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

// In JSX
<Input
  value={formData.name}
  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
/>
{errors.name && <p className="text-rose-600 text-sm">{errors.name}</p>}
```

### Task: Add Real-time Updates

**Solution** (WebSocket):
```typescript
useEffect(() => {
  const ws = new WebSocket('ws://api/portfolio/prices')
  
  ws.onmessage = (event) => {
    const prices = JSON.parse(event.data)
    setPrices(prices)
  }
  
  return () => ws.close()
}, [])
```

**Solution** (Polling with React Query):
```typescript
const { data } = useQuery({
  queryKey: ['prices'],
  queryFn: fetchPrices,
  refetchInterval: 5000, // Refetch every 5 seconds
})
```

### Task: Add New Chart Type

**Solution**:
1. Create component in `Components/charts/`
2. Use Recharts components (PieChart, LineChart, AreaChart, BarChart, etc.)
3. Wrap in ResponsiveContainer
4. Add custom tooltip if needed
5. Test with mocked ResizeObserver

**Example**:
```typescript
// Components/charts/NewChart.tsx
import { LineChart, Line, ResponsiveContainer } from 'recharts'

export default function NewChart({ data }: { data: DataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <Line dataKey="value" stroke="#3b82f6" />
      </LineChart>
    </ResponsiveContainer>
  )
}
```

### Task: Add Filtering/Sorting to Table

**Solution**:
```typescript
const [filter, setFilter] = useState('all')
const [sortBy, setSortBy] = useState<'name' | 'value'>('name')
const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

const filteredData = data.filter(item => {
  if (filter === 'all') return true
  return item.status === filter
})

const sortedData = [...filteredData].sort((a, b) => {
  const aVal = a[sortBy]
  const bVal = b[sortBy]
  if (sortOrder === 'asc') {
    return aVal > bVal ? 1 : -1
  }
  return aVal < bVal ? 1 : -1
})
```

### Task: Add Export Functionality

**Solution**:
```typescript
function exportToCSV(data: unknown[]) {
  const headers = Object.keys(data[0])
  const rows = data.map(item => 
    headers.map(header => item[header]).join(',')
  )
  const csv = [headers.join(','), ...rows].join('\n')
  
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'export.csv'
  a.click()
  URL.revokeObjectURL(url)
}
```

### Task: Add Search Functionality

**Solution**:
```typescript
const [search, setSearch] = useState('')

const filteredItems = items.filter(item =>
  item.name.toLowerCase().includes(search.toLowerCase()) ||
  item.ticker.toLowerCase().includes(search.toLowerCase())
)

// In JSX
<Input
  placeholder="Search..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
```

### Task: Add Pagination

**Solution**:
```typescript
const [page, setPage] = useState(1)
const pageSize = 10

const paginatedData = data.slice(
  (page - 1) * pageSize,
  page * pageSize
)

const totalPages = Math.ceil(data.length / pageSize)

// In JSX
<Button
  disabled={page === 1}
  onClick={() => setPage(page - 1)}
>
  Previous
</Button>
<span>Page {page} of {totalPages}</span>
<Button
  disabled={page === totalPages}
  onClick={() => setPage(page + 1)}
>
  Next
</Button>
```

### Task: Add Toast Notifications

**Solution** (if adding toast library):
1. Install: `npm install sonner` (or similar)
2. Add Toaster component to Layout
3. Use in components:
```typescript
import { toast } from 'sonner'

function handleSave() {
  // ... save logic
  toast.success('Saved successfully')
}
```

### Task: Debug Component Issues

**Solution**:
1. Add console.logs (remove before committing)
2. Use React DevTools browser extension
3. Check browser console for errors
4. Verify props are being passed correctly
5. Check TypeScript errors: `npm run build`
6. Run tests: `npm test`

### Task: Optimize Performance

**Solutions**:
1. **Memoization**: Use `React.memo()` for expensive components
2. **useMemo**: Memoize expensive calculations
3. **useCallback**: Memoize callback functions
4. **Code Splitting**: Lazy load routes with `React.lazy()`
5. **Virtual Scrolling**: For long lists (react-window, react-virtualized)

**Example**:
```typescript
// Memoize expensive component
export default React.memo(ExpensiveComponent)

// Memoize calculation
const totalValue = useMemo(
  () => holdings.reduce((sum, h) => sum + h.value, 0),
  [holdings]
)

// Lazy load route
const Settings = React.lazy(() => import('./Pages/Settings'))
```

---

**End of Document**