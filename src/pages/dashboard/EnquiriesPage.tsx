import {
  Typography,
  Paper,
  Stack,
  Chip,
  Box,
} from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { statusLabel, statusColor } from '../../utils/format';
import EmptyState from '../../components/common/EmptyState';
import { useNavigate } from 'react-router-dom';

export default function EnquiriesPage() {
  const user = useAppSelector((s) => s.auth.user);
  const enquiries = useAppSelector((s) =>
    s.enquiries.items.filter(
      (e) => e.buyerId === user?.id || e.email === user?.email,
    ),
  );
  const listings = useAppSelector((s) => s.properties.items);
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={700}>
        My Enquiries
      </Typography>
      {enquiries.length === 0 ? (
        <EmptyState
          title="No enquiries yet"
          description="When you contact a broker, your enquiry history appears here."
          actionLabel="Find properties"
          onAction={() => navigate('/properties')}
        />
      ) : (
        <Stack spacing={1.5}>
          {enquiries.map((e) => {
            const listing = listings.find((l) => l.id === e.listingId);
            return (
              <Paper key={e.id} variant="outlined" sx={{ p: 2 }}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Box>
                    <Typography fontWeight={600}>
                      {listing?.title ?? 'Enquiry'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {listing
                        ? `${listing.locality}, ${listing.city}`
                        : e.message || 'General enquiry'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {e.createdAt}
                      {e.scheduleVisit ? ' · Site visit requested' : ''}
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
        </Stack>
      )}
    </Box>
  );
}
