import { FC } from "react";
import { useFolder } from "@/hooks/useFolder";
import { useExecution } from "@/hooks/useExecution";
import { FolderRow } from "./FolderRow";
import { Execution } from "@/types";
import { ExecutionRow } from "./ExecutionRow";

export const Folders: FC = () => {
  const { folders } = useFolder();
  const folds = folders.slice().reverse();
  const { executions } = useExecution();

  const ExecutionItems = (
    folderId: string,
    executions: Execution[],
  ) => {
    return (
      executions &&
      executions.filter((ex) => (
        folderId === ex.folderId
      )).slice().reverse().map((exe) => {
        return (
          <ExecutionRow
            execution={exe}
            key={exe.id}
          />
        )
      })
    )
  }

  return (
    <>
      {folders.length > 0 && (
        <div className="flex flex-col gap-1 overflow-auto pt-2">
          <ul className="flex flex-col gap-1">
          {folds.map((folder) => (
            <FolderRow
              folder={folder}
              key={folder.id}
              items={ExecutionItems(folder.id, executions)}
            />
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
