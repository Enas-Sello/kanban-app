"use clinet";

import { useCreateTask, useUpdateTask } from "@/hooks/tasksQuery";
import { TaskModalProps } from "@/types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function TaskModal({ open, onClose, task }: TaskModalProps) {
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  const handleSave = () => {
    if (task) {
      updateTask.mutate({ ...task, title, description });
    } else {
      createTask.mutate({
        title,
        description,
        column: "backlog",
      });
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{task ? "Edit Task" : "Add Task"}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          multiline
          rows={3}
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
