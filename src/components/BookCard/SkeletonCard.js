//material UI
import { Grid, Stack, Skeleton } from "@mui/material";

export default function SkeletonCard() {
  return (
    <Grid item xs={6} sm={4} md={3}>
      <Stack spacing={1}>
        <Skeleton variant="rectangular" height={300} />

        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" height={13} />
        <Skeleton variant="text" height={13} />
        <Skeleton variant="text" height={13} />
        <Skeleton variant="text" height={13} />
        <Skeleton variant="text" height={13} width={100} />
        <Skeleton
          variant="text"
          width={60}
          height={40}
          style={{ marginTop: "25px" }}
        />
      </Stack>
    </Grid>
  );
}
