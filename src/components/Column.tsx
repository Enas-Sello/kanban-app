"use client";

import { useGetTasks } from "@/hooks/tasksQuery";
import { Box, CircularProgress, Typography } from "@mui/material";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

export default function Column({
  column,
  search,
  open,
  setOpen,
}: {
  column: string;
  search: string;
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  const { data: tasks, isLoading, isError } = useGetTasks(column, search);
  console.log(`Column: ${column}, Tasks:`, tasks);
  const { setNodeRef } = useDroppable({
    id: column,
    data: { column },
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        flex: 1,
        backgroundColor: "#fafafa",
        borderRadius: 2,
        p: 2,
        height: "85vh",
        minWidth: 280,
        boxShadow: "0 1px 3px rgba(10, 5, 5, 0.1)",
        overflowY: "auto",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textTransform: "capitalize",
          pb: 1,
          mb: 2,
          borderRight: "2px solid #e0e0e0",
        }}
      >
        {column}
      </Typography>

      {isLoading && <CircularProgress />}
      {isError && <Typography color="error">Failed to load</Typography>}

      <SortableContext
        id={column}
        items={tasks?.map(t => t.id) || []}
        strategy={verticalListSortingStrategy}
      >
        <Box borderRight="2px solid #e0e0e0" display="flex" flexDirection="column" gap={1}>
          {tasks?.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Box>
      </SortableContext>
      <TaskModal open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}
