import { Typography, Paper, Stack, Chip, Box } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { brokers } from '../../data/mockData';
import EmptyState from '../../components/common/EmptyState';

export default function BrokerSiteVisitsPage() {
  const user = useAppSelector((s) => s.auth.user);
  const broker = brokers.find((b) => b.userId === user?.id) ?? brokers[0];
  const visits = useAppSelector((s) =>
    s.enquiries.items.filter(
      (e) =>
        e.brokerId === broker.id &&
        (e.scheduleVisit || e.status === 'site_visit_scheduled'),
    ),
  );
  const listings = useAppSelector((s) => s.properties.items);

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Site Visits
      </Typography>
      {visits.length === 0 ? (
        <EmptyState title="No site visits scheduled" />
      ) : (
        <Stack spacing={1.5}>
          {visits.map((v) => {
            const listing = listings.find((l) => l.id === v.listingId);
            return (
              <Paper key={v.id} variant="outlined" sx={{ p: 2 }}>
                <Typography fontWeight={600}>{v.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {listing?.title} · {v.phone}
                </Typography>
                <Chip
                  size="small"
                  sx={{ mt: 1 }}
                  label={v.visitDate ?? v.createdAt}
                  color="info"
                />
              </Paper>
            );
          })}
        </Stack>
      )}
    </Box>
  );
}
