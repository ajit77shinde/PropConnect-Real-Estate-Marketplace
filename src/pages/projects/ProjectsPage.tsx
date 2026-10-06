import { Container, Typography } from '@mui/material';
import Grid from '../../components/common/Grid';
import { useAppSelector } from '../../hooks/redux';
import ProjectCard from '../../components/property/ProjectCard';

export default function ProjectsPage() {
  const projects = useAppSelector((s) =>
    s.projects.items.filter((p) => p.status === 'active'),
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        New Projects
      </Typography>
      <Typography color="text.secondary" mb={3}>
        Explore under-construction and ready projects from verified builders.
      </Typography>
      <Grid container spacing={2.5}>
        {projects.map((p) => (
          <Grid key={p.id} size={{ xs: 12, md: 6 }}>
            <ProjectCard project={p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
