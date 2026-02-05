import { useTasks } from '../context/TasksContext';

export default function SearchBar() {
  const { searchTerm, setSearchTerm, tasks, filteredTasks } = useTasks();

  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
        Showing {filteredTasks.length} of {tasks.length} tasks
      </p>
    </div>
  );
}