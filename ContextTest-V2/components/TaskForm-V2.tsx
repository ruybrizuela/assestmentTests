// components/TaskForm-V2.tsx
import { useState, FormEvent } from 'react';
import { useCreateTask } from '../context/hooks-V2';

export default function TaskForm() {
  const createTask = useCreateTask();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    try {
      await createTask.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        completed: false,
      });

      // Reset form on success
      setTitle('');
      setDescription('');
    } catch (err) {
      alert('Failed to create task');
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      height: 'fit-content',
      position: 'sticky',
      top: '2rem'
    }}>
      <h2 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Create New Task</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label
            htmlFor="title"
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 'bold',
              color: '#333'
            }}
          >
            Title *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            disabled={createTask.isPending}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label
            htmlFor="description"
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 'bold',
              color: '#333'
            }}
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description (optional)"
            disabled={createTask.isPending}
            rows={4}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={createTask.isPending}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: createTask.isPending ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: createTask.isPending ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          {createTask.isPending ? 'Creating...' : 'Create Task'}
        </button>

        {createTask.isError && (
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            borderRadius: '4px',
            fontSize: '0.9rem'
          }}>
            Error: {createTask.error instanceof Error ? createTask.error.message : 'Failed to create task'}
          </div>
        )}

        {createTask.isSuccess && (
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: '#d4edda',
            color: '#155724',
            borderRadius: '4px',
            fontSize: '0.9rem'
          }}>
            Task created successfully!
          </div>
        )}
      </form>
    </div>
  );
}