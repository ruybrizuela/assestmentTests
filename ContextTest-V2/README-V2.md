# React Query CRUD Example (V2)

This is the V2 version using React Query (TanStack Query) for data fetching and state management.

## Structure

```
ContextTest/
├── services/
│   └── taskService-V2.ts       # Same API layer
├── context/
│   ├── TasksContext-V2.tsx     # Minimal context for UI state only
│   └── hooks-V2.ts             # Custom React Query hooks
├── pages/
│   └── HomePage-V2.tsx         # QueryClientProvider setup
└── components/
    ├── SearchBar-V2.tsx
    ├── TaskTable-V2.tsx
    └── TaskForm-V2.tsx
```

## Key Differences from V1

### 1. No Data Fetching in Context
Context is now only used for shared UI state (search term). All data fetching is handled by React Query.

### 2. Custom Hooks Pattern
```tsx
// Instead of using context for data
const { tasks, createTask } = useTasks(); // V1

// Use React Query hooks directly
const { data: tasks } = useTasks(); // V2 - query
const createTask = useCreateTask();  // V2 - mutation
```

### 3. Automatic Features You Get

**Caching**
- Data is cached automatically
- Reduces unnecessary API calls
- Configurable stale time

**Background Updates**
- Automatic refetching on window focus
- Periodic background updates
- Configurable refresh intervals

**Optimistic Updates**
- UI updates immediately
- Automatic rollback on error
- Better user experience

**Loading & Error States**
- Built-in `isLoading`, `isError`, `isPending`
- No manual state management needed

**DevTools**
- Visual query inspector
- Debug cache state
- Monitor mutations

## Installation

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

## Usage

```tsx
import HomePage from './ContextTest/pages/HomePage-V2';

function App() {
  return <HomePage />;
}
```

## React Query Hooks Explained

### Query Hook (useTasks)
```tsx
const { data, isLoading, error, refetch } = useTasks();

// data: Task[] | undefined
// isLoading: boolean - true during first fetch
// error: Error | null
// refetch: () => void - manually refetch
```

### Mutation Hooks
```tsx
const createTask = useCreateTask();

// Usage
await createTask.mutateAsync({ title: 'New task', completed: false });

// States
createTask.isPending  // true while request is in progress
createTask.isError    // true if mutation failed
createTask.isSuccess  // true if mutation succeeded
createTask.error      // Error object if failed
```

## Query Keys

Centralized query keys ensure cache consistency:

```tsx
export const taskKeys = {
  all: ['tasks'],
  lists: () => [...taskKeys.all, 'list'],
  list: (filters) => [...taskKeys.lists(), { filters }],
  details: () => [...taskKeys.all, 'detail'],
  detail: (id) => [...taskKeys.details(), id],
};
```

## Optimistic Updates

V2 includes optimistic updates for all mutations:

1. **Create**: Task appears immediately
2. **Update**: Changes visible instantly
3. **Delete**: Task removed from UI immediately

If the API call fails, changes are automatically rolled back.

## Configuration Options

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable auto-refetch
      retry: 1,                     // Retry failed requests once
      staleTime: 5000,              // Data fresh for 5 seconds
    },
  },
});
```

### Stale Time vs Cache Time

- **staleTime**: How long data is considered fresh (doesn't refetch)
- **cacheTime**: How long inactive data stays in cache (default: 5 minutes)

## When to Use V2 (React Query)

Use React Query when you need:
- ✅ Automatic caching and invalidation
- ✅ Optimistic UI updates
- ✅ Background data synchronization
- ✅ Request deduplication
- ✅ Pagination or infinite scroll
- ✅ Complex data fetching patterns
- ✅ Better dev tools for debugging

## Comparison: V1 vs V2

| Feature | V1 (Context) | V2 (React Query) |
|---------|--------------|------------------|
| Setup complexity | Simple | Moderate |
| Caching | Manual | Automatic |
| Loading states | Manual | Built-in |
| Optimistic updates | Manual | Built-in |
| Background sync | Manual | Automatic |
| DevTools | None | Excellent |
| Bundle size | Smaller | Larger (+13kb) |
| Best for | Simple apps | Production apps |

## Advanced Patterns

### Pagination
```tsx
const { data, fetchNextPage } = useInfiniteQuery({
  queryKey: taskKeys.lists(),
  queryFn: ({ pageParam = 0 }) => fetchTasks(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextCursor,
});
```

### Dependent Queries
```tsx
const { data: task } = useTask(taskId);
const { data: comments } = useComments(taskId, {
  enabled: !!task, // Only fetch if task exists
});
```

### Prefetching
```tsx
queryClient.prefetchQuery({
  queryKey: taskKeys.lists(),
  queryFn: taskService.getTasks,
});
```

## Best Practices

1. **Centralize query keys** - Use the `taskKeys` pattern
2. **Use optimistic updates** - Better UX for mutations
3. **Set appropriate staleTime** - Balance freshness vs performance
4. **Handle errors gracefully** - Show user-friendly messages
5. **Use DevTools in development** - Debug cache issues
6. **Keep context minimal** - Only for UI state, not data

## Migration from V1 to V2

1. Install React Query
2. Replace Context hooks with React Query hooks
3. Remove manual loading/error state management
4. Add optimistic updates (optional)
5. Configure QueryClient
6. Remove data fetching from Context

The service layer stays the same, making migration straightforward!