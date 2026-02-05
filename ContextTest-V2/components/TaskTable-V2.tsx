// components/TaskTable-V2.tsx
import { useState, useMemo } from 'react';
import { useTasks, useUpdateTask, useDeleteTask } from '../context/hooks-V2';
import { useTasksContext } from '../context/TasksContext-V2';

export default function TaskTable() {
  const { searchTerm } = useTasksContext();
  const { data: tasks = [], isLoading, error } = useTasks();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  // Filter tasks based on search term
  const filteredTasks = useMemo(() => {
    return tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask.mutateAsync(id);
      } catch (err) {
        alert('Failed to delete task');
      }
    }
  };

  const handleEdit = (task: any) => {
    setEditingId(task.id);
    setEditTitle(task.title);
  };

  const handleSaveEdit = async (id: string) => {
    try {
      await updateTask.mutateAsync({ id, updates: { title: editTitle } });
      setEditingId(null);
      setEditTitle('');
    } catch (err) {
      alert('Failed to update task');
    }
  };

  const handleToggleComplete = async (task: any) => {
    try {
      await updateTask.mutateAsync({
        id: task.id,
        updates: { completed: !task.completed }
      });
    } catch (err) {
      alert('Failed to update task');
    }
  };

  if (isLoading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading tasks...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', color: 'red' }}>
        Error: {error instanceof Error ? error.message : 'An error occurred'}
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        border: '2px dashed #ddd',
        borderRadius: '8px',
        color: '#666'
      }}>
        {tasks.length === 0 ? 'No tasks found. Create your first task!' : 'No tasks match your search.'}
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderRadius: '8px',
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
              Status
            </th>
            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
              Title
            </th>
            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
              Description
            </th>
            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '1rem' }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task)}
                  disabled={updateTask.isPending}
                  style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                />
              </td>
              <td style={{ padding: '1rem' }}>
                {editingId === task.id ? (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    style={{
                      padding: '0.5rem',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      width: '100%'
                    }}
                  />
                ) : (
                  <span style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? '#999' : 'inherit'
                  }}>
                    {task.title}
                  </span>
                )}
              </td>
              <td style={{ padding: '1rem', color: '#666' }}>
                {task.description || '-'}
              </td>
              <td style={{ padding: '1rem' }}>
                {editingId === task.id ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(task.id)}
                      disabled={updateTask.isPending}
                      style={{
                        padding: '0.5rem 1rem',
                        marginRight: '0.5rem',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: updateTask.isPending ? 'not-allowed' : 'pointer',
                        opacity: updateTask.isPending ? 0.6 : 1
                      }}
                    >
                      {updateTask.isPending ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      disabled={updateTask.isPending}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: updateTask.isPending ? 'not-allowed' : 'pointer',
                        opacity: updateTask.isPending ? 0.6 : 1
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(task)}
                      disabled={updateTask.isPending || deleteTask.isPending}
                      style={{
                        padding: '0.5rem 1rem',
                        marginRight: '0.5rem',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: (updateTask.isPending || deleteTask.isPending) ? 'not-allowed' : 'pointer',
                        opacity: (updateTask.isPending || deleteTask.isPending) ? 0.6 : 1
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      disabled={updateTask.isPending || deleteTask.isPending}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: (updateTask.isPending || deleteTask.isPending) ? 'not-allowed' : 'pointer',
                        opacity: (updateTask.isPending || deleteTask.isPending) ? 0.6 : 1
                      }}
                    >
                      {deleteTask.isPending ? 'Deleting...' : 'Delete'}
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}