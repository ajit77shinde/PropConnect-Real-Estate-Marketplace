import { Box, Container, Typography } from '@mui/material';
import Grid from '../../components/common/Grid';
import { useNavigate, useParams } from 'react-router-dom';
import { builders } from '../../data/mockData';
import { useAppSelector } from '../../hooks/redux';
import VerifiedBadge from '../../components/common/VerifiedBadge';
import ProjectCard from '../../components/property/ProjectCard';
import EmptyState from '../../components/common/EmptyState';

export default function BuilderProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const builder = builders.find((b) => b.id === id);
  const projects = useAppSelector((s) =>
    s.projects.items.filter((p) => p.builderId === id),
  );

  if (!builder) {
    return (
      <Container sx={{ py: 4 }}>
        <EmptyState
          title="Builder not found"
          actionLabel="Browse builders"
          onAction={() => navigate('/builders')}
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          p: { xs: 2.5, md: 4 },
          borderRadius: 3,
          bgcolor: 'primary.main',
          color: '#fff',
          mb: 4,
        }}
      >
        <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
          {builder.companyName}
        </Typography>
        {builder.verified && (
          <Box sx={{ my: 1, '& .MuiChip-root': { bgcolor: 'rgba(255,255,255,0.15)', color: '#fff', borderColor: 'rgba(255,255,255,0.4)' } }}>
            <VerifiedBadge label="Verified Builder" />
          </Box>
        )}
        <Typography sx={{ opacity: 0.9 }}>
          {builder.city}, {builder.state} · Established {builder.establishedYear}
        </Typography>
      </Box>
      <Typography variant="h5" gutterBottom>
        About
      </Typography>
      <Typography color="text.secondary" paragraph>
        {builder.about}
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        Projects
      </Typography>
      <Grid container spacing={2}>
        {projects.map((p) => (
          <Grid key={p.id} size={{ xs: 12, md: 6 }}>
            <ProjectCard project={p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
