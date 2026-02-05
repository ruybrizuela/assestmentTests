// pages/HomePage-V2.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TasksProvider } from '../context/TasksContext-V2';
import SearchBar from '../components/SearchBar-V2';
import TaskTable from '../components/TaskTable-V2';
import TaskForm from '../components/TaskForm-V2';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable refetch on window focus
      retry: 1, // Retry failed requests once
      staleTime: 5000, // Data is fresh for 5 seconds
    },
  },
});

export default function HomePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <TasksProvider>
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <h1>Task Manager V2</h1>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            Powered by React Query - featuring automatic caching, background updates, and optimistic UI
          </p>

          <SearchBar />

          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            <TaskTable />
            <TaskForm />
          </div>
        </div>
      </TasksProvider>

      {/* DevTools - helpful for debugging (remove in production) */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}