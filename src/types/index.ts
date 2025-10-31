export type Task = {
  id: number;
  title: string;
  description: string;
  column: "backlog" | "inprogress" | "review" | "done";
};


export interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  task?: Task;
}