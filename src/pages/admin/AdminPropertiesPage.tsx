import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Button,
  Stack,
  Box,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setListingStatus, updateListing } from '../../features/properties/propertiesSlice';
import { formatPrice, statusLabel, statusColor } from '../../utils/format';

export default function AdminPropertiesPage() {
  const listings = useAppSelector((s) => s.properties.items);
  const dispatch = useAppDispatch();

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Properties
      </Typography>
      <Paper variant="outlined" sx={{ overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Property</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Featured</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listings.map((l) => (
              <TableRow key={l.id}>
                <TableCell>
                  <Typography fontWeight={600} variant="body2">
                    {l.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {l.city}
                  </Typography>
                </TableCell>
                <TableCell>{formatPrice(l.price, l.transaction)}</TableCell>
                <TableCell>
                  <Chip size="small" label={statusLabel(l.status)} color={statusColor(l.status)} />
                </TableCell>
                <TableCell>{l.featured ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={0.5}>
                    {l.status === 'pending' && (
                      <Button
                        size="small"
                        onClick={() =>
                          dispatch(setListingStatus({ id: l.id, status: 'active' }))
                        }
                      >
                        Approve
                      </Button>
                    )}
                    <Button
                      size="small"
                      onClick={() =>
                        dispatch(updateListing({ ...l, featured: !l.featured }))
                      }
                    >
                      {l.featured ? 'Unfeature' : 'Feature'}
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
