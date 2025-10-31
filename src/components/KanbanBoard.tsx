"use client";

import { Box, Button, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import Column from "./Column";
import { DndContext, DragOverEvent, DragOverlay } from "@dnd-kit/core";

import { useState } from "react";
import { useUpdateTask } from "@/hooks/tasksQuery";
import TaskCard from "./TaskCard";
import SearchBar from "./SearchBar";
import { Task } from "@/types";
import { useUIStore } from "@/store/uiStore";

export default function KanbanBoard() {
  const columns = ["backlog", "in progress", "review", "done"];
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [open, setOpen] = useState(false);

  const updateTask = useUpdateTask();
  const { search, setSearch } = useUIStore();

  const handleDragStart = (event: DragOverEvent) => {
    const { active } = event;
    setActiveTask(active.data.current?.task || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const sourceColumn = active.data.current?.column;
    const destinationColumn = over.data.current?.column;

    if (sourceColumn !== destinationColumn) {
      const task = active.data.current?.task as Task;
      updateTask.mutate({
        ...task,
        column: destinationColumn,
      });
    }
  };

  const handleDragEnd = () => setActiveTask(null);
  return (
    <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      <Paper
        elevation={2}
        sx={{
          p: 3,
          backgroundColor: "#fff",
          borderRadius: 3,
          boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <SearchBar search={search} setSearch={setSearch} />

          <Button
            variant="contained"
            sx={{
              borderRadius: 2,
              textTransform: "capitalize",
              px: 5,
              py: 1,
            }}
            size="large"
            onClick={() => setOpen(true)}
          >
            add task
          </Button>
        </Box>

        <Grid container spacing={2} alignItems="flex-start">
          {columns.map(col => (
            <Grid key={col} size={{ xs: 12, sm: 6, md: 3 }}>
              <Column search={search} column={col} open={open} setOpen={setOpen} />
            </Grid>
          ))}
        </Grid>
      </Paper>

      <DragOverlay>{activeTask ? <TaskCard task={activeTask} /> : null}</DragOverlay>
    </DndContext>
  );
}
