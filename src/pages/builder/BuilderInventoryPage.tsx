import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Chip,
} from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { builders } from '../../data/mockData';
import { formatPrice } from '../../utils/format';

export default function BuilderInventoryPage() {
  const user = useAppSelector((s) => s.auth.user);
  const builder = builders.find((b) => b.userId === user?.id) ?? builders[0];
  const projects = useAppSelector((s) =>
    s.projects.items.filter((p) => p.builderId === builder.id),
  );

  const rows = projects.flatMap((p) =>
    p.units.map((u) => ({
      project: p.name,
      ...u,
    })),
  );

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Inventory
      </Typography>
      <Paper variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Project</TableCell>
              <TableCell>BHK</TableCell>
              <TableCell>Price Range</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.project}</TableCell>
                <TableCell>{r.bhk} BHK</TableCell>
                <TableCell>
                  {formatPrice(r.priceFrom)} – {formatPrice(r.priceTo)}
                </TableCell>
                <TableCell>{r.available}</TableCell>
                <TableCell>{r.total}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    color={r.available > 0 ? 'success' : 'default'}
                    label={r.available > 0 ? 'Available' : 'Sold out'}
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
