import { FC, ReactElement, useState } from "react";
import { useFolder } from "@/hooks/useFolder"
import { useExecution } from "@/hooks/useExecution";
import { CaretDownIcon, CaretRightIcon } from "@radix-ui/react-icons";
import { ExtraButton } from "./ExtraButton";
import { Execution, Folder } from "@/types";
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';

interface FolderRowProps {
  folder: Folder;
  items: (ReactElement<any, any> | undefined)[];
}

export const FolderRow: FC<FolderRowProps> = ({
  folder,
  items,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const { removeFolder, updateFold } = useFolder();
  const { updateExec } = useExecution();

  const handleConfirmRename = () => {
    const newFolder = {
      ...folder,
      name: value,
    };
    updateFold(newFolder);
    setIsEdit(false);
  }

  const deleteHandler = (): void => {
    removeFolder(folder.id);
    setIsEdit(false);
  }

  const editHandler = () => {
    setIsEdit(true);
    setValue(folder.name);
  }

  const dropHandler = (e: any) => {
    if (e.dataTransfer) {
      setIsOpen(true);
      const dropedExecution = JSON.parse(e.dataTransfer.getData('execution'));
      updateExec({
        ...dropedExecution,
        folderId: folder.id,
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
    <>
      {isEdit
        ? (
          <div
            className='flex w-full items-center gap-3 rounded-lg p-3 text-sm transition-colors duration-200 hover:bg-neutral-300/20 disabled:opacity-50 disabled:hover:bg-inherit'
            onDrop={(e) => dropHandler(e)}
            onDragOver={(e) => allowDrop(e)}
            onDragEnter={highlightDrop}
            onDragLeave={removeHighlight}
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
        ) : (
          <button
            className="flex w-full items-center gap-3 rounded-lg p-3 text-sm transition-colors duration-200 hover:bg-neutral-500/20 disabled:opacity-50 disabled:hover:bg-inherit"
            onClick={() => setIsOpen(!isOpen)}
            onDrop={(e) => dropHandler(e)}
            onDragOver={(e) => allowDrop(e)}
            onDragEnter={highlightDrop}
            onDragLeave={removeHighlight}
          >
            {isOpen  
              ? <CaretDownIcon />
              : <CaretRightIcon /> 
            }
            <span className="w-full truncate text-left">{folder.name}</span>
            <ExtraButton
              onDelete={() => deleteHandler()}
              onEdit={() => editHandler()}
            />
          </button>
        )
      }

      {isOpen && (
        <div className="flex flex-col gap-1 ml-5 border-l">
          {items}
        </div>
      )}
    </>
  )
};