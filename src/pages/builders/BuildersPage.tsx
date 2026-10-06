import { Container, Typography, Card, CardActionArea, CardContent, Stack, Box } from '@mui/material';
import Grid from '../../components/common/Grid';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { useNavigate } from 'react-router-dom';
import { builders } from '../../data/mockData';
import VerifiedBadge from '../../components/common/VerifiedBadge';

export default function BuildersPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Builders
      </Typography>
      <Typography color="text.secondary" mb={3}>
        Partner developers with verified RERA projects.
      </Typography>
      <Grid container spacing={2}>
        {builders.map((b) => (
          <Grid key={b.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card>
              <CardActionArea onClick={() => navigate(`/builders/${b.id}`)}>
                <CardContent>
                  <Stack direction="row" spacing={2}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        bgcolor: 'secondary.main',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <ApartmentIcon />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700}>
                        {b.companyName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {b.city}, {b.state} · Est. {b.establishedYear}
                      </Typography>
                      <Typography variant="caption" display="block" sx={{ mb: 1 }}>
                        {b.projectCount} projects
                      </Typography>
                      {b.verified && <VerifiedBadge label="Verified Builder" />}
                    </Box>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
