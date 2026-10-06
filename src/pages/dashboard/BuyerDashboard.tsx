import { Typography, Paper, Stack, Chip, Box, Button } from '@mui/material';
import Grid from '../../components/common/Grid';
import MailIcon from '@mui/icons-material/Mail';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EventIcon from '@mui/icons-material/Event';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import StatCard from '../../components/common/StatCard';
import { statusLabel, statusColor } from '../../utils/format';

export default function BuyerDashboard() {
  const user = useAppSelector((s) => s.auth.user);
  const enquiries = useAppSelector((s) =>
    s.enquiries.items.filter(
      (e) => e.buyerId === user?.id || e.email === user?.email,
    ),
  );
  const favourites = useAppSelector((s) => s.favourites.ids);
  const listings = useAppSelector((s) => s.properties.items);
  const navigate = useNavigate();

  const visits = enquiries.filter((e) => e.scheduleVisit || e.status === 'site_visit_scheduled');

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name.split(' ')[0]}
      </Typography>
      <Typography color="text.secondary" mb={3}>
        Track your enquiries, saved homes and site visits.
      </Typography>
      <Grid container spacing={2} mb={4}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard label="My Enquiries" value={enquiries.length} icon={<MailIcon />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard label="Saved Properties" value={favourites.length} icon={<FavoriteIcon />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard label="Site Visits" value={visits.length} icon={<EventIcon />} />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Recent Enquiries
      </Typography>
      <Stack spacing={1.5}>
        {enquiries.slice(0, 5).map((e) => {
          const listing = listings.find((l) => l.id === e.listingId);
          return (
            <Paper key={e.id} variant="outlined" sx={{ p: 2 }}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ sm: 'center' }}
                spacing={1}
              >
                <Box>
                  <Typography fontWeight={600}>
                    {listing?.title ?? 'Property enquiry'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {listing ? `${listing.locality}, ${listing.city}` : e.createdAt}
                  </Typography>
                </Box>
                <Chip
                  size="small"
                  label={statusLabel(e.status)}
                  color={statusColor(e.status)}
                />
              </Stack>
            </Paper>
          );
        })}
        {enquiries.length === 0 && (
          <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="text.secondary" mb={1}>
              No enquiries yet
            </Typography>
            <Button variant="contained" onClick={() => navigate('/properties')}>
              Browse properties
            </Button>
          </Paper>
        )}
      </Stack>
    </Box>
  );
}
