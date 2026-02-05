import { useState } from 'react';
import { useTasks } from '../context/TasksContext';

export default function TaskTable() {
  const { filteredTasks, loading, error, deleteTask, updateTask } = useTasks();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
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
      await updateTask(id, { title: editTitle });
      setEditingId(null);
      setEditTitle('');
    } catch (err) {
      alert('Failed to update task');
    }
  };

  const handleToggleComplete = async (task: any) => {
    try {
      await updateTask(task.id, { completed: !task.completed });
    } catch (err) {
      alert('Failed to update task');
    }
  };

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading tasks...</div>;
  }

  if (error) {
    return <div style={{ padding: '2rem', color: 'red' }}>Error: {error}</div>;
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
        No tasks found. Create your first task!
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
                      style={{
                        padding: '0.5rem 1rem',
                        marginRight: '0.5rem',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(task)}
                      style={{
                        padding: '0.5rem 1rem',
                        marginRight: '0.5rem',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
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