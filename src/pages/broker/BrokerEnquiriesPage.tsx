import {
  Typography,
  Paper,
  Stack,
  Chip,
  Box,
  MenuItem,
  TextField,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateEnquiryStatus } from '../../features/enquiries/enquiriesSlice';
import { brokers } from '../../data/mockData';
import { statusLabel, statusColor } from '../../utils/format';
import type { EnquiryStatus } from '../../types';
import EmptyState from '../../components/common/EmptyState';

const STATUSES: EnquiryStatus[] = [
  'new',
  'contacted',
  'site_visit_scheduled',
  'closed',
  'lost',
];

export default function BrokerEnquiriesPage() {
  const user = useAppSelector((s) => s.auth.user);
  const broker = brokers.find((b) => b.userId === user?.id) ?? brokers[0];
  const enquiries = useAppSelector((s) =>
    s.enquiries.items.filter((e) => e.brokerId === broker.id),
  );
  const listings = useAppSelector((s) => s.properties.items);
  const dispatch = useAppDispatch();

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Enquiries / Leads
      </Typography>
      {enquiries.length === 0 ? (
        <EmptyState title="No enquiries yet" description="Leads from your listings will show here." />
      ) : (
        <Stack spacing={1.5}>
          {enquiries.map((e) => {
            const listing = listings.find((l) => l.id === e.listingId);
            return (
              <Paper key={e.id} variant="outlined" sx={{ p: 2 }}>
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Box>
                    <Typography fontWeight={700}>{e.name}</Typography>
                    <Typography variant="body2">
                      {e.phone} · {e.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {listing?.title ?? 'General'} · {e.createdAt}
                    </Typography>
                    {e.message && (
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        “{e.message}”
                      </Typography>
                    )}
                  </Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      size="small"
                      label={statusLabel(e.status)}
                      color={statusColor(e.status)}
                    />
                    <TextField
                      select
                      size="small"
                      label="Update"
                      value={e.status}
                      sx={{ minWidth: 160 }}
                      onChange={(ev) =>
                        dispatch(
                          updateEnquiryStatus({
                            id: e.id,
                            status: ev.target.value as EnquiryStatus,
                          }),
                        )
                      }
                    >
                      {STATUSES.map((s) => (
                        <MenuItem key={s} value={s}>
                          {statusLabel(s)}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      )}
    </Box>
  );
}
