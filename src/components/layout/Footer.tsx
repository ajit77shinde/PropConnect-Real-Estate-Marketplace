import { Box, Container, Typography, Link, Stack } from '@mui/material';
import Grid from '../common/Grid';
import { Link as RouterLink } from 'react-router-dom';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.dark',
        color: 'rgba(255,255,255,0.85)',
        pt: 6,
        pb: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h5"
              sx={{ fontFamily: '"Fraunces", Georgia, serif', color: '#fff', mb: 1 }}
            >
              PropConnect
            </Typography>
            <Typography variant="body2" sx={{ maxWidth: 280 }}>
              Real-estate marketplace connecting buyers, brokers and builders
              across Mumbai Metropolitan Region.
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle2" color="#fff" gutterBottom>
              Explore
            </Typography>
            <Stack spacing={0.75}>
              <Link component={RouterLink} to="/properties" color="inherit" underline="hover">
                Buy
              </Link>
              <Link
                component={RouterLink}
                to="/properties?transaction=rent"
                color="inherit"
                underline="hover"
              >
                Rent
              </Link>
              <Link component={RouterLink} to="/projects" color="inherit" underline="hover">
                Projects
              </Link>
            </Stack>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="subtitle2" color="#fff" gutterBottom>
              Partners
            </Typography>
            <Stack spacing={0.75}>
              <Link component={RouterLink} to="/brokers" color="inherit" underline="hover">
                Brokers
              </Link>
              <Link component={RouterLink} to="/builders" color="inherit" underline="hover">
                Builders
              </Link>
              <Link component={RouterLink} to="/register" color="inherit" underline="hover">
                List your property
              </Link>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle2" color="#fff" gutterBottom>
              Demo logins
            </Typography>
            <Typography variant="caption" display="block">
              buyer@demo.com / demo123
            </Typography>
            <Typography variant="caption" display="block">
              broker@demo.com / demo123
            </Typography>
            <Typography variant="caption" display="block">
              builder@demo.com / demo123
            </Typography>
            <Typography variant="caption" display="block">
              admin@demo.com / demo123
            </Typography>
          </Grid>
        </Grid>
        <Typography
          variant="caption"
          display="block"
          sx={{ mt: 4, pt: 2, borderTop: '1px solid rgba(255,255,255,0.15)' }}
        >
          © {new Date().getFullYear()} PropConnect MVP. Built for demo purposes.
        </Typography>
      </Container>
    </Box>
  );
}
