import { Typography, Paper, Stack, Box, Chip } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { brokers } from '../../data/mockData';
import VerifiedBadge from '../../components/common/VerifiedBadge';

export default function BrokerProfilePage() {
  const user = useAppSelector((s) => s.auth.user);
  const broker = brokers.find((b) => b.userId === user?.id) ?? brokers[0];

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Broker Profile
      </Typography>
      <Paper sx={{ p: 3, maxWidth: 560 }}>
        <Stack spacing={1.5}>
          <Typography variant="h6">{broker.firmName}</Typography>
          {broker.verified && <VerifiedBadge label="Verified Broker" />}
          <Typography color="text.secondary">{broker.about}</Typography>
          <Chip label={`${broker.experienceYears}+ years experience`} />
          <Typography variant="body2">
            📍 {broker.locality}, {broker.city}, {broker.state}
          </Typography>
          <Typography variant="body2">Contact: {user?.phone ?? broker.whatsapp}</Typography>
          <Typography variant="body2">Email: {user?.email}</Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
