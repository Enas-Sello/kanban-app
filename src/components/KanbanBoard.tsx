import { Box } from '@mui/material';
import Column from './Column';

export default function KanbanBoard() {
  const columns = ['backlog','inprogress','review','done'];
  return (
    <Box sx={{ display:'flex', gap:2, alignItems:'flex-start' }}>
      {columns.map(col => <Column key={col} column={col} />)}
    </Box>
  );
}
