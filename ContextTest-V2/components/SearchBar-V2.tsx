// components/SearchBar-V2.tsx
import { useMemo } from 'react';
import { useTasks } from '../context/hooks-V2';
import { useTasksContext } from '../context/TasksContext-V2';

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useTasksContext();
  const { data: tasks = [], isLoading } = useTasks();

  // Filter tasks based on search term
  const filteredTasks = useMemo(() => {
    return tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm]);

  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '0.75rem',
          fontSize: '1rem',
          border: '2px solid #ddd',
          borderRadius: '8px',
          outline: 'none',
        }}
      />
      <p style={{ marginTop: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
        {isLoading ? 'Loading...' : `Showing ${filteredTasks.length} of ${tasks.length} tasks`}
      </p>
    </div>
  );
}