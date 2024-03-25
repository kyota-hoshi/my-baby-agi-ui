import { AgentType, Folder } from '@/types';
import { FOLDERS_KEY } from './constants';

export const updateFolder = (updatedFolder: Folder) => {
  const folders = savedFolders().map((folder) => {
    if (folder.id === updatedFolder.id) {
      return updatedFolder;
    }

    return folder;
  });
  saveFolders(folders);

  return folders;
};

export const saveFolder = (folder: Folder) => {
  const folders = [...savedFolders(), folder];
  saveFolders(folders);
  return folders;
};

const saveFolders = (folders: Folder[]) => {
  localStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
};

export const savedFolders = () => {
  return JSON.parse(
    localStorage.getItem(FOLDERS_KEY) || '[]',
  ) as Folder[];
};

export const deleteFolder = (folderId: string) => {
  const folders = savedFolders().filter(
    (savedFolder) => savedFolder.id !== folderId,
  );
  saveFolders(folders);
  return folders;
};
