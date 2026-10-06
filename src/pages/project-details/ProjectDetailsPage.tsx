import { useState } from 'react';
import { Box, Container, Typography, Stack, Button, Chip, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Grid from '../../components/common/Grid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { builders } from '../../data/mockData';
import { formatPrice, formatArea } from '../../utils/format';
import VerifiedBadge from '../../components/common/VerifiedBadge';
import EnquiryForm from '../../components/property/EnquiryForm';
import EmptyState from '../../components/common/EmptyState';

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = useAppSelector((s) => s.projects.items.find((p) => p.id === id));
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  if (!project) {
    return (
      <Container sx={{ py: 4 }}>
        <EmptyState
          title="Project not found"
          actionLabel="Browse projects"
          onAction={() => navigate('/projects')}
        />
      </Container>
    );
  }

  const builder = builders.find((b) => b.id === project.builderId);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          height: { xs: 220, md: 380 },
          mb: 3,
        }}
      >
        <Box
          component="img"
          src={project.images[0]}
          alt={project.name}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
            {project.name}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            By{' '}
            <Button
              component={RouterLink}
              to={`/builders/${builder?.id}`}
              size="small"
              sx={{ p: 0, minWidth: 0, verticalAlign: 'baseline' }}
            >
              {builder?.companyName}
            </Button>
          </Typography>
          {project.verified && (
            <Box sx={{ my: 1 }}>
              <VerifiedBadge label="Verified Builder" />
            </Box>
          )}
          <Typography sx={{ mt: 1 }}>
            📍 {project.locality}, {project.city}
          </Typography>
          <Typography variant="h5" color="primary" fontWeight={700} sx={{ my: 1.5 }}>
            {formatPrice(project.priceFrom)} onwards
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap mb={3}>
            <Chip label={project.bhkOptions.map((b) => `${b} BHK`).join(' & ')} />
            <Chip
              label={`Possession: ${new Date(project.possessionDate).toLocaleDateString('en-IN', {
                month: 'short',
                year: 'numeric',
              })}`}
            />
            <Chip label={`RERA: ${project.rera}`} variant="outlined" />
          </Stack>

          <Typography variant="h6" gutterBottom>
            About
          </Typography>
          <Typography color="text.secondary" paragraph>
            {project.description}
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Project Highlights
          </Typography>
          <Grid container spacing={1} mb={3}>
            {project.amenities.map((a) => (
              <Grid key={a} size={{ xs: 6, sm: 4 }}>
                <Stack direction="row" spacing={0.75} alignItems="center">
                  <CheckCircleOutlineIcon color="success" fontSize="small" />
                  <Typography variant="body2">{a}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" gutterBottom>
            Available Units
          </Typography>
          <Paper variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Configuration</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Carpet Area</TableCell>
                  <TableCell>Available</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {project.units.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>{u.bhk} BHK</TableCell>
                    <TableCell>
                      {formatPrice(u.priceFrom)} – {formatPrice(u.priceTo)}
                    </TableCell>
                    <TableCell>
                      {formatArea(u.carpetAreaFrom)} – {formatArea(u.carpetAreaTo)}
                    </TableCell>
                    <TableCell>
                      {u.available}/{u.total}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper variant="outlined" sx={{ p: 2.5, position: { md: 'sticky' }, top: 88 }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Interested in this project?
            </Typography>
            <Stack spacing={1}>
              <Button variant="contained" fullWidth onClick={() => setEnquiryOpen(true)}>
                Get Price
              </Button>
              <Button variant="outlined" fullWidth onClick={() => setEnquiryOpen(true)}>
                Schedule Site Visit
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <EnquiryForm
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        projectId={project.id}
        builderId={project.builderId}
        recipientName={builder?.companyName ?? project.name}
      />
    </Container>
  );
}
