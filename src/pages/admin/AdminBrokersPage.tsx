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
import { brokers } from '../../data/mockData';

export default function AdminBrokersPage() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Brokers
      </Typography>
      <Paper variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Firm</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Properties</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brokers.map((b) => (
              <TableRow key={b.id}>
                <TableCell>{b.firmName}</TableCell>
                <TableCell>
                  {b.locality}, {b.city}
                </TableCell>
                <TableCell>{b.experienceYears} yrs</TableCell>
                <TableCell>{b.propertyCount}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    color={b.verified ? 'success' : 'warning'}
                    label={b.verified ? 'Verified' : 'Pending'}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
