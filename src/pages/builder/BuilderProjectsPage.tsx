import { Typography, Button, Stack, Box } from '@mui/material';
import Grid from '../../components/common/Grid';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { builders } from '../../data/mockData';
import ProjectCard from '../../components/property/ProjectCard';

export default function BuilderProjectsPage() {
  const user = useAppSelector((s) => s.auth.user);
  const builder = builders.find((b) => b.userId === user?.id) ?? builders[0];
  const projects = useAppSelector((s) =>
    s.projects.items.filter((p) => p.builderId === builder.id),
  );
  const navigate = useNavigate();

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>
          Projects
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/builder/projects/add')}
        >
          Add Project
        </Button>
      </Stack>
      <Grid container spacing={2}>
        {projects.map((p) => (
          <Grid key={p.id} size={{ xs: 12, md: 6 }}>
            <ProjectCard project={p} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
