import { useState } from 'react';
import { Box, Container, Typography, Button, TextField, MenuItem, Stack, Paper, Chip, InputAdornment } from '@mui/material';
import Grid from '../../components/common/Grid';
import SearchIcon from '@mui/icons-material/Search';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import PropertyCard from '../../components/property/PropertyCard';
import ProjectCard from '../../components/property/ProjectCard';
import {
  POPULAR_LOCATIONS,
  LISTING_TYPES,
  BHK_OPTIONS,
  BUDGET_RANGES,
} from '../../utils/constants';

export default function HomePage() {
  const navigate = useNavigate();
  const listings = useAppSelector((s) => s.properties.items);
  const projects = useAppSelector((s) => s.projects.items);
  const [tab, setTab] = useState<'sell' | 'rent' | 'projects'>('sell');
  const [location, setLocation] = useState('');
  const [listingType, setListingType] = useState('');
  const [bhk, setBhk] = useState('');
  const [budget, setBudget] = useState('');

  const featured = listings.filter((l) => l.featured && l.status === 'active').slice(0, 3);
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 2);

  const handleSearch = () => {
    if (tab === 'projects') {
      navigate(`/projects${location ? `?location=${encodeURIComponent(location)}` : ''}`);
      return;
    }
    const params = new URLSearchParams();
    params.set('transaction', tab);
    if (location) params.set('location', location);
    if (listingType) params.set('listingType', listingType);
    if (bhk) params.set('bhk', bhk);
    if (budget) {
      const range = BUDGET_RANGES[Number(budget)];
      if (range) {
        params.set('minPrice', String(range.min));
        params.set('maxPrice', String(range.max));
      }
    }
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: 520, md: 560 },
          display: 'flex',
          alignItems: 'center',
          background: `
            linear-gradient(135deg, rgba(7,42,64,0.88) 0%, rgba(11,61,92,0.75) 45%, rgba(196,92,38,0.45) 100%),
            url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80) center/cover
          `,
          color: '#fff',
        }}
      >
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              mb: 1,
              textAlign: 'center',
            }}
          >
            Find Your Perfect Property
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', mb: 4, opacity: 0.9, maxWidth: 480, mx: 'auto' }}
          >
            Search verified listings from trusted brokers across Kalyan, Dombivli, Thane & beyond.
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: 3,
              bgcolor: 'rgba(255,255,255,0.97)',
            }}
          >
            <Stack direction="row" spacing={1} mb={2} justifyContent="center" flexWrap="wrap" useFlexGap>
              {(
                [
                  ['sell', 'Buy'],
                  ['rent', 'Rent'],
                  ['projects', 'New Projects'],
                ] as const
              ).map(([key, label]) => (
                <Button
                  key={key}
                  variant={tab === key ? 'contained' : 'outlined'}
                  onClick={() => setTab(key)}
                  size="small"
                >
                  {label}
                </Button>
              ))}
            </Stack>
            <Grid container spacing={1.5}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {tab !== 'projects' && (
                <>
                  <Grid size={{ xs: 6, sm: 6, md: 3 }}>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      label="Property Type"
                      value={listingType}
                      onChange={(e) => setListingType(e.target.value)}
                    >
                      <MenuItem value="">Any</MenuItem>
                      {LISTING_TYPES.slice(0, 6).map((t) => (
                        <MenuItem key={t.value} value={t.value}>
                          {t.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 4, md: 2 }}>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      label="BHK"
                      value={bhk}
                      onChange={(e) => setBhk(e.target.value)}
                    >
                      <MenuItem value="">Any</MenuItem>
                      {BHK_OPTIONS.map((b) => (
                        <MenuItem key={b} value={String(b)}>
                          {b} BHK
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4, md: 2 }}>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      label="Budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    >
                      <MenuItem value="">Any</MenuItem>
                      {BUDGET_RANGES.map((b, i) => (
                        <MenuItem key={b.label} value={String(i)}>
                          {b.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </>
              )}
              <Grid size={{ xs: 12, sm: tab === 'projects' ? 6 : 4, md: tab === 'projects' ? 9 : 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleSearch}
                  sx={{ height: 40 }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>

      {/* Popular locations */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Popular Locations
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          flexWrap="wrap"
          useFlexGap
          sx={{ mt: 2 }}
        >
          {POPULAR_LOCATIONS.map((loc) => (
            <Chip
              key={loc}
              label={loc}
              clickable
              onClick={() => navigate(`/properties?location=${encodeURIComponent(loc)}`)}
              sx={{ px: 1, fontWeight: 600 }}
            />
          ))}
        </Stack>
      </Container>

      {/* Featured */}
      <Box sx={{ bgcolor: 'background.default', py: 6 }}>
        <Container maxWidth="lg">
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4">Featured Properties</Typography>
            <Button onClick={() => navigate('/properties')}>View all</Button>
          </Stack>
          <Grid container spacing={2.5}>
            {featured.map((p) => (
              <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <PropertyCard property={p} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Projects */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">New Projects</Typography>
          <Button onClick={() => navigate('/projects')}>View all</Button>
        </Stack>
        <Grid container spacing={2.5}>
          {featuredProjects.map((p) => (
            <Grid key={p.id} size={{ xs: 12, md: 6 }}>
              <ProjectCard project={p} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Why us */}
      <Box
        sx={{
          py: 6,
          background: 'linear-gradient(180deg, #E8F0F5 0%, #F5F7FA 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" textAlign="center" gutterBottom>
            Why Choose Us?
          </Typography>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {[
              { icon: <VerifiedUserIcon />, title: 'Verified Properties', desc: 'Listings reviewed before going live' },
              { icon: <HandshakeIcon />, title: 'Trusted Brokers', desc: 'KYC-verified broker partners' },
              { icon: <ContactMailIcon />, title: 'Easy Enquiry', desc: 'Connect without spam calls' },
              { icon: <EventAvailableIcon />, title: 'Site Visit Assistance', desc: 'Schedule visits in one tap' },
            ].map((item) => (
              <Grid key={item.title} size={{ xs: 12, sm: 6, md: 3 }}>
                <Box textAlign="center" px={2}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: '#fff',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1.5,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="subtitle1" fontWeight={700}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
