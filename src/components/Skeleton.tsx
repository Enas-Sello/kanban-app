import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function AnimatedSkeleton() {
  return (
    <Box sx={{ width: 300 }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton
          key={i}
          sx={{ borderRadius:2 , mb: 2 }}
          variant="rectangular"
          width={340}
          height={150}
        />
      ))}
    </Box>
  );
}
