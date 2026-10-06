import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { brokers } from '../../data/mockData';
import EmptyState from '../../components/common/EmptyState';

export default function BrokerCustomersPage() {
  const user = useAppSelector((s) => s.auth.user);
  const broker = brokers.find((b) => b.userId === user?.id) ?? brokers[0];
  const enquiries = useAppSelector((s) =>
    s.enquiries.items.filter((e) => e.brokerId === broker.id),
  );

  const customers = Object.values(
    enquiries.reduce<
      Record<string, { name: string; phone: string; email: string; count: number }>
    >((acc, e) => {
      const key = e.phone;
      if (!acc[key])
        acc[key] = { name: e.name, phone: e.phone, email: e.email, count: 0 };
      acc[key].count += 1;
      return acc;
    }, {}),
  );

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Customers
      </Typography>
      {customers.length === 0 ? (
        <EmptyState title="No customers yet" />
      ) : (
        <Paper variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Enquiries</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((c) => (
                <TableRow key={c.phone}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.phone}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
}
