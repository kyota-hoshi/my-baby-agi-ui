import { createContext, useContext, useState, useEffect } from "react";
import { Folder } from "@/types";
import {
  deleteFolder,
  saveFolder,
  savedFolders,
  updateFolder,
} from "@/utils/folder";
import { useExecution } from "./useExecution";

type FolderContextType = {
  folders: Folder[];
  addFolder: (folder: Folder) => void;
  updateFold: (updatedFolder: Folder) => void;
  removeFolder: (folderId: string) => void;
};

const FolderContext = createContext<FolderContextType>({
  folders: [],
  addFolder: () => {},
  updateFold: () => {},
  removeFolder: () => {},
});


export const useFolder = () => {
  return useContext(FolderContext);
};

interface FolderProviderProps {
  children: React.ReactNode;
};

export const FolderProvider: React.FC<FolderProviderProps> = ({
  children,
}) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const { executions, updateExec } = useExecution();

  useEffect(() => {
    const savedFolds = savedFolders();
    setFolders(savedFolds);
  }, []);

  const addFolder = (folder: Folder) => {
    console.log(folder);
    const addedFolders = saveFolder(folder);
    setFolders(addedFolders);
  };

  const updateFold = (updatedFolder: Folder) => {
    const updatedFolders = updateFolder(updatedFolder);
    setFolders(updatedFolders);
  };

  const removeFolder = (folderId: string) => {
    const removedFolders = deleteFolder(folderId);
    executions.map((execution) => {
      if (execution.folderId === folderId) {
        updateExec({
          ...execution,
          folderId: null,
        });
      }
    })   
    setFolders(removedFolders);
  };

  return (
    <FolderContext.Provider
      value={{
        folders,
        addFolder,
        updateFold,
        removeFolder,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};