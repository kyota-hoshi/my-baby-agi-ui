import { FC } from 'react';
import { ExecutionRow } from './ExecutionRow';
import { useExecution } from '@/hooks/useExecution';

export const Executions: FC = () => {
  const { executions, updateExec } = useExecution();
  const exe = executions.filter((ex) => (
    !ex.folderId
  )).slice().reverse();

  const dropHandler = (e: any) => {
    if (e.dataTransfer) {
      const dropedExecution = JSON.parse(e.dataTransfer.getData('execution'));
      updateExec({
        ...dropedExecution,
        folderId: null,
      });
      e.target.style.background = 'none';
    }
  }

  const allowDrop = (
    e: any,
  ) => {
    e.preventDefault();
  }

  const highlightDrop = (e: any) => {
    e.target.style.background = "#444444"
  }

  const removeHighlight = (e: any) => {
    e.target.style.background = "none";
  }

  return (
    <div
      className="flex flex-col gap-1 overflow-auto pt-2"
      onDrop={(e) => dropHandler(e)}
      onDragOver={(e) => allowDrop(e)}
      onDragEnter={highlightDrop}
      onDragLeave={removeHighlight}
    >
      <ul className="flex flex-col gap-1">
        {exe.map((execution) => (
          <ExecutionRow execution={execution} key={execution.id} />
        ))}
      </ul>
    </div>
  );
};
