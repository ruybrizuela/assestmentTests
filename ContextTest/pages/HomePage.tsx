import { TasksProvider } from '../context/TasksContext';
import SearchBar from '../components/SearchBar';
import TaskTable from '../components/TaskTable';
import TaskForm from '../components/TaskForm';

export default function HomePage() {
  return (
    <TasksProvider>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Task Manager</h1>

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
  );
}