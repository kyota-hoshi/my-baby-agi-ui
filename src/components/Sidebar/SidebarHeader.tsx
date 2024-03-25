import { v4 as uuidv4 } from 'uuid';
import { useExecution } from '@/hooks/useExecution';
import { useExecutionStatus } from '@/hooks/useExecutionStatus';
import { useFolder } from '@/hooks/useFolder';
import { PlusIcon, FilePlusIcon } from '@radix-ui/react-icons';
import { FC } from 'react';
import { translate } from '../../utils/translate';
import { CollapsedButton } from './CollapsedButton';
import { Folder } from '@/types';

interface SidebarHeaderProps {
  onMenuClick: () => void;
}

export const SidebarHeader: FC<SidebarHeaderProps> = ({ onMenuClick }) => {
  const { selectExecution } = useExecution();
  const { isExecuting } = useExecutionStatus();
  const { addFolder } = useFolder();

  const handleNewGoal = () => {
    selectExecution(undefined);
  };

  const handleNewFolder = () => {
    const newFolder: Folder = {
      id: uuidv4(),
      name: translate('NEW_FOLDER'),
      date: new Date().toISOString(),
    };

    addFolder(newFolder);
  };

  return (
    <header className="flex items-between border-b border-neutral-600 pb-4">
      <button
        className="flex w-[190px] items-center gap-3 rounded-md p-3 text-sm text-white transition-colors duration-200 hover:bg-neutral-500/10 disabled:opacity-50 sm:w-full"
        onClick={handleNewGoal}
        disabled={isExecuting}
      >
        <PlusIcon />
        {translate('NEW_OBJECTIVE')}
      </button>
      <button
        className="flex items-center rounded-md p-3 text-sm text-white transition-colors hover:bg-neutral-500/10 disabled:opacity-50"
        onClick={() => handleNewFolder()}
        disabled={isExecuting}
      >
        <FilePlusIcon />
      </button>
      <CollapsedButton onClick={onMenuClick} isWhite={true} />
    </header>
  );
};
