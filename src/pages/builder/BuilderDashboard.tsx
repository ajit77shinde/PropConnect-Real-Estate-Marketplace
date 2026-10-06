import { Typography, Box } from '@mui/material';
import Grid from '../../components/common/Grid';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MailIcon from '@mui/icons-material/Mail';
import EventIcon from '@mui/icons-material/Event';
import { useAppSelector } from '../../hooks/redux';
import { builders } from '../../data/mockData';
import StatCard from '../../components/common/StatCard';

export default function BuilderDashboard() {
  const user = useAppSelector((s) => s.auth.user);
  const builder = builders.find((b) => b.userId === user?.id) ?? builders[0];
  const projects = useAppSelector((s) =>
    s.projects.items.filter((p) => p.builderId === builder.id),
  );
  const enquiries = useAppSelector((s) =>
    s.enquiries.items.filter((e) => e.builderId === builder.id),
  );

  const totalUnits = projects.reduce(
    (sum, p) => sum + p.units.reduce((s, u) => s + u.total, 0),
    0,
  );
  const available = projects.reduce(
    (sum, p) => sum + p.units.reduce((s, u) => s + u.available, 0),
    0,
  );
  const visits = enquiries.filter((e) => e.scheduleVisit).length;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Builder Dashboard
      </Typography>
      <Typography color="text.secondary" mb={3}>
        {builder.companyName}
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, sm: 4, md: 2 }}>
          <StatCard label="Projects" value={projects.length} icon={<ApartmentIcon />} />
        </Grid>
        <Grid size={{ xs: 6, sm: 4, md: 2 }}>
          <StatCard label="Total Units" value={totalUnits} icon={<HomeIcon />} />
        </Grid>
        <Grid size={{ xs: 6, sm: 4, md: 3 }}>
          <StatCard label="Available" value={available} icon={<CheckCircleIcon />} />
        </Grid>
        <Grid size={{ xs: 6, sm: 6, md: 2 }}>
          <StatCard label="Enquiries" value={enquiries.length} icon={<MailIcon />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Site Visits" value={visits} icon={<EventIcon />} />
        </Grid>
      </Grid>
    </Box>
  );
}
