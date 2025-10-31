"use client";

import { useDeleteTask } from "@/hooks/tasksQuery";
import { Task } from "@/types";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import TaskModal from "./TaskModal";
import { useSortable } from "@dnd-kit/sortable";

export default function TaskCard({ task }: { task: Task }) {
  const deleteTask = useDeleteTask();
  const [open, setOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { task, column: task.column },
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    opacity: isDragging ? 0.4 : 1,
    cursor: "grab",
    p: 0.5,
    mr: 2,
    borderRadius: 2,
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    backgroundColor: "#fff",
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask.mutate(task.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };

  return (
    <>
      <Card
        ref={setNodeRef}
        sx={{
          ...style,
        }}
      >
        <CardContent style={{ paddingBottom: 10 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="start"
            flexDirection={"column"}
            {...listeners}
            {...attributes}
          >
            <Box flex="1">
              <Typography variant="subtitle1" fontWeight="bold">
                {task.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {task.description}
              </Typography>
            </Box>
          </Box>
          <Box width="100%" display="flex" gap={1} justifyContent="end" alignContent="center">
            <IconButton size="small" onClick={handleEdit}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={handleDelete}>
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {open && <TaskModal open={open} onClose={() => setOpen(false)} task={task} />}
    </>
  );
}
