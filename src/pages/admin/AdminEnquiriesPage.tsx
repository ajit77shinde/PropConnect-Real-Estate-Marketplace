import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Box,
} from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { statusLabel, statusColor } from '../../utils/format';

export default function AdminEnquiriesPage() {
  const enquiries = useAppSelector((s) => s.enquiries.items);

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        All Enquiries
      </Typography>
      <Paper variant="outlined" sx={{ overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {enquiries.map((e) => (
              <TableRow key={e.id}>
                <TableCell>{e.name}</TableCell>
                <TableCell>
                  {e.phone}
                  <br />
                  <Typography variant="caption">{e.email}</Typography>
                </TableCell>
                <TableCell>{e.projectId ? 'Project' : 'Listing'}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={statusLabel(e.status)}
                    color={statusColor(e.status)}
                  />
                </TableCell>
                <TableCell>{e.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
