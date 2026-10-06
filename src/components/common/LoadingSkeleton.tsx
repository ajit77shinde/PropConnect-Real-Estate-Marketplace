import { Skeleton, Card, CardContent, Box } from '@mui/material';
import Grid from './Grid';

export default function LoadingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: count }).map((_, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <Skeleton variant="rectangular" height={180} />
            <CardContent>
              <Skeleton width="70%" />
              <Skeleton width="40%" />
              <Box mt={1}>
                <Skeleton width="55%" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
