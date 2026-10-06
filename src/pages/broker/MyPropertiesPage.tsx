import { useState } from 'react';
import {
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Box,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  setListingStatus,
  deleteListing,
  duplicateListing,
} from '../../features/properties/propertiesSlice';
import { brokers } from '../../data/mockData';
import { formatPrice, statusLabel, statusColor } from '../../utils/format';
import ConfirmationDialog from '../../components/common/ConfirmationDialog';

export default function MyPropertiesPage() {
  const user = useAppSelector((s) => s.auth.user);
  const broker = brokers.find((b) => b.userId === user?.id) ?? brokers[0];
  const listings = useAppSelector((s) =>
    s.properties.items.filter((l) => l.brokerId === broker.id),
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const selected = listings.find((l) => l.id === selectedId);

  const openMenu = (e: React.MouseEvent<HTMLElement>, id: string) => {
    setMenuAnchor(e.currentTarget);
    setSelectedId(id);
  };

  const closeMenu = () => setMenuAnchor(null);

  const actions = (
    <>
      <MenuItem
        onClick={() => {
          navigate(`/properties/${selectedId}`);
          closeMenu();
        }}
      >
        View
      </MenuItem>
      <MenuItem
        onClick={() => {
          navigate(`/broker/properties/${selectedId}/edit`);
          closeMenu();
        }}
      >
        Edit
      </MenuItem>
      <MenuItem
        onClick={() => {
          if (selectedId) dispatch(duplicateListing(selectedId));
          closeMenu();
        }}
      >
        Duplicate
      </MenuItem>
      <MenuItem
        onClick={() => {
          if (selectedId) dispatch(setListingStatus({ id: selectedId, status: 'sold' }));
          closeMenu();
        }}
      >
        Mark Sold
      </MenuItem>
      <MenuItem
        onClick={() => {
          if (selectedId)
            dispatch(setListingStatus({ id: selectedId, status: 'inactive' }));
          closeMenu();
        }}
      >
        Deactivate
      </MenuItem>
      <MenuItem
        onClick={() => {
          setDeleteOpen(true);
          closeMenu();
        }}
        sx={{ color: 'error.main' }}
      >
        Delete
      </MenuItem>
    </>
  );

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>
          My Properties
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/broker/properties/add')}
        >
          Add Property
        </Button>
      </Stack>

      {isMobile ? (
        <Stack spacing={1.5}>
          {listings.map((l) => (
            <Card key={l.id} variant="outlined">
              <CardContent>
                <Stack direction="row" justifyContent="space-between">
                  <Box>
                    <Typography fontWeight={600}>{l.title}</Typography>
                    <Typography variant="body2" color="primary">
                      {formatPrice(l.price, l.transaction)}
                    </Typography>
                    <Stack direction="row" spacing={1} mt={1}>
                      <Chip size="small" label={statusLabel(l.status)} color={statusColor(l.status)} />
                      <Chip size="small" label={`${l.enquiryCount} enquiries`} variant="outlined" />
                    </Stack>
                  </Box>
                  <IconButton onClick={(e) => openMenu(e, l.id)}>
                    <MoreVertIcon />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <Paper variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Property</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Enquiries</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listings.map((l) => (
                <TableRow key={l.id} hover>
                  <TableCell>
                    <Typography fontWeight={600}>{l.title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {l.locality}, {l.city}
                    </Typography>
                  </TableCell>
                  <TableCell>{formatPrice(l.price, l.transaction)}</TableCell>
                  <TableCell>
                    <Chip size="small" label={statusLabel(l.status)} color={statusColor(l.status)} />
                  </TableCell>
                  <TableCell>{l.enquiryCount}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={(e) => openMenu(e, l.id)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}>
        {actions}
      </Menu>

      <ConfirmationDialog
        open={deleteOpen}
        title="Delete property?"
        message={`This will permanently remove "${selected?.title}".`}
        confirmLabel="Delete"
        danger
        onCancel={() => setDeleteOpen(false)}
        onConfirm={() => {
          if (selectedId) dispatch(deleteListing(selectedId));
          setDeleteOpen(false);
        }}
      />
    </Box>
  );
}
