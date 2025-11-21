<coding_guidelines>
# Lokakarya Bridge Flow - Component Architecture Guidelines

> **For project root guidelines, see `../../AGENTS.md`**  
> **For source code patterns, see `../AGENTS.md`**

This document covers component architecture, patterns, and conventions for the `src/components/` directory.

---

## Directory Structure

```
components/
├── ui/                → shadcn/ui primitives (48+ components)
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   └── ... (46 more)
├── dashboard/         → Dashboard-specific components
│   ├── DashboardHeader.tsx
│   ├── StatsOverview.tsx
│   ├── UMKMTable.tsx
│   ├── WebhookPanel.tsx
│   ├── TransactionChart.tsx
│   └── CreditScoreDistribution.tsx
└── umkm-detail/       → UMKM detail page components
    ├── UMKMHeader.tsx
    ├── QuickStatsCards.tsx
    ├── CreditScoreGauge.tsx
    ├── BusinessInfoCard.tsx
    ├── FinancialPerformance.tsx
    ├── DigitalPresence.tsx
    ├── LearningProgress.tsx
    ├── AnalyticsInsights.tsx
    ├── TransactionTable.tsx
    └── LoanCalculator.tsx
```

---

## Component Categories

### 1. UI Components (`ui/`)

**Purpose**: Reusable primitive components from shadcn/ui (Radix UI primitives)

**Guidelines**:
- **Auto-generated**: Most files generated via `npx shadcn@latest add <component>`
- **Minimal edits**: Only customize if absolutely necessary
- **Variants**: Use `class-variance-authority` (CVA) for variant management
- **Composition**: Components compose well together
- **No business logic**: Pure presentation components

**Pattern Example** (Button):
```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

**Key Features**:
- **CVA variants**: Define variants with `cva()` for type-safe props
- **forwardRef**: All components use `React.forwardRef` for ref forwarding
- **`cn()` utility**: Merges class names with `cn()` from `@/lib/utils`
- **`asChild` prop**: Polymorphic component support via Radix Slot
- **Display name**: Always set `displayName` for debugging

**Available UI Components** (48 total):
- Layout: `card`, `separator`, `scroll-area`, `resizable`, `sidebar`, `aspect-ratio`
- Forms: `button`, `input`, `textarea`, `checkbox`, `radio-group`, `select`, `slider`, `switch`, `label`, `form`
- Feedback: `alert`, `toast`, `toaster`, `sonner`, `progress`, `skeleton`
- Overlays: `dialog`, `sheet`, `drawer`, `popover`, `hover-card`, `tooltip`, `alert-dialog`
- Navigation: `tabs`, `accordion`, `breadcrumb`, `menubar`, `navigation-menu`, `dropdown-menu`, `context-menu`, `pagination`
- Data: `table`, `calendar`, `carousel`, `chart`
- Special: `command`, `collapsible`, `toggle`, `toggle-group`, `input-otp`, `avatar`, `badge`

---

### 2. Dashboard Components (`dashboard/`)

**Purpose**: Dashboard page-specific components (used in `/dashboard`)

**Pattern**:
```tsx
// dashboard/StatsOverview.tsx
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, CheckCircle2 } from "lucide-react";
import batikPattern2 from "@/assets/batik-pattern-2.png";

const stats = [
  {
    title: "Total UMKM",
    value: "523",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    gradient: "from-primary to-accent",
  },
  // ... more stats
];

export const StatsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="p-6 shadow-card hover:shadow-elevated transition-all duration-300 relative overflow-hidden group">
            {/* Batik Pattern on Hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
              style={{
                backgroundImage: `url(${batikPattern2})`,
                backgroundSize: '150px',
                backgroundRepeat: 'repeat',
              }}
            />
            
            <div className="flex items-start justify-between relative z-10">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-3xl font-bold text-foreground mt-2">{stat.value}</h3>
                <p className="text-sm text-success mt-2 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {stat.change} vs bulan lalu
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center relative overflow-hidden`}>
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url(${batikPattern2})`,
                    backgroundSize: 'cover',
                  }}
                />
                <Icon className="w-6 h-6 text-white relative z-10" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
```

**Guidelines**:
- **Named exports**: Export components as named exports (e.g., `export const StatsOverview = () => {}`)
- **Composition**: Compose from `ui/` components
- **Icons**: Use Lucide React icons
- **Data**: Static data arrays within component (no separate data files for small datasets)
- **Batik patterns**: Include batik pattern overlays for visual interest
- **Responsive**: Mobile-first responsive design

**Current Components**:
| Component | Purpose |
|-----------|---------|
| `DashboardHeader` | Top header with logo, navigation, action buttons |
| `StatsOverview` | 4-card stats grid showing key metrics |
| `UMKMTable` | Searchable, sortable table of UMKM businesses |
| `WebhookPanel` | n8n webhook configuration interface |
| `TransactionChart` | Line chart showing transaction trends (Recharts) |
| `CreditScoreDistribution` | Bar chart showing credit score distribution |

---

### 3. UMKM Detail Components (`umkm-detail/`)

**Purpose**: UMKM detail page components (used in `/dashboard/umkm/:id`)

**Pattern**:
```tsx
// umkm-detail/CreditScoreGauge.tsx
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, AlertCircle } from "lucide-react";
import { UMKMDetailed } from "@/data/umkmDetailedData";

interface CreditScoreGaugeProps {
  umkm: UMKMDetailed;
}

export const CreditScoreGauge = ({ umkm }: CreditScoreGaugeProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 800) return "text-success";
    if (score >= 650) return "text-warning";
    return "text-destructive";
  };

  const getRecommendations = () => {
    const recommendations = [];
    umkm.scoreFactors.forEach(factor => {
      const percentage = (factor.score / factor.maxScore) * 100;
      if (percentage < 70) {
        recommendations.push(`Tingkatkan ${factor.factor.toLowerCase()} untuk meningkatkan credit score`);
      }
    });
    return recommendations;
  };

  return (
    <Card className="p-6 shadow-card bg-card border border-border">
      <h3 className="text-xl font-bold text-foreground mb-6">Detail Credit Score</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Circular gauge */}
        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 mb-4">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle cx="96" cy="96" r="80" stroke="hsl(var(--muted))" strokeWidth="12" fill="none" />
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="hsl(var(--success))"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${(umkm.creditScore / 1000) * 502.4} 502.4`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-bold ${getScoreColor(umkm.creditScore)}`}>
                  {umkm.creditScore}
                </span>
                <span className="text-sm text-muted-foreground">/ 1000</span>
              </div>
            </div>
          </div>

          {/* Line chart */}
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={umkm.creditHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
              <YAxis domain={[600, 1000]} stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Line type="monotone" dataKey="score" stroke="hsl(var(--success))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Score factors */}
        <div className="space-y-6">
          <div className="space-y-4">
            {umkm.scoreFactors.map((factor, index) => {
              const percentage = (factor.score / factor.maxScore) * 100;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground">{factor.factor}</span>
                    <span className="text-sm font-semibold text-foreground">
                      {factor.score}/{factor.maxScore}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </div>

          {/* Recommendations */}
          <div className="bg-muted/30 border border-border rounded-lg p-4">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-warning" />
              Rekomendasi Peningkatan
            </h4>
            <ul className="space-y-2">
              {getRecommendations().map((rec, index) => (
                <li key={index} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-warning mt-0.5">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};
```

**Guidelines**:
- **Typed props**: Always define TypeScript interfaces for props
- **Data from props**: Receive data via props (from parent page)
- **Helper functions**: Define helper functions inside component for derived data
- **Recharts**: Use Recharts for data visualization (theme colors via HSL variables)
- **Complex layouts**: Use grid layouts for responsive multi-column designs
- **SVG for custom visuals**: Use inline SVG for custom gauges/visualizations

**Current Components**:
| Component | Purpose |
|-----------|---------|
| `UMKMHeader` | Header with business name, logo, status badges |
| `QuickStatsCards` | 3-card grid with key business metrics |
| `CreditScoreGauge` | Circular gauge + line chart + score factors |
| `BusinessInfoCard` | Business details (category, location, contact) |
| `FinancialPerformance` | Revenue/profit charts and metrics |
| `DigitalPresence` | Social media stats, website analytics |
| `LearningProgress` | Training/course completion progress |
| `AnalyticsInsights` | AI-generated insights and recommendations |
| `TransactionTable` | Detailed transaction history table |
| `LoanCalculator` | Interactive loan calculator form |

---

## Component Design Patterns

### 1. Composition Pattern
```tsx
// Compose from smaller components
export const DashboardHeader = () => {
  return (
    <header className="border-b border-border bg-card/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />
        <Navigation />
        <Actions />
      </div>
    </header>
  );
};
```

### 2. Data Mapping Pattern
```tsx
// Map over arrays for repeated elements
const items = [...];

return (
  <div className="grid grid-cols-3 gap-4">
    {items.map((item) => (
      <Card key={item.id}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </Card>
    ))}
  </div>
);
```

### 3. Conditional Styling Pattern
```tsx
import { cn } from "@/lib/utils";

// Use cn() for conditional classes
<div className={cn(
  "base-class",
  isActive && "active-class",
  variant === "primary" ? "text-blue-500" : "text-gray-500"
)} />
```

### 4. Icon Component Pattern
```tsx
import { Icon } from "lucide-react";

// Store icon component, not element
const config = {
  icon: Icon, // Not <Icon />
};

// Render later
const IconComponent = config.icon;
return <IconComponent className="w-4 h-4" />;
```

### 5. Batik Pattern Overlay Pattern
```tsx
import batikPattern from "@/assets/batik-pattern-2.png";

<div className="relative overflow-hidden">
  {/* Pattern layer */}
  <div 
    className="absolute inset-0 opacity-[0.02] pointer-events-none"
    style={{
      backgroundImage: `url(${batikPattern})`,
      backgroundSize: '300px',
      backgroundRepeat: 'repeat',
    }}
  />
  
  {/* Content layer */}
  <div className="relative z-10">
    {/* Content */}
  </div>
</div>
```

### 6. Helper Function Pattern
```tsx
export const CreditScoreGauge = ({ umkm }) => {
  // Helper functions inside component
  const getScoreColor = (score: number) => {
    if (score >= 800) return "text-success";
    if (score >= 650) return "text-warning";
    return "text-destructive";
  };

  return (
    <div>
      <span className={getScoreColor(umkm.creditScore)}>
        {umkm.creditScore}
      </span>
    </div>
  );
};
```

---

## Props and TypeScript

### Interface Pattern
```tsx
// Define props interface above component
interface CardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Card = ({ title, description, children, className }: CardProps) => {
  return (
    <div className={cn("card-base", className)}>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {children}
    </div>
  );
};
```

### Optional vs Required Props
```tsx
interface Props {
  id: string;              // Required
  title: string;           // Required
  subtitle?: string;       // Optional
  onSave?: () => void;     // Optional
  children?: ReactNode;    // Optional (common pattern)
  className?: string;      // Optional (common for styling)
}
```

### Variant Props (CVA Pattern)
```tsx
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("base-class", {
  variants: {
    variant: {
      default: "variant-default",
      destructive: "variant-destructive",
    },
    size: {
      default: "size-default",
      sm: "size-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: ReactNode;
}
```

---

## Styling Conventions

### Theme Colors (Use HSL Variables)
```tsx
// ✅ Use theme variables (adapts to light/dark mode)
<div className="bg-card text-foreground border-border">

// ✅ For inline styles/Recharts
<div style={{ color: 'hsl(var(--foreground))' }}>

// ❌ Avoid hardcoded colors
<div className="bg-white text-black border-gray-200">
```

### Common Theme Variables
| Variable | Usage |
|----------|-------|
| `--background` | Page background |
| `--foreground` | Primary text color |
| `--card` | Card background |
| `--card-foreground` | Card text color |
| `--border` | Border color |
| `--muted` | Muted background |
| `--muted-foreground` | Muted text |
| `--primary` | Primary brand color |
| `--secondary` | Secondary brand color |
| `--accent` | Accent color |
| `--success` | Success state (green) |
| `--warning` | Warning state (yellow) |
| `--destructive` | Error/destructive state (red) |

### Responsive Design
```tsx
// Mobile-first approach
<div className="
  grid 
  grid-cols-1         /* Mobile: 1 column */
  md:grid-cols-2      /* Tablet: 2 columns */
  lg:grid-cols-4      /* Desktop: 4 columns */
  gap-4               /* Spacing */
">
```

### Shadow Utilities (Custom)
```css
/* Defined in index.css */
.shadow-card         /* Card shadow */
.shadow-elevated     /* Elevated shadow (hover) */
```

### Gradient Utilities (Custom)
```css
/* Defined in index.css */
.bg-gradient-primary    /* Primary gradient */
.bg-gradient-secondary  /* Secondary gradient */
.bg-gradient-data       /* Data page gradient */
```

---

## Data Visualization (Recharts)

### Chart Theme Pattern
```tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid 
      strokeDasharray="3 3" 
      stroke="hsl(var(--border))" 
    />
    <XAxis 
      dataKey="date" 
      stroke="hsl(var(--muted-foreground))" 
    />
    <YAxis 
      stroke="hsl(var(--muted-foreground))" 
    />
    <Tooltip 
      contentStyle={{ 
        backgroundColor: 'hsl(var(--card))', 
        border: '1px solid hsl(var(--border))',
        borderRadius: '8px',
        color: 'hsl(var(--foreground))'
      }}
      labelStyle={{ color: 'hsl(var(--foreground))' }}
    />
    <Line 
      type="monotone" 
      dataKey="value" 
      stroke="hsl(var(--primary))" 
      strokeWidth={2} 
    />
  </LineChart>
</ResponsiveContainer>
```

### Guidelines
- **Always use `ResponsiveContainer`**: Wraps chart for responsiveness
- **Theme colors**: Use HSL variables for all colors
- **Tooltip styling**: Match card background/border colors
- **Stroke width**: 2px for lines, 12px for large circles
- **Height**: Explicit height on ResponsiveContainer (e.g., 300px)

---

## Icons (Lucide React)

### Usage Pattern
```tsx
import { Check, X, AlertCircle, TrendingUp } from "lucide-react";

<Button>
  <Check className="w-4 h-4 mr-2" />
  Save Changes
</Button>

<div className="flex items-center gap-2">
  <TrendingUp className="w-5 h-5 text-success" />
  <span>+12.5%</span>
</div>
```

### Guidelines
- **Size classes**: `w-4 h-4` (16px), `w-5 h-5` (20px), `w-6 h-6` (24px)
- **Color classes**: Use theme color classes (e.g., `text-success`, `text-muted-foreground`)
- **Spacing**: Use gap/margin utilities for spacing
- **Alignment**: Use flex with `items-center` for vertical alignment

---

## Component File Structure

### Recommended Order
```tsx
// 1. Imports
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "lucide-react";
import batikPattern from "@/assets/batik-pattern.png";

// 2. Types/Interfaces
interface ComponentProps {
  title: string;
}

// 3. Static data (if small)
const config = {
  // ...
};

// 4. Component
export const Component = ({ title }: ComponentProps) => {
  // 4a. Hooks
  const [state, setState] = useState();
  
  // 4b. Helper functions
  const helperFn = () => {
    // ...
  };
  
  // 4c. JSX
  return (
    <div>
      {/* ... */}
    </div>
  );
};
```

---

## Common Component Patterns

### Card Component Pattern
```tsx
<Card className="p-6 shadow-card">
  <h3 className="text-xl font-bold text-foreground mb-4">
    Title
  </h3>
  <div className="space-y-4">
    {/* Content */}
  </div>
</Card>
```

### Stats Card Pattern
```tsx
<Card className="p-6">
  <div className="flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-muted-foreground">
        Label
      </p>
      <h3 className="text-3xl font-bold text-foreground mt-2">
        {value}
      </h3>
      <p className="text-sm text-success mt-2">
        +12.5% vs last month
      </p>
    </div>
    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
      <Icon className="w-6 h-6 text-white" />
    </div>
  </div>
</Card>
```

### Table Pattern
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Column 1</TableHead>
      <TableHead>Column 2</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map((row) => (
      <TableRow key={row.id}>
        <TableCell>{row.col1}</TableCell>
        <TableCell>{row.col2}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

---

## Anti-Patterns to Avoid

### ❌ Don't Do This
```tsx
// Default exports for domain components
export default DashboardHeader;

// Inline large data arrays
const data = [ /* 500 lines of data */ ];

// Hardcoded colors
<div className="bg-white text-black">

// Missing key prop
{items.map(item => <Card>{item.name}</Card>)}

// Modifying props directly
props.items.push(newItem);

// Nested ternaries
{isActive ? isFeatured ? <FeaturedActive /> : <Active /> : <Inactive />}
```

### ✅ Do This Instead
```tsx
// Named exports
export const DashboardHeader = () => {};

// Import data from data/
import { data } from "@/data/myData";

// Theme colors
<div className="bg-card text-foreground">

// Always include keys
{items.map(item => <Card key={item.id}>{item.name}</Card>)}

// Immutable updates
const newItems = [...props.items, newItem];

// Multiple conditions or helper function
{isActive && isFeatured && <FeaturedActive />}
{isActive && !isFeatured && <Active />}
{!isActive && <Inactive />}

// Or
const getComponent = () => {
  if (isActive && isFeatured) return <FeaturedActive />;
  if (isActive) return <Active />;
  return <Inactive />;
};
```

---

## Component Checklist

Before considering a component complete:

- [ ] Named export (not default)
- [ ] TypeScript interface for props
- [ ] Uses `@/` imports (no relative imports)
- [ ] Uses theme colors (HSL variables)
- [ ] Responsive design (mobile-first)
- [ ] Proper key props in lists
- [ ] Icons sized correctly (w-4 h-4, w-5 h-5, w-6 h-6)
- [ ] Accessibility considerations (semantic HTML)
- [ ] No business logic (unless specific to this component)
- [ ] Follows existing component patterns

---

## Quick Find Commands

```bash
# Find a component
rg -n "export.*const.*ComponentName" src/components/

# Find component usage
rg "<ComponentName" src/

# Find all icons used
rg "from [\"']lucide-react[\"']" src/components/

# Find all shadcn/ui component imports
rg "from [\"']@/components/ui" src/

# Find batik pattern usage
rg "batik-pattern" src/components/
```

---

## Summary

### Component Categories
- **`ui/`**: Reusable primitives (shadcn/ui, minimal edits)
- **`dashboard/`**: Dashboard page components
- **`umkm-detail/`**: UMKM detail page components

### Key Patterns
- **Named exports**: All domain components
- **Typed props**: TypeScript interfaces
- **Theme colors**: HSL variables only
- **Batik overlays**: Subtle cultural theming
- **Helper functions**: Inside components
- **Icon components**: Store component, not element
- **Responsive**: Mobile-first grid layouts

### UI Component Stack
- **shadcn/ui**: 48+ Radix UI primitives
- **Lucide React**: Icon library
- **Recharts**: Data visualization
- **CVA**: Variant management
- **Tailwind CSS**: Utility-first styling

For source code patterns (pages, hooks, utils), see `../AGENTS.md`.
</coding_guidelines>
