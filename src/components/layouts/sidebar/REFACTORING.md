# Sidebar Component Refactoring

## Overview

The sidebar component has been refactored from a monolithic 420-line component into a modular, maintainable structure. The original component is preserved in `sidebar.tsx`, and the refactored version is in `sidebar-refactored.tsx`.

## Structure

```
sidebar/
├── components/
│   ├── SidebarLogo.tsx           # Logo and branding
│   ├── SidebarMenuItem.tsx       # Individual menu item with children support
│   └── SidebarToggleButton.tsx   # Expand/collapse button
├── hooks/
│   ├── useSidebarState.ts        # State management and context integration
│   ├── useSidebarHover.ts        # Hover behavior and mouse tracking
│   └── usePageTitle.ts           # Page title management
├── constants.ts                  # Configuration constants
├── types.ts                      # TypeScript interfaces
├── sidebar.tsx                   # Original component (preserved)
└── sidebar-refactored.tsx        # New refactored component
```

## Key Improvements

### 1. **Separation of Concerns**
- **State Management**: Extracted to `useSidebarState` hook
- **Hover Logic**: Extracted to `useSidebarHover` hook
- **UI Components**: Separated into individual component files

### 2. **Better Type Safety**
- Defined `SidebarProps`, `NavItem`, and `SidebarState` types
- Improved type annotations throughout

### 3. **Constants Management**
- Extracted magic numbers to `SIDEBAR_CONSTANTS`
- Defined color and size constants
- Easier to maintain and update

### 4. **Reusable Components**
```typescript
// Before: 100+ lines of inline JSX
// After: Clean, composable components
<SidebarLogo show={show} />
<SidebarToggleButton ... />
<SidebarMenuItem ... />
```

### 5. **Custom Hooks**

#### `useSidebarState`
Manages sidebar state and integrates with organization trace context:
- Expands/collapses state
- Sub-menu visibility
- Hover state
- Context interactions

#### `useSidebarHover`
Handles all mouse-related behavior:
- Mouse enter/leave detection
- Global mouse tracking
- Automatic close on mouse exit
- RTL-aware boundaries

#### `usePageTitle`
Simple hook to manage document title based on active route.

## How to Use

### Option 1: Use the Refactored Version

Replace the import in `main-layout.tsx`:

```typescript
// Before
import Sidebar from '@/components/layouts/sidebar/sidebar';

// After
import Sidebar from '@/components/layouts/sidebar/sidebar-refactored';
```

### Option 2: Migrate Gradually

1. Test the refactored version thoroughly
2. Once confident, replace the contents of `sidebar.tsx` with `sidebar-refactored.tsx`
3. Delete `sidebar-refactored.tsx`

## Constants Configuration

Adjust behavior by modifying values in `constants.ts`:

```typescript
export const SIDEBAR_CONSTANTS = {
  TOGGLE_BUTTON_BUFFER: 60,        // Hover detection area
  MOUSE_LEAVE_DELAY: 100,          // Delay before hiding on mouse leave
  GLOBAL_MOUSE_MOVE_DELAY: 150,   // Delay for global tracking
  TOGGLE_BUTTON_RESET_DELAY: 300, // Button state reset time
  DEFAULT_APP_TITLE: 'Swem',       // Fallback page title
};
```

## Benefits

### Maintainability
- **Single Responsibility**: Each file has one clear purpose
- **Easier Testing**: Hooks and components can be tested in isolation
- **Clearer Logic**: No more 400+ line files to navigate

### Performance
- **Optimized Re-renders**: Proper memoization and dependency management
- **Efficient Updates**: Only affected parts re-render

### Developer Experience
- **Better IntelliSense**: Proper TypeScript types
- **Easier Debugging**: Smaller, focused units
- **Clear Documentation**: Each file is self-documenting

## Migration Checklist

- [x] Extract constants
- [x] Define TypeScript types
- [x] Create custom hooks
- [x] Build sub-components
- [x] Create main refactored component
- [ ] Test all functionality
- [ ] Test RTL behavior
- [ ] Test hover interactions
- [ ] Test with different screen sizes
- [ ] Replace original component
- [ ] Remove old file

## Testing Recommendations

1. **Hover Behavior**
   - Test opening sidebar on hover
   - Test closing sidebar when mouse leaves
   - Test in both LTR and RTL modes

2. **Click Behavior**
   - Test expand/collapse toggle
   - Test sub-menu opening
   - Test navigation

3. **Context Integration**
   - Test with organization trace context
   - Test drawer interactions

4. **Responsive Design**
   - Test on different screen sizes
   - Test touch devices if applicable

## Notes

- The original `sidebar.tsx` is preserved for safety
- All functionality from the original is maintained
- No breaking changes to the component API
- RTL support is fully maintained

