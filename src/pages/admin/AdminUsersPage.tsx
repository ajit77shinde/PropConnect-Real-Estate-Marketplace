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
import { users } from '../../data/mockData';

export default function AdminUsersPage() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Users
      </Typography>
      <Paper variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Joined</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.phone}</TableCell>
                <TableCell>
                  <Chip size="small" label={u.role} sx={{ textTransform: 'capitalize' }} />
                </TableCell>
                <TableCell>{u.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
