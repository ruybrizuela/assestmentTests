# Context vs React Query: Side-by-Side Comparison

## Architecture Comparison

### V1: Context Approach
```
User Action → Context Method → Service API → Update State → Re-render
```

### V2: React Query Approach
```
User Action → Mutation Hook → Service API → Cache Update → Automatic Re-render
```

## Code Comparison

### Fetching Data

**V1 - Context**
```tsx
// In Context Provider
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  loadTasks();
}, []);
```

**V2 - React Query**
```tsx
// Custom hook
export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: taskService.getTasks,
  });
}

// In component
const { data: tasks, isLoading, error } = useTasks();
```

**Winner: V2** - Less boilerplate, automatic error/loading states

---

### Creating Data

**V1 - Context**
```tsx
const createTask = async (newTask) => {
  try {
    const created = await taskService.createTask(newTask);
    setTasks(prev => [...prev, created]);
  } catch (err) {
    setError(err.message);
    throw err;
  }
};
```

**V2 - React Query**
```tsx
export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskService.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

// In component
const createTask = useCreateTask();
await createTask.mutateAsync(newTask);
```

**Winner: V2** - Automatic cache invalidation, optimistic updates available

---

### Optimistic Updates

**V1 - Context**
```tsx
// Manual implementation
const deleteTask = async (id) => {
  // Optimistically update
  const previousTasks = tasks;
  setTasks(prev => prev.filter(t => t.id !== id));

  try {
    await taskService.deleteTask(id);
  } catch (err) {
    // Manual rollback
    setTasks(previousTasks);
    setError(err.message);
    throw err;
  }
};
```

**V2 - React Query**
```tsx
export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskService.deleteTask,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData(['tasks']);

      queryClient.setQueryData(['tasks'], (old) =>
        old.filter((task) => task.id !== id)
      );

      return { previousTasks };
    },
    onError: (err, id, context) => {
      // Automatic rollback
      queryClient.setQueryData(['tasks'], context.previousTasks);
    },
  });
}
```

**Winner: V2** - Built-in rollback mechanism, race condition handling

---

### Caching

**V1 - Context**
```tsx
// No caching - refetches every time component mounts
// Manual implementation required:
const [cache, setCache] = useState({});
const [lastFetch, setLastFetch] = useState(null);

useEffect(() => {
  const now = Date.now();
  if (cache.tasks && now - lastFetch < 30000) {
    setTasks(cache.tasks);
  } else {
    loadTasks();
  }
}, []);
```

**V2 - React Query**
```tsx
// Automatic caching with configurable options
useQuery({
  queryKey: ['tasks'],
  queryFn: taskService.getTasks,
  staleTime: 30000,  // Cache for 30 seconds
  cacheTime: 300000, // Keep in memory for 5 minutes
});
```

**Winner: V2** - Built-in intelligent caching

---

### Loading States

**V1 - Context**
```tsx
// Component
const { tasks, loading, error } = useTasks();

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
```

**V2 - React Query**
```tsx
// Component
const { data: tasks, isLoading, isError, error, isFetching } = useTasks();

if (isLoading) return <div>Loading...</div>;
if (isError) return <div>Error: {error.message}</div>;

// Bonus: background refresh indicator
{isFetching && <span>Updating...</span>}
```

**Winner: V2** - More granular states (initial load vs background refresh)

---

### Background Refetching

**V1 - Context**
```tsx
// Manual implementation
useEffect(() => {
  const handleFocus = () => {
    loadTasks();
  };

  window.addEventListener('focus', handleFocus);
  return () => window.removeEventListener('focus', handleFocus);
}, []);

// Polling
useEffect(() => {
  const interval = setInterval(loadTasks, 30000);
  return () => clearInterval(interval);
}, []);
```

**V2 - React Query**
```tsx
useQuery({
  queryKey: ['tasks'],
  queryFn: taskService.getTasks,
  refetchOnWindowFocus: true,  // Automatic
  refetchInterval: 30000,      // Automatic polling
});
```

**Winner: V2** - Built-in, configurable

---

### Pagination

**V1 - Context**
```tsx
const [page, setPage] = useState(0);
const [hasMore, setHasMore] = useState(true);

const loadMore = async () => {
  setLoading(true);
  const newTasks = await taskService.getTasks(page + 1);
  setTasks(prev => [...prev, ...newTasks]);
  setPage(page + 1);
  setHasMore(newTasks.length > 0);
  setLoading(false);
};
```

**V2 - React Query**
```tsx
const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
} = useInfiniteQuery({
  queryKey: ['tasks'],
  queryFn: ({ pageParam = 0 }) => taskService.getTasks(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextCursor,
});
```

**Winner: V2** - Built-in infinite query support

---

### DevTools

**V1 - Context**
- No built-in devtools
- Use React DevTools to inspect context
- Manual logging required

**V2 - React Query**
```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

<ReactQueryDevtools initialIsOpen={false} />
```
- Visual query inspector
- Cache state visualization
- Mutation tracking
- Query timeline

**Winner: V2** - Excellent devtools included

---

## Performance Comparison

| Metric | V1 (Context) | V2 (React Query) |
|--------|--------------|------------------|
| Bundle Size | ~0kb | ~13kb (gzipped) |
| Initial Render | Fast | Fast |
| Re-fetching | Manual | Automatic |
| Request Deduplication | No | Yes |
| Memory Usage | Low | Higher (cache) |
| Network Requests | More | Fewer (cached) |

---

## When to Use Each

### Use V1 (Context) When:
- ✅ Small, simple app (< 5 API endpoints)
- ✅ Bundle size is critical
- ✅ Data doesn't change frequently
- ✅ No need for caching
- ✅ Learning project
- ✅ Simple CRUD with no special requirements

### Use V2 (React Query) When:
- ✅ Medium to large app
- ✅ Need caching and background updates
- ✅ Real-time or frequently changing data
- ✅ Pagination or infinite scroll
- ✅ Optimistic UI is important
- ✅ Production application
- ✅ Multiple developers (better patterns)
- ✅ Complex data fetching requirements

---

## Migration Path

You can migrate gradually:

```tsx
// Start with Context for simple data
const { user } = useAuth();

// Use React Query for complex data
const { data: tasks } = useTasks();
const { data: notifications } = useNotifications();
```

Both can coexist! Start with V1, migrate to V2 as needs grow.

---

## Real-World Recommendation

**For your task manager example:**
- Prototype: V1 (Context)
- Production: V2 (React Query)

**General guideline:**
- < 3 API endpoints → V1
- 3-10 API endpoints → V2 recommended
- 10+ API endpoints → V2 strongly recommended

---

## The Truth About "Best Practice"

**Context + fetch in provider IS a best practice** for:
- Apps that don't need advanced features
- Teams without React Query experience
- Projects with tight bundle budgets

**React Query IS a best practice** for:
- Apps that need caching/background sync
- Teams building production apps
- Projects where DX matters

There's no universal "best" - choose based on your needs!