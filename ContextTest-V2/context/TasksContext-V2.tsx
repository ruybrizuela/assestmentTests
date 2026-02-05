// context/TasksContext-V2.tsx
// With React Query, context is optional - mainly used for shared UI state like search
import { createContext, useContext, useState, ReactNode } from 'react';

interface TasksContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const TasksContext = createContext<TasksContextType | null>(null);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <TasksContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </TasksContext.Provider>
  );
}

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasksContext must be used within TasksProvider');
  }
  return context;
};