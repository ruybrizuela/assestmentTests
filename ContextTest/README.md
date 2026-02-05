# React Context CRUD Example

This is a complete example of implementing CRUD operations with React Context API following best practices.

## Structure

```
ContextTest/
├── services/
│   └── taskService.ts          # API layer - all HTTP requests
├── context/
│   └── TasksContext.tsx        # Context provider with state and CRUD methods
├── pages/
│   └── HomePage.tsx            # Main page that wraps components with provider
└── components/
    ├── SearchBar.tsx           # Search functionality
    ├── TaskTable.tsx           # Display tasks with edit/delete
    └── TaskForm.tsx            # Create new tasks
```

## Key Concepts

### 1. Separation of Concerns
- **Services Layer**: Handles all API calls (taskService.ts)
- **Context Layer**: Manages state and provides methods (TasksContext.tsx)
- **Components**: Consume context and render UI

### 2. Data Fetching in Context
The `TasksProvider` fetches data on mount using `useEffect`. This is acceptable because:
- The fetching logic is delegated to the service layer
- State management remains in the context
- Components don't need to worry about initial data loading

### 3. CRUD Operations Pattern
Each operation follows the same pattern:
1. Call the service method (API request)
2. Update local state optimistically or after success
3. Handle errors appropriately
4. Components call these methods via context

### 4. Shared State
All components have access to:
- `tasks`: The full list
- `filteredTasks`: Filtered based on search
- `loading` and `error`: UI states
- CRUD methods: `createTask`, `updateTask`, `deleteTask`, `refreshTasks`

## Usage Example

```tsx
import HomePage from './ContextTest/pages/HomePage';

function App() {
  return <HomePage />;
}
```

## Benefits of This Approach

1. **Single source of truth**: All components read from the same state
2. **Easy to test**: Service layer can be mocked
3. **Scalable**: Can migrate to React Query without major refactoring
4. **Type-safe**: Full TypeScript support
5. **No prop drilling**: Deep components access data directly

## When to Upgrade

Consider moving to React Query or SWR when you need:
- Automatic refetching and cache invalidation
- Optimistic updates with rollback
- Background data synchronization
- Request deduplication
- Pagination or infinite scroll

## Alternative: Without Context

For simpler apps, you could fetch at the page level and pass props:

```tsx
function HomePage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    taskService.getTasks().then(setTasks);
  }, []);

  return (
    <>
      <SearchBar tasks={tasks} />
      <TaskTable tasks={tasks} onDelete={handleDelete} />
      <TaskForm onSubmit={handleCreate} />
    </>
  );
}
```

This works fine for small apps but leads to prop drilling as the app grows.