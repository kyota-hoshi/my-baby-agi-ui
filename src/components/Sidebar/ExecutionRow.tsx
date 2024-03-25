import { DragEvent, useState } from 'react';
import { useExecution } from '@/hooks/useExecution';
import { useExecutionStatus } from '@/hooks/useExecutionStatus';
import { Execution } from '@/types';
import { FC } from 'react';
import { ExtraButton } from './ExtraButton';
import { ALL_AGENTS } from '@/utils/constants';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';

interface ExecutionRowProps {
  execution: Execution;
}

export const ExecutionRow: FC<ExecutionRowProps> = ({ execution }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const { selectExecution, selectedExecutionId, removeExecution, updateExec } =
    useExecution();
  const { isExecuting } = useExecutionStatus();

  const handleSelectExecution = (executionId: string) => {
    selectExecution(executionId);
  };

  const handleConfirmRename = () => {
    const newExecution = {
      ...execution,
      name: value,
    };
    updateExec(newExecution);
    setIsEdit(false);
  }

  const handleDragStart = (
    e: DragEvent<HTMLButtonElement>,
    execution: Execution,
  ) => {
    if (e.dataTransfer) {
      e.dataTransfer.setData('execution', JSON.stringify(execution));
    }
  };

  const deleteHandler = (executionId: string) => {
    removeExecution(executionId);
    selectExecution(undefined);
  };

  const editHandler = () => {
    setIsEdit(true);
    setValue(execution.name);
  }

  const agent = ALL_AGENTS.find((agent) => agent.id === execution.params.agent);

  return (
    <>
      {isEdit && selectedExecutionId === execution.id
        ? (
          <div
            className='flex w-full items-center gap-3 rounded-lg p-3 text-sm transition-colors duration-200 hover:bg-neutral-300/20 disabled:opacity-50 disabled:hover:bg-inherit'
          >
            <input
              className=' bg-neutral-500'
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              onClick={handleConfirmRename}
            >
              <CheckIcon />
            </button>
            <button
              onClick={() => setIsEdit(false)}
            >
              <Cross2Icon />
            </button>
          </div>
        )
        : (
          <button
            className={`flex w-full items-center gap-3 rounded-lg p-3 text-sm transition-colors duration-200 hover:bg-neutral-500/20 disabled:opacity-50 disabled:hover:bg-inherit
              ${
                execution.id === selectedExecutionId &&
                !isExecuting &&
                'bg-neutral-300/10'
              }
            `}
            onClick={() => handleSelectExecution(execution.id)}
            disabled={isExecuting}
            draggable
            onDragStart={(e) => handleDragStart(e, execution)}
          >
            <span className="pr-1">{agent?.icon}</span>
            <span className="w-full truncate text-left">{execution.name}</span>
            <ExtraButton
              onDelete={() => deleteHandler(execution.id)}
              onEdit={() => editHandler()}
            />
          </button>
        )
      }
    </>
  );
};
