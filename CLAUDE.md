# CLAUDE.md

**Purpose**: Immutable instructions for Claude Code when working in this repository.  
Follow all commands, patterns, and standards exactly as stated.

### Core
- **Dev server** → `npm run dev` (Turbopack)
- **Build** → `npm run build`
- **Prod server** → `npm start`

### Code Quality
- **Format staged** → `npm run format:staged`
- **Lint staged** → `npm run lint:staged`

## Project Architecture

This is a Next.js 15 application following a **features-first architecture** with clear domain boundaries and shared infrastructure.

### Core Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict)
- **Style**: Tailwind CSS 4 + SCSS
- **State Management**: Redux Toolkit + Redux Persist
- **Data Fetching**: TanStack React Query v5
- **Auth**: NextAuth.js (custom credentials + OAuth: Google, Discord)
- **Forms**: React Hook Form + Zod
- **UI**: Radix UI + Shadcn/ui
- **Code Quality**: Biome (replaces ESLint + Prettier)

## Features-First Directory Structure

### Core Architecture Principles
- **Domain Boundaries**: Each feature is self-contained with its own components, hooks, services, and types
- **Dependency Direction**: Features can depend on shared modules, but not on other features
- **Scalability**: New features can be added without affecting existing ones
- **Team Collaboration**: Teams can work independently on different features

```
src/
├── app/                          # Next.js App Router (routing only)
│   ├── (app)/                   # Main app routes
│   ├── (auth)/                  # Auth routes
│   └── (main)/                  # Additional main routes
│
├── features/                     # 🎯 Feature modules (business domains)
│   ├── auth/                    # Authentication & user management
│   │   ├── components/          # Auth-specific components
│   │   │   ├── login-form.tsx
│   │   │   ├── oauth-buttons.tsx
│   │   │   └── password-reset.tsx
│   │   ├── hooks/               # Auth-specific hooks
│   │   │   ├── use-auth.ts
│   │   │   ├── use-login.ts
│   │   │   └── use-oauth.ts
│   │   ├── services/            # Auth API calls
│   │   │   ├── auth-api.ts
│   │   │   └── oauth-api.ts
│   │   ├── store/               # Auth Redux slice
│   │   │   ├── auth-slice.ts
│   │   │   └── auth-selectors.ts
│   │   ├── types/               # Auth-specific types
│   │   │   └── auth.types.ts
│   │   ├── schema/              # Zod validation schemas
│   │   │   ├── auth.schema.ts
│   │   │   ├── profile.schema.ts
│   │   │   └── index.ts
│   │   ├── utils/               # Auth utilities
│   │   │   └── token-manager.ts
│   │   └── index.ts             # Public API exports
│   │
│   ├── academy/                 # Course & learning features
│   │   ├── components/
│   │   │   ├── course-card.tsx
│   │   │   ├── lesson-player.tsx
│   │   │   ├── progress-tracker.tsx
│   │   │   └── course-catalog.tsx
│   │   ├── hooks/
│   │   │   ├── use-course-progress.ts
│   │   │   ├── use-lessons.ts
│   │   │   └── use-course-enrollment.ts
│   │   ├── services/
│   │   │   ├── courses-api.ts
│   │   │   └── progress-api.ts
│   │   ├── store/
│   │   │   ├── academy-slice.ts
│   │   │   └── academy-selectors.ts
│   │   ├── types/
│   │   │   └── academy.types.ts
│   │   └── index.ts
│   │
│   ├── marketplace/             # Shop & transactions
│   │   ├── components/
│   │   │   ├── product-card.tsx
│   │   │   ├── shopping-cart.tsx
│   │   │   ├── checkout-form.tsx
│   │   │   └── order-history.tsx
│   │   ├── hooks/
│   │   │   ├── use-cart.ts
│   │   │   ├── use-products.ts
│   │   │   └── use-checkout.ts
│   │   ├── services/
│   │   │   ├── products-api.ts
│   │   │   ├── cart-api.ts
│   │   │   └── orders-api.ts
│   │   ├── store/
│   │   │   ├── marketplace-slice.ts
│   │   │   └── marketplace-selectors.ts
│   │   ├── types/
│   │   │   └── marketplace.types.ts
│   │   └── index.ts
│   │
│   ├── game-stats/              # Game analysis & statistics
│   │   ├── components/
│   │   │   ├── stats-dashboard.tsx
│   │   │   ├── replay-uploader.tsx
│   │   │   ├── match-analysis.tsx
│   │   │   └── performance-charts.tsx
│   │   ├── hooks/
│   │   │   ├── use-stats.ts
│   │   │   ├── use-replay-analysis.ts
│   │   │   └── use-match-history.ts
│   │   ├── services/
│   │   │   ├── stats-api.ts
│   │   │   └── replay-api.ts
│   │   ├── schema/              # Zod validation schemas
│   │   │   ├── replay.schema.ts
│   │   │   └── index.ts
│   │   ├── store/
│   │   │   ├── game-stats-slice.ts
│   │   │   └── game-stats-selectors.ts
│   │   ├── types/
│   │   │   └── game-stats.types.ts
│   │   └── index.ts
│   │
│   └── community/               # Social features & forums
│       ├── components/
│       │   ├── forum-post.tsx
│       │   ├── user-profile.tsx
│       │   ├── discussion-thread.tsx
│       │   └── member-list.tsx
│       ├── hooks/
│       │   ├── use-posts.ts
│       │   ├── use-discussions.ts
│       │   └── use-community.ts
│       ├── services/
│       │   ├── community-api.ts
│       │   └── posts-api.ts
│       ├── store/
│       │   ├── community-slice.ts
│       │   └── community-selectors.ts
│       ├── types/
│       │   └── community.types.ts
│       └── index.ts
│
├── shared/                       # 🔧 Shared infrastructure
│   ├── components/              # Reusable UI components
│   │   ├── ui/                  # Base components (Shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── form.tsx
│   │   ├── layout/              # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── navigation.tsx
│   │   ├── feedback/            # User feedback components
│   │   │   ├── loading-spinner.tsx
│   │   │   ├── error-boundary.tsx
│   │   │   ├── toast.tsx
│   │   │   └── empty-state.tsx
│   │   └── forms/               # Form components
│   │       ├── form-field.tsx
│   │       ├── validation-message.tsx
│   │       └── form-wrapper.tsx
│   │
│   ├── hooks/                   # Shared custom hooks
│   │   ├── use-local-storage.ts
│   │   ├── use-debounce.ts
│   │   ├── use-intersection-observer.ts
│   │   ├── use-media-query.ts
│   │   └── use-async.ts
│   │
│   ├── services/                # Shared API infrastructure
│   │   ├── api-client.ts        # Axios instance & interceptors
│   │   ├── query-client.ts      # React Query configuration
│   │   ├── error-handler.ts     # Global error handling
│   │   └── cache-manager.ts     # Caching strategies
│   │
│   ├── store/                   # Redux store configuration
│   │   ├── store.ts             # Store setup
│   │   ├── root-reducer.ts      # Combined reducers
│   │   ├── middleware.ts        # Custom middleware
│   │   └── hooks.ts             # Typed Redux hooks
│   │
│   ├── schema/                  # Shared Zod schemas
│   │   ├── contact.schema.ts    # Contact & feedback forms
│   │   └── index.ts
│   │
│   ├── utils/                   # Shared utilities
│   │   ├── date.ts              # Date formatting & manipulation
│   │   ├── string.ts            # String utilities
│   │   ├── number.ts            # Number formatting
│   │   ├── constants.ts         # App constants
│   │   └── env.ts               # Environment variables
│   │
│   ├── types/                   # Shared TypeScript types
│   │   ├── api.types.ts         # API response types
│   │   ├── common.types.ts      # Common interfaces
│   │   └── global.types.ts      # Global type definitions
│   │
│   └── config/                  # Configuration files
│       ├── api.ts               # API endpoints
│       ├── auth.ts              # NextAuth configuration
│       ├── database.ts          # DB configuration
│       └── navigation.ts        # Route definitions
│
└── styles/                      # Global styles
    ├── globals.css              # Global CSS + Tailwind
    ├── components.scss          # Component-specific styles
    └── themes/                  # Theme configurations
        ├── light.css
        └── dark.css
```

## Architectural Patterns & Best Practices

### 1. Feature Module Pattern
Each feature module follows this structure:
- **Components**: UI components specific to the feature
- **Hooks**: Business logic and state management
- **Services**: API calls and external integrations
- **Schema**: Zod validation schemas for feature-specific data
- **Store**: Redux slices and selectors
- **Types**: TypeScript definitions
- **Utils**: Feature-specific utilities
- **index.ts**: Public API that exports only what other modules need

### 2. Schema Organization Strategy
```typescript
// ✅ Feature-specific schemas in feature directories
import { loginSchema, registerSchema } from '@/features/auth/schema';
import { replayAnalysisSchema } from '@/features/game-stats/schema';

// ✅ Shared schemas for cross-cutting concerns
import { contactFormSchema } from '@/shared/schema';

// ❌ Avoid: Putting all schemas in shared utils
import { loginSchema } from '@/shared/utils/validations'; // DON'T DO THIS
```

### 3. Dependency Management
```typescript
// ✅ Good: Feature depends on shared
import { Button } from '@/shared/components/ui';
import { useDebounce } from '@/shared/hooks';

// ❌ Bad: Feature depends on another feature
import { UserProfile } from '@/features/community'; // DON'T DO THIS
```

### 4. State Management Strategy
- **Global State**: User authentication, app settings, shared data
- **Feature State**: Domain-specific data that doesn't cross boundaries
- **Local State**: Component-specific UI state

### 5. Error Boundaries & Resilience
```typescript
// Shared error boundary for consistent error handling
<ErrorBoundary fallback={<ErrorFallback />}>
  <FeatureComponent />
</ErrorBoundary>
```

### 6. API Layer Architecture
```typescript
// Feature-specific API service
export const courseApi = {
  getCourses: () => apiClient.get<Course[]>('/courses'),
  enrollInCourse: (courseId: string) => 
    apiClient.post(`/courses/${courseId}/enroll`),
  // ... other course-related endpoints
};
```

## Migration Strategy

### Phase 1: Create Shared Infrastructure
1. Move common components to `src/shared/components/`
2. Extract shared hooks to `src/shared/hooks/`
3. Consolidate API client to `src/shared/services/`
4. Move utilities to `src/shared/utils/`

### Phase 2: Extract Features
1. Start with **Auth** (most independent)
2. Then **Academy** 
3. **Marketplace**
4. **Game Stats**
5. **Community** (may depend on others)

### Phase 3: Optimize Boundaries
1. Review feature dependencies
2. Move shared code to appropriate locations
3. Establish clear public APIs via index.ts files

## Code Standards

### Naming Conventions
- **Features**: `kebab-case` (auth, game-stats)
- **Components**: `PascalCase` (LoginForm, CourseCard)
- **Hooks**: `camelCase` with `use` prefix (useAuth, useCourses)
- **Files**: `kebab-case.extension` (login-form.tsx, auth-api.ts)

### Import Organization
```typescript
// 1. React & Next.js
import React from 'react';
import { NextPage } from 'next';

// 2. External libraries
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

// 3. Shared modules
import { Button } from '@/shared/components/ui';
import { useDebounce } from '@/shared/hooks';

// 4. Feature modules (avoid cross-feature imports)
import { useAuth } from '@/features/auth';

// 5. Relative imports
import { CourseCard } from './course-card';
```

### Component Structure
```typescript
// types
interface CourseCardProps {
  course: Course;
  onEnroll: (courseId: string) => void;
}

// component
export const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  onEnroll 
}) => {
  // hooks
  const { isEnrolled } = useAuth();
  
  // handlers
  const handleEnroll = () => onEnroll(course.id);
  
  // early returns
  if (!course) return null;
  
  // render
  return (
    <div className="course-card">
      {/* JSX */}
    </div>
  );
};
```

### Error Handling Strategy
```typescript
// Service layer
export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    return {
      message: error.response?.data?.message || 'API Error',
      status: error.response?.status || 500,
      code: error.response?.data?.code
    };
  }
  return { message: 'Unknown error', status: 500 };
};

// Component layer
const { data, error, isLoading } = useQuery({
  queryKey: ['courses'],
  queryFn: courseApi.getCourses,
  retry: (failureCount, error) => {
    // Retry logic based on error type
    return failureCount < 3 && error.status >= 500;
  }
});
```

## Performance Optimization

### Code Splitting by Feature
```typescript
// Dynamic imports for features
const AcademyPage = dynamic(() => import('@/features/academy'), {
  loading: () => <LoadingSkeleton />
});
```

### Bundle Analysis
- Use `@next/bundle-analyzer` to monitor feature bundle sizes
- Ensure features don't import unnecessary dependencies
- Lazy load non-critical features

## Development Workflow

### Feature Development Process
1. **Create feature branch**: `feature/academy-course-enrollment`
2. **Develop in isolation**: Work within feature boundaries
3. **Test independently**: Each feature should be testable in isolation
4. **Integration testing**: Test feature interactions through shared APIs

### Code Review Checklist
- [ ] Feature boundaries respected (no cross-feature imports)
- [ ] Shared code moved to appropriate shared modules
- [ ] Public API clearly defined in index.ts
- [ ] Error handling implemented
- [ ] TypeScript types properly defined
- [ ] Tests cover core functionality

## Claude Behavior

- Act as a **senior software engineer with 10+ years at a FAANG company**.
- Always deliver **high-quality, scalable, and maintainable** code following **features-first architecture**.
- Apply **best practices** and **solid software engineering principles** consistently.
- Ensure **clear feature boundaries** and **proper dependency management**.
- Suggest **appropriate design patterns** when beneficial.
- Provide **proactive advice** on improving:
  - Code quality & architecture
  - Feature isolation & scalability
  - Cross-cutting concerns
  - Performance optimization
  - Error handling & resilience
- For every code change or suggestion:
  - Explain architectural reasoning
  - Flag potential boundary violations
  - Offer alternative, optimized solutions
  - Consider impact on other features
- Never introduce breaking changes without clear approval.
- Preserve existing conventions unless explicitly told to change them.
- **Prioritize feature independence** and **team collaboration**.
- For navigate the page, always using `src/shared/config/pages.ts` variables instead of hardcode
- alywas build the project at the end for check error

### MCP Tools
- **Context7 MCP** - Use to update documentation for libraries and frameworks like Next.js, Tailwind CSS, Shadcn and Radix-UI
- **Playwright MCP** - Use to check visual changes in the frontend with real browser when UI modifications are made
- **`design-guidelines`** → Get style guide & component usage rules from `src/shared/components/ui` and `src/shared/components/layout`.

## Key Benefits of This Architecture

1. **Scalability**: Teams can work on different features independently
2. **Maintainability**: Clear boundaries make code easier to understand and modify
3. **Testability**: Features can be tested in isolation
4. **Reusability**: Shared components and utilities are easily accessible
5. **Performance**: Better code splitting and bundle optimization
6. **Team Productivity**: Reduces merge conflicts and coupling issues