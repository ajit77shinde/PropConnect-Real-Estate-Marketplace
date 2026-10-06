import { Typography, Paper, Stack, Chip, Box } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import EmptyState from '../../components/common/EmptyState';

export default function SiteVisitsPage() {
  const user = useAppSelector((s) => s.auth.user);
  const visits = useAppSelector((s) =>
    s.enquiries.items.filter(
      (e) =>
        (e.buyerId === user?.id || e.email === user?.email) &&
        (e.scheduleVisit || e.status === 'site_visit_scheduled'),
    ),
  );
  const listings = useAppSelector((s) => s.properties.items);

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={700}>
        Site Visits
      </Typography>
      {visits.length === 0 ? (
        <EmptyState
          title="No site visits scheduled"
          description="Request a visit from any property details page."
        />
      ) : (
        <Stack spacing={1.5}>
          {visits.map((v) => {
            const listing = listings.find((l) => l.id === v.listingId);
            return (
              <Paper key={v.id} variant="outlined" sx={{ p: 2 }}>
                <Typography fontWeight={600}>
                  {listing?.title ?? 'Site visit'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {listing
                    ? `${listing.locality}, ${listing.city}`
                    : 'Location TBD'}
                </Typography>
                <Stack direction="row" spacing={1} mt={1}>
                  <Chip size="small" label={v.visitDate ?? v.createdAt} />
                  <Chip size="small" color="info" label="Scheduled" />
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      )}
    </Box>
  );
}
