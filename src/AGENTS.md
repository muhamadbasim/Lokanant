<coding_guidelines>
# Lokakarya Bridge Flow - Source Code Guidelines

> **For project root guidelines, see `../AGENTS.md`**  
> **For component-specific patterns, see `components/AGENTS.md`**

This document covers patterns and conventions for code within `src/`, including pages, hooks, utilities, and data management.

---

## Directory Structure Overview

```
src/
├── components/          → React components (see components/AGENTS.md)
├── pages/              → Route page components
├── hooks/              → Custom React hooks
├── lib/                → Utility functions
├── data/               → Static/mock data and type definitions
├── assets/             → Images, fonts, static assets
├── App.tsx             → Root app component with routing
├── main.tsx            → Application entry point
└── index.css           → Global styles and Tailwind imports
```

---

## Page Components (`pages/`)

### Naming Convention
- **Files**: PascalCase (e.g., `Dashboard.tsx`, `UMKMDetail.tsx`, `Index.tsx`)
- **Default export**: Component name matches file name

### Pattern
```tsx
// pages/Dashboard.tsx
import { Card } from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-data">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        {/* Page content */}
      </main>
    </div>
  );
};

export default Dashboard;
```

### Guidelines
- **Layout Structure**: Full-height container with background → Header → Main content
- **Responsive**: Use container classes and responsive grid/flex patterns
- **Batik Theming**: Include subtle batik pattern overlays for cultural aesthetic
- **Import Organization**: UI components → domain components → assets
- **No business logic**: Keep logic in hooks/components; pages are for layout

### Current Pages
| File | Route | Purpose |
|------|-------|---------|
| `Index.tsx` | `/` | Landing page |
| `Dashboard.tsx` | `/dashboard` | Admin dashboard with tabs (UMKM, Analytics, Webhooks) |
| `UMKMDetail.tsx` | `/dashboard/umkm/:id` | Detailed UMKM business view |
| `NotFound.tsx` | `*` (catch-all) | 404 error page |

---

## Routing (`App.tsx`)

### Pattern
```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/umkm/:id" element={<UMKMDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
```

### Guidelines
- **Always import pages at top**: No lazy loading yet
- **TanStack Query**: Global QueryClientProvider wraps entire app
- **TooltipProvider**: Wraps app for shadcn/ui tooltip support
- **Toasters**: Both Radix and Sonner toasters included
- **Catch-all route last**: `path="*"` must be the final route
- **Dynamic routes**: Use React Router params (e.g., `:id`)

### Navigation
```tsx
import { useNavigate } from "react-router-dom";

const MyComponent = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate("/dashboard/umkm/123");
  };
  
  return <button onClick={handleClick}>View Details</button>;
};
```

---

## Custom Hooks (`hooks/`)

### Naming Convention
- **Files**: kebab-case with `use-` prefix (e.g., `use-mobile.tsx`, `use-toast.ts`)
- **Export**: Named export matching file name (camelCase)

### Pattern
```tsx
// hooks/use-mobile.tsx
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
```

### Guidelines
- **Import React explicitly**: Use `import * as React from "react";`
- **TypeScript**: Define return types explicitly
- **Cleanup**: Always cleanup event listeners/subscriptions in useEffect
- **Undefined initial state**: For window-dependent hooks (SSR-safe pattern)
- **Reusable logic**: Extract common patterns (media queries, local storage, API calls)

### Current Hooks
| Hook | Purpose |
|------|---------|
| `useIsMobile()` | Detects mobile viewport (<768px) |
| `useToast()` | Toast notification system (from shadcn/ui) |

---

## Utilities (`lib/`)

### Pattern
```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Guidelines
- **`cn()` function**: Core utility for conditional Tailwind classes
- **Pure functions**: No side effects or state
- **Named exports**: Export multiple utilities from one file
- **Type imports**: Use `type` keyword for type-only imports

### Usage Example
```tsx
import { cn } from "@/lib/utils";

<div className={cn(
  "base-class",
  isActive && "active-class",
  variant === "primary" ? "text-blue-500" : "text-gray-500"
)} />
```

---

## Data Management (`data/`)

### Pattern
```ts
// data/umkmDetailedData.ts
export interface UMKM {
  id: string;
  name: string;
  category: string;
  revenue: number;
  creditScore: number;
  // ... other fields
}

export const umkmData: UMKM[] = [
  {
    id: "1",
    name: "Batik Nusantara",
    category: "Batik Production",
    // ...
  },
  // ...
];
```

### Guidelines
- **Export types first**: Define interfaces before data
- **Type annotations**: Explicitly type arrays/objects
- **Mock data**: Use realistic data structures matching expected API responses
- **Static imports**: Import data directly into components (no API calls yet)
- **PascalCase types**: Interface/type names in PascalCase
- **camelCase data**: Variable names in camelCase

---

## Import Patterns

### Always Use `@/` Alias
```tsx
// ✅ CORRECT
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import batikPattern from "@/assets/batik-pattern-1.png";

// ❌ WRONG
import { Button } from "../components/ui/button";
import { useIsMobile } from "./hooks/use-mobile";
```

### Import Order (Recommended)
1. React/React libraries
2. Third-party libraries (lucide-react, date-fns, etc.)
3. UI components from `@/components/ui`
4. Domain components from `@/components/{domain}`
5. Hooks from `@/hooks`
6. Utilities from `@/lib`
7. Data from `@/data`
8. Assets from `@/assets`
9. Types (if separate file)

---

## TypeScript Conventions

### Relaxed Typing (Project Standard)
- **`noImplicitAny: false`**: Implicit `any` is allowed
- **`strictNullChecks: false`**: Nullable types not enforced
- **Optional typing**: Type where it helps; don't over-type

### Pattern
```tsx
// Acceptable (project uses relaxed typing)
const handleClick = (id) => {
  navigate(`/dashboard/umkm/${id}`);
};

// Also acceptable (explicit typing)
const handleClick = (id: string) => {
  navigate(`/dashboard/umkm/${id}`);
};
```

### When to Type
- **Component props**: Always type for reusability
- **Data structures**: Type interfaces/types in data files
- **Hook returns**: Type return values for clarity
- **Utility functions**: Type parameters and returns

---

## Styling Patterns

### Tailwind Classes
- **Use `cn()` utility**: For conditional/merged classes
- **Responsive design**: Mobile-first (`sm:`, `md:`, `lg:` breakpoints)
- **Custom colors**: Use theme variables (e.g., `bg-card`, `text-foreground`)
- **Gradients**: Custom gradients defined in `index.css` (e.g., `bg-gradient-primary`)

### Batik Pattern Overlays
```tsx
import batikPattern3 from "@/assets/batik-pattern-3.png";

<div className="relative">
  <div 
    className="absolute inset-0 opacity-[0.02] pointer-events-none"
    style={{
      backgroundImage: `url(${batikPattern3})`,
      backgroundSize: '300px',
      backgroundRepeat: 'repeat',
    }}
  />
  <div className="relative z-10">
    {/* Content */}
  </div>
</div>
```

### Guidelines
- **Low opacity**: Keep batik patterns subtle (0.02-0.2 opacity)
- **Pointer events none**: Prevent patterns from blocking interactions
- **Z-index layering**: Content at `z-10`, patterns at default/negative

---

## State Management

### Current Approach
- **Local state**: `useState` for component-level state
- **TanStack Query**: For server state (API data, caching, refetching)
- **URL params**: Use React Router params for page-level state (e.g., UMKM ID)
- **No global state library**: No Redux/Zustand yet

### TanStack Query Pattern (Future)
```tsx
import { useQuery } from "@tanstack/react-query";

const { data, isLoading, error } = useQuery({
  queryKey: ["umkm", id],
  queryFn: () => fetchUMKMData(id),
});
```

---

## Asset Management

### Images
- **Location**: `src/assets/`
- **Import**: Import as modules (Vite handles bundling)
- **Usage**: Direct URL or inline styles for backgrounds

```tsx
import logo from "@/assets/logo.png";

// As src attribute
<img src={logo} alt="Logo" />

// As background
<div style={{ backgroundImage: `url(${logo})` }} />
```

### Public Assets
- **Location**: `public/` (not `src/assets/`)
- **Access**: Absolute paths from root (e.g., `/favicon.ico`)
- **Use case**: Assets that don't need bundling (favicons, robots.txt)

---

## Common Patterns

### Conditional Rendering
```tsx
// Boolean conditions
{isLoading && <Spinner />}

// Ternary for two states
{isActive ? <ActiveIcon /> : <InactiveIcon />}

// Multiple conditions
{status === "success" && <SuccessMessage />}
{status === "error" && <ErrorMessage />}
```

### List Rendering
```tsx
{items.map((item) => (
  <Card key={item.id}>
    <h3>{item.name}</h3>
    <p>{item.description}</p>
  </Card>
))}
```

### Event Handlers
```tsx
// Inline (simple)
<button onClick={() => console.log("clicked")}>Click</button>

// Function reference (preferred)
const handleClick = () => {
  console.log("clicked");
};

<button onClick={handleClick}>Click</button>

// With parameters
<button onClick={() => handleDelete(item.id)}>Delete</button>
```

---

## Performance Considerations

### Current State
- **No optimization yet**: Project prioritizes features over optimization
- **No memoization**: No `useMemo`/`useCallback` yet (premature optimization)
- **No code splitting**: All pages loaded upfront

### Future Improvements
- Lazy load routes with `React.lazy()`
- Memoize expensive calculations with `useMemo`
- Optimize re-renders with `React.memo` for list items
- Add virtual scrolling for large tables

---

## Error Handling

### Current Approach
- **No error boundaries**: Implement if crashes become frequent
- **Console logging**: Errors logged to console in dev mode
- **Toast notifications**: Use `useToast()` for user-facing errors

### Pattern (Future)
```tsx
try {
  const result = await fetchData();
  toast({ title: "Success", description: "Data loaded" });
} catch (error) {
  toast({ 
    title: "Error", 
    description: error.message,
    variant: "destructive" 
  });
}
```

---

## Testing

### Current State
- **No tests yet**: Focus on feature development first
- **Future**: Add Vitest + React Testing Library

### When Adding Tests
1. **Unit tests**: Hooks and utilities in `lib/`
2. **Component tests**: Isolated component rendering
3. **Integration tests**: User flows (navigation, forms)

---

## Quick Reference Commands

```bash
# Find a page
rg -n "const.*=.*\(\)" src/pages/

# Find a hook
rg -n "export.*use[A-Z]" src/hooks/

# Find imports of a module
rg "from [\"']@/lib/utils" src/

# Find component usage
rg "<ComponentName" src/

# Find all exports in a folder
rg -n "export " src/data/
```

---

## Anti-Patterns to Avoid

### ❌ Don't Do This
```tsx
// Relative imports from src/
import { Button } from "../components/ui/button";

// Inline styles for complex styling
<div style={{ color: "red", fontSize: "16px", padding: "8px" }}>

// Logic in page components
const Dashboard = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/api/data").then(r => r.json()).then(setData);
  }, []);
  // ... complex logic
};

// Mutating props
const MyComponent = ({ items }) => {
  items.push(newItem); // ❌ Never mutate props
};
```

### ✅ Do This Instead
```tsx
// Use @/ alias
import { Button } from "@/components/ui/button";

// Use Tailwind classes
<div className="text-red-500 text-base p-2">

// Extract logic to hooks
const Dashboard = () => {
  const { data, isLoading } = useUMKMData();
  // ... presentation only
};

// Immutable updates
const MyComponent = ({ items }) => {
  const updatedItems = [...items, newItem];
};
```

---

## Summary

- **Use `@/` imports** for all src/ paths
- **Pages are layout only** - no business logic
- **Hooks for reusable logic** - media queries, API calls, etc.
- **Relaxed TypeScript** - type where it helps, not everywhere
- **Tailwind + cn()** for all styling
- **Batik patterns** for cultural theming (low opacity)
- **TanStack Query** for future server state management
- **Functional components only** - no class components

For component-specific patterns (dashboard, ui, umkm-detail), see `components/AGENTS.md`.
</coding_guidelines>
