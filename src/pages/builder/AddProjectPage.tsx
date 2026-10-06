import { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Stack, Alert, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import Grid from '../../components/common/Grid';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addProject } from '../../features/projects/projectsSlice';
import { builders } from '../../data/mockData';
import { AMENITIES } from '../../utils/constants';
import type { Project } from '../../types';

export default function AddProjectPage() {
  const user = useAppSelector((s) => s.auth.user);
  const builder = builders.find((b) => b.userId === user?.id) ?? builders[0];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: '',
    locality: '',
    city: 'Kalyan',
    state: 'Maharashtra',
    priceFrom: 6500000,
    possessionDate: '2028-12-01',
    rera: '',
    description: '',
    amenities: [] as string[],
    bhk2PriceFrom: 6500000,
    bhk2PriceTo: 7200000,
    bhk2Available: 40,
    bhk3PriceFrom: 8500000,
    bhk3PriceTo: 9500000,
    bhk3Available: 30,
  });

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    const project: Project = {
      id: `p-${Date.now()}`,
      name: form.name || 'New Project',
      slug: (form.name || 'new-project').toLowerCase().replace(/\s+/g, '-'),
      builderId: builder.id,
      description: form.description || 'New residential project.',
      city: form.city,
      state: form.state,
      locality: form.locality,
      priceFrom: form.priceFrom,
      bhkOptions: [2, 3],
      possessionDate: form.possessionDate,
      rera: form.rera || 'PENDING',
      verified: false,
      featured: false,
      amenities: form.amenities,
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      ],
      units: [
        {
          id: `u-${Date.now()}-2`,
          bhk: 2,
          priceFrom: form.bhk2PriceFrom,
          priceTo: form.bhk2PriceTo,
          carpetAreaFrom: 650,
          carpetAreaTo: 720,
          available: form.bhk2Available,
          total: form.bhk2Available + 20,
        },
        {
          id: `u-${Date.now()}-3`,
          bhk: 3,
          priceFrom: form.bhk3PriceFrom,
          priceTo: form.bhk3PriceTo,
          carpetAreaFrom: 950,
          carpetAreaTo: 1100,
          available: form.bhk3Available,
          total: form.bhk3Available + 20,
        },
      ],
      enquiryCount: 0,
      status: 'pending',
      createdAt: new Date().toISOString().slice(0, 10),
    };
    dispatch(addProject(project));
    setDone(true);
  };

  if (done) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Alert severity="success" sx={{ mb: 2 }}>
          Project submitted for approval.
        </Alert>
        <Button variant="contained" onClick={() => navigate('/builder/projects')}>
          View Projects
        </Button>
      </Paper>
    );
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Add Project
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Stack spacing={2}>
          <TextField
            label="Project Name"
            fullWidth
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
          />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Locality"
                fullWidth
                value={form.locality}
                onChange={(e) => set('locality', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <TextField
                label="City"
                fullWidth
                value={form.city}
                onChange={(e) => set('city', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4 }}>
              <TextField
                label="RERA"
                fullWidth
                value={form.rera}
                onChange={(e) => set('rera', e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <TextField
                label="Price From"
                type="number"
                fullWidth
                value={form.priceFrom}
                onChange={(e) => set('priceFrom', Number(e.target.value))}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField
                label="Possession Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={form.possessionDate}
                onChange={(e) => set('possessionDate', e.target.value)}
              />
            </Grid>
          </Grid>
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
          />
          <Typography variant="subtitle2">Unit inventory</Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, sm: 3 }}>
              <TextField
                label="2BHK From"
                type="number"
                fullWidth
                value={form.bhk2PriceFrom}
                onChange={(e) => set('bhk2PriceFrom', Number(e.target.value))}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <TextField
                label="2BHK To"
                type="number"
                fullWidth
                value={form.bhk2PriceTo}
                onChange={(e) => set('bhk2PriceTo', Number(e.target.value))}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <TextField
                label="3BHK From"
                type="number"
                fullWidth
                value={form.bhk3PriceFrom}
                onChange={(e) => set('bhk3PriceFrom', Number(e.target.value))}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <TextField
                label="3BHK To"
                type="number"
                fullWidth
                value={form.bhk3PriceTo}
                onChange={(e) => set('bhk3PriceTo', Number(e.target.value))}
              />
            </Grid>
          </Grid>
          <Typography variant="subtitle2">Amenities</Typography>
          <FormGroup row>
            {AMENITIES.slice(0, 8).map((a) => (
              <FormControlLabel
                key={a}
                control={
                  <Checkbox
                    checked={form.amenities.includes(a)}
                    onChange={(e) => {
                      if (e.target.checked) set('amenities', [...form.amenities, a]);
                      else set('amenities', form.amenities.filter((x) => x !== a));
                    }}
                  />
                }
                label={a}
              />
            ))}
          </FormGroup>
          <Button variant="contained" onClick={submit}>
            Submit Project
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
