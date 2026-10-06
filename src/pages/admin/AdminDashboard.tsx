import { Typography, Box, Paper, Stack, Button, Chip } from '@mui/material';
import Grid from '../../components/common/Grid';
import PeopleIcon from '@mui/icons-material/People';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import BusinessIcon from '@mui/icons-material/Business';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import MailIcon from '@mui/icons-material/Mail';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setListingStatus } from '../../features/properties/propertiesSlice';
import { setProjectStatus } from '../../features/projects/projectsSlice';
import { users, brokers, builders } from '../../data/mockData';
import StatCard from '../../components/common/StatCard';
import { formatPrice } from '../../utils/format';

export default function AdminDashboard() {
  const listings = useAppSelector((s) => s.properties.items);
  const projects = useAppSelector((s) => s.projects.items);
  const enquiries = useAppSelector((s) => s.enquiries.items);
  const dispatch = useAppDispatch();

  const pendingListings = listings.filter((l) => l.status === 'pending');
  const pendingProjects = projects.filter((p) => p.status === 'pending');

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={2} mb={4}>
        <Grid size={{ xs: 6, md: 2 }}>
          <StatCard label="Users" value={users.length} icon={<PeopleIcon />} />
        </Grid>
        <Grid size={{ xs: 6, md: 2 }}>
          <StatCard label="Properties" value={listings.length} icon={<HomeWorkIcon />} />
        </Grid>
        <Grid size={{ xs: 6, md: 2 }}>
          <StatCard label="Brokers" value={brokers.length} icon={<BusinessIcon />} />
        </Grid>
        <Grid size={{ xs: 6, md: 2 }}>
          <StatCard label="Builders" value={builders.length} icon={<ApartmentIcon />} />
        </Grid>
        <Grid size={{ xs: 6, md: 2 }}>
          <StatCard
            label="Pending"
            value={pendingListings.length + pendingProjects.length}
            icon={<PendingActionsIcon />}
            color="warning.main"
          />
        </Grid>
        <Grid size={{ xs: 6, md: 2 }}>
          <StatCard label="Enquiries" value={enquiries.length} icon={<MailIcon />} />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Pending Approvals
      </Typography>
      <Stack spacing={1.5}>
        {pendingListings.map((l) => (
          <Paper key={l.id} variant="outlined" sx={{ p: 2 }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              spacing={1}
              alignItems={{ sm: 'center' }}
            >
              <Box>
                <Typography fontWeight={600}>{l.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatPrice(l.price, l.transaction)} · {l.locality}, {l.city}
                </Typography>
                <Chip size="small" label="Listing" sx={{ mt: 0.5 }} />
              </Box>
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() =>
                    dispatch(setListingStatus({ id: l.id, status: 'active' }))
                  }
                >
                  Approve
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() =>
                    dispatch(setListingStatus({ id: l.id, status: 'rejected' }))
                  }
                >
                  Reject
                </Button>
              </Stack>
            </Stack>
          </Paper>
        ))}
        {pendingProjects.map((p) => (
          <Paper key={p.id} variant="outlined" sx={{ p: 2 }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              spacing={1}
              alignItems={{ sm: 'center' }}
            >
              <Box>
                <Typography fontWeight={600}>{p.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {p.locality}, {p.city}
                </Typography>
                <Chip size="small" label="Project" sx={{ mt: 0.5 }} />
              </Box>
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() =>
                    dispatch(setProjectStatus({ id: p.id, status: 'active' }))
                  }
                >
                  Approve
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() =>
                    dispatch(setProjectStatus({ id: p.id, status: 'rejected' }))
                  }
                >
                  Reject
                </Button>
              </Stack>
            </Stack>
          </Paper>
        ))}
        {pendingListings.length === 0 && pendingProjects.length === 0 && (
          <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="text.secondary">No pending approvals</Typography>
          </Paper>
        )}
      </Stack>
    </Box>
  );
}
