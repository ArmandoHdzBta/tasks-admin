import { createContext, useContext, useState } from "react"

interface TaskProviderProps {
  children: React.ReactNode
}

const TaskContext = createContext({
  rePrint: false,
  onChangeState: () => {}
});

export function TaskProvider({ children }: TaskProviderProps) {
  const [rePrint, setRePrint] = useState(false);

  const onChangeState = () => {
    setRePrint(!rePrint);
  };

  return (
    <TaskContext.Provider value={{ rePrint, onChangeState }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasksContext = () => useContext(TaskContext);