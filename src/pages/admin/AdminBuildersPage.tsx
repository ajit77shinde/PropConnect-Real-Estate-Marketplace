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
import { builders } from '../../data/mockData';

export default function AdminBuildersPage() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Builders
      </Typography>
      <Paper variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Established</TableCell>
              <TableCell>Projects</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {builders.map((b) => (
              <TableRow key={b.id}>
                <TableCell>{b.companyName}</TableCell>
                <TableCell>{b.city}</TableCell>
                <TableCell>{b.establishedYear}</TableCell>
                <TableCell>{b.projectCount}</TableCell>
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
