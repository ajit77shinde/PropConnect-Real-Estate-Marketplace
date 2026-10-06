import { Typography, Box, Paper, Stack, Chip } from '@mui/material';
import Grid from '../../components/common/Grid';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MailIcon from '@mui/icons-material/Mail';
import EventIcon from '@mui/icons-material/Event';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useAppSelector } from '../../hooks/redux';
import StatCard from '../../components/common/StatCard';
import { brokers } from '../../data/mockData';
import { statusLabel, statusColor } from '../../utils/format';

export default function BrokerDashboard() {
  const user = useAppSelector((s) => s.auth.user);
  const broker = brokers.find((b) => b.userId === user?.id) ?? brokers[0];
  const myListings = useAppSelector((s) =>
    s.properties.items.filter((l) => l.brokerId === broker.id),
  );
  const enquiries = useAppSelector((s) =>
    s.enquiries.items.filter((e) => e.brokerId === broker.id),
  );

  const active = myListings.filter((l) => l.status === 'active').length;
  const visits = enquiries.filter(
    (e) => e.scheduleVisit || e.status === 'site_visit_scheduled',
  ).length;
  const newLeads = enquiries.filter((e) => e.status === 'new').length;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Broker Dashboard
      </Typography>
      <Typography color="text.secondary" mb={3}>
        {broker.firmName}
      </Typography>
      <Grid container spacing={2} mb={4}>
        <Grid size={{ xs: 6, sm: 4, md: 2 }}>
          <StatCard label="Listings" value={myListings.length} icon={<HomeWorkIcon />} />
        </Grid>
        <Grid size={{ xs: 6, sm: 4, md: 2 }}>
          <StatCard label="Active" value={active} icon={<CheckCircleIcon />} />
        </Grid>
        <Grid size={{ xs: 6, sm: 4, md: 3 }}>
          <StatCard label="Enquiries" value={enquiries.length} icon={<MailIcon />} />
        </Grid>
        <Grid size={{ xs: 6, sm: 6, md: 2 }}>
          <StatCard label="Site Visits" value={visits} icon={<EventIcon />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="New Leads" value={newLeads} icon={<TrendingUpIcon />} color="secondary.main" />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Latest Enquiries
      </Typography>
      <Stack spacing={1}>
        {enquiries.slice(0, 5).map((e) => (
          <Paper key={e.id} variant="outlined" sx={{ p: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography fontWeight={600}>{e.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {e.phone} · {e.createdAt}
                </Typography>
              </Box>
              <Chip size="small" label={statusLabel(e.status)} color={statusColor(e.status)} />
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
