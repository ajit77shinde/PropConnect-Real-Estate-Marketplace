import { Typography, Paper, Stack, Box } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { builders } from '../../data/mockData';
import VerifiedBadge from '../../components/common/VerifiedBadge';

export default function BuilderProfilePage() {
  const user = useAppSelector((s) => s.auth.user);
  const builder = builders.find((b) => b.userId === user?.id) ?? builders[0];

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Builder Profile
      </Typography>
      <Paper sx={{ p: 3, maxWidth: 560 }}>
        <Stack spacing={1.5}>
          <Typography variant="h6">{builder.companyName}</Typography>
          {builder.verified && <VerifiedBadge label="Verified Builder" />}
          <Typography color="text.secondary">{builder.about}</Typography>
          <Typography variant="body2">
            {builder.city}, {builder.state} · Est. {builder.establishedYear}
          </Typography>
          <Typography variant="body2">Contact: {user?.email}</Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
