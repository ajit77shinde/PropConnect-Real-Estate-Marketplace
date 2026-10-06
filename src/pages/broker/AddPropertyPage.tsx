import { useState } from 'react';
import { Box, Typography, Stepper, Step, StepLabel, Button, Stack, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Checkbox, FormGroup, Paper, Alert, MenuItem } from '@mui/material';
import Grid from '../../components/common/Grid';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addListing, updateListing } from '../../features/properties/propertiesSlice';
import { LISTING_TYPES, AMENITIES, FURNISHING_OPTIONS } from '../../utils/constants';
import type { Listing, ListingType, TransactionType, Furnishing } from '../../types';
import { brokers } from '../../data/mockData';
import { formatPrice, listingTypeLabel } from '../../utils/format';
import PropertyCard from '../../components/property/PropertyCard';

const steps = [
  'Property Type',
  'Transaction',
  'Location',
  'Details',
  'Pricing',
  'Amenities',
  'Photos',
  'Description',
  'Preview',
];

const emptyForm = {
  listingType: 'apartment' as ListingType,
  transaction: 'sell' as TransactionType,
  state: 'Maharashtra',
  city: '',
  area: '',
  locality: '',
  building: '',
  pincode: '',
  bhk: 2,
  bathrooms: 2,
  carpetArea: 850,
  builtUpArea: 1050,
  floor: 1,
  totalFloors: 10,
  propertyAge: 0,
  facing: 'East',
  parking: 1,
  furnishing: 'semi-furnished' as Furnishing,
  possession: 'ready' as const,
  price: 0,
  maintenance: 0,
  deposit: 0,
  negotiable: true,
  amenities: [] as string[],
  images: [
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
  ],
  description: '',
  title: '',
};

export default function AddPropertyPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const existing = useAppSelector((s) => s.properties.items.find((l) => l.id === id));
  const user = useAppSelector((s) => s.auth.user);
  const broker = brokers.find((b) => b.userId === user?.id) ?? brokers[0];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState(() => {
    if (existing) {
      return {
        listingType: existing.listingType,
        transaction: existing.transaction,
        state: existing.state,
        city: existing.city,
        area: existing.area,
        locality: existing.locality,
        building: existing.building ?? '',
        pincode: existing.pincode,
        bhk: existing.bhk ?? 2,
        bathrooms: existing.bathrooms ?? 2,
        carpetArea: existing.carpetArea ?? 0,
        builtUpArea: existing.builtUpArea ?? 0,
        floor: existing.floor ?? 0,
        totalFloors: existing.totalFloors ?? 0,
        propertyAge: existing.propertyAge ?? 0,
        facing: existing.facing ?? '',
        parking: existing.parking ?? 0,
        furnishing: (existing.furnishing ?? 'unfurnished') as Furnishing,
        possession: existing.possession,
        price: existing.price,
        maintenance: existing.maintenance ?? 0,
        deposit: existing.deposit ?? 0,
        negotiable: existing.negotiable,
        amenities: existing.amenities,
        images: existing.images,
        description: existing.description,
        title: existing.title,
      };
    }
    return emptyForm;
  });
  const [imageUrl, setImageUrl] = useState('');
  const [done, setDone] = useState(false);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const buildListing = (status: Listing['status']): Listing => {
    const title =
      form.title ||
      `${form.bhk ? `${form.bhk} BHK ` : ''}${listingTypeLabel(form.listingType)}`;
    return {
      id: existing?.id ?? `l-${Date.now()}`,
      title,
      description: form.description || `${title} in ${form.locality}, ${form.city}.`,
      listingType: form.listingType,
      transaction: form.transaction,
      status,
      price: form.price,
      maintenance: form.maintenance || undefined,
      deposit: form.deposit || undefined,
      negotiable: form.negotiable,
      bhk: form.bhk,
      bathrooms: form.bathrooms,
      carpetArea: form.carpetArea,
      builtUpArea: form.builtUpArea,
      floor: form.floor,
      totalFloors: form.totalFloors,
      propertyAge: form.propertyAge,
      facing: form.facing,
      parking: form.parking,
      furnishing: form.furnishing,
      possession: form.possession,
      amenities: form.amenities,
      images: form.images.length
        ? form.images
        : ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'],
      reraVerified: false,
      verified: false,
      featured: false,
      state: form.state,
      city: form.city,
      area: form.area || form.locality,
      locality: form.locality,
      building: form.building,
      pincode: form.pincode,
      brokerId: broker.id,
      enquiryCount: existing?.enquiryCount ?? 0,
      createdAt: existing?.createdAt ?? new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
    };
  };

  const submit = (status: Listing['status']) => {
    const listing = buildListing(status);
    if (isEdit) dispatch(updateListing(listing));
    else dispatch(addListing(listing));
    setDone(true);
  };

  if (done) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Alert severity="success" sx={{ mb: 2 }}>
          Property {isEdit ? 'updated' : 'submitted'} successfully!
          {!isEdit && ' It will appear after admin approval (pending).'}
        </Alert>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" onClick={() => navigate('/broker/properties')}>
            My Properties
          </Button>
          <Button onClick={() => navigate('/broker/dashboard')}>Dashboard</Button>
        </Stack>
      </Paper>
    );
  }

  const preview = buildListing(isEdit ? existing?.status ?? 'pending' : 'pending');

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        {isEdit ? 'Edit Property' : 'Add Property'}
      </Typography>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{ mb: 3, display: { xs: 'none', md: 'flex' } }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{ display: { md: 'none' }, mb: 2 }}
      >
        Step {activeStep + 1} of {steps.length}: {steps[activeStep]}
      </Typography>

      <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
        {activeStep === 0 && (
          <FormControl>
            <Typography variant="h6" gutterBottom>
              What are you listing?
            </Typography>
            <RadioGroup
              value={form.listingType}
              onChange={(e) => set('listingType', e.target.value as ListingType)}
            >
              {LISTING_TYPES.map((t) => (
                <FormControlLabel
                  key={t.value}
                  value={t.value}
                  control={<Radio />}
                  label={t.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}

        {activeStep === 1 && (
          <FormControl>
            <Typography variant="h6" gutterBottom>
              Transaction type
            </Typography>
            <RadioGroup
              value={form.transaction}
              onChange={(e) => set('transaction', e.target.value as TransactionType)}
            >
              <FormControlLabel value="sell" control={<Radio />} label="Sell" />
              <FormControlLabel value="rent" control={<Radio />} label="Rent" />
              <FormControlLabel value="lease" control={<Radio />} label="Lease" />
            </RadioGroup>
          </FormControl>
        )}

        {activeStep === 2 && (
          <Stack spacing={2}>
            <Typography variant="h6">Location</Typography>
            <Grid container spacing={2}>
              {(
                [
                  ['state', 'State'],
                  ['city', 'City'],
                  ['area', 'Area'],
                  ['locality', 'Locality'],
                  ['building', 'Building / Society'],
                  ['pincode', 'Pincode'],
                ] as const
              ).map(([key, label]) => (
                <Grid key={key} size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label={label}
                    fullWidth
                    value={form[key]}
                    onChange={(e) => set(key, e.target.value)}
                  />
                </Grid>
              ))}
            </Grid>
          </Stack>
        )}

        {activeStep === 3 && (
          <Stack spacing={2}>
            <Typography variant="h6">Property details</Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6, sm: 4 }}>
                <TextField
                  label="BHK"
                  type="number"
                  fullWidth
                  value={form.bhk}
                  onChange={(e) => set('bhk', Number(e.target.value))}
                />
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <TextField
                  label="Bathrooms"
                  type="number"
                  fullWidth
                  value={form.bathrooms}
                  onChange={(e) => set('bathrooms', Number(e.target.value))}
                />
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <TextField
                  label="Carpet Area"
                  type="number"
                  fullWidth
                  value={form.carpetArea}
                  onChange={(e) => set('carpetArea', Number(e.target.value))}
                />
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <TextField
                  label="Built-up Area"
                  type="number"
                  fullWidth
                  value={form.builtUpArea}
                  onChange={(e) => set('builtUpArea', Number(e.target.value))}
                />
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <TextField
                  label="Floor"
                  type="number"
                  fullWidth
                  value={form.floor}
                  onChange={(e) => set('floor', Number(e.target.value))}
                />
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <TextField
                  label="Total Floors"
                  type="number"
                  fullWidth
                  value={form.totalFloors}
                  onChange={(e) => set('totalFloors', Number(e.target.value))}
                />
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <TextField
                  label="Property Age (yrs)"
                  type="number"
                  fullWidth
                  value={form.propertyAge}
                  onChange={(e) => set('propertyAge', Number(e.target.value))}
                />
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <TextField
                  label="Facing"
                  fullWidth
                  value={form.facing}
                  onChange={(e) => set('facing', e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <TextField
                  label="Parking"
                  type="number"
                  fullWidth
                  value={form.parking}
                  onChange={(e) => set('parking', Number(e.target.value))}
                />
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <TextField
                  select
                  label="Furnishing"
                  fullWidth
                  value={form.furnishing}
                  onChange={(e) => set('furnishing', e.target.value as Furnishing)}
                >
                  {FURNISHING_OPTIONS.map((f) => (
                    <MenuItem key={f.value} value={f.value}>
                      {f.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <TextField
                  select
                  label="Possession"
                  fullWidth
                  value={form.possession}
                  onChange={(e) =>
                    set('possession', e.target.value as 'ready' | 'under-construction')
                  }
                >
                  <MenuItem value="ready">Ready</MenuItem>
                  <MenuItem value="under-construction">Under Construction</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Stack>
        )}

        {activeStep === 4 && (
          <Stack spacing={2}>
            <Typography variant="h6">Pricing</Typography>
            <TextField
              label={form.transaction === 'rent' ? 'Monthly Rent' : 'Expected Price'}
              type="number"
              fullWidth
              value={form.price || ''}
              onChange={(e) => set('price', Number(e.target.value))}
              helperText={form.price ? formatPrice(form.price, form.transaction) : ''}
            />
            <TextField
              label="Maintenance"
              type="number"
              fullWidth
              value={form.maintenance || ''}
              onChange={(e) => set('maintenance', Number(e.target.value))}
            />
            {form.transaction !== 'sell' && (
              <TextField
                label="Deposit"
                type="number"
                fullWidth
                value={form.deposit || ''}
                onChange={(e) => set('deposit', Number(e.target.value))}
              />
            )}
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.negotiable}
                  onChange={(e) => set('negotiable', e.target.checked)}
                />
              }
              label="Price negotiable"
            />
          </Stack>
        )}

        {activeStep === 5 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Amenities
            </Typography>
            <FormGroup>
              <Grid container>
                {AMENITIES.map((a) => (
                  <Grid key={a} size={{ xs: 6, sm: 4 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form.amenities.includes(a)}
                          onChange={(e) => {
                            if (e.target.checked) set('amenities', [...form.amenities, a]);
                            else
                              set(
                                'amenities',
                                form.amenities.filter((x) => x !== a),
                              );
                          }}
                        />
                      }
                      label={a}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>
          </Box>
        )}

        {activeStep === 6 && (
          <Stack spacing={2}>
            <Typography variant="h6">Photos</Typography>
            <Typography variant="body2" color="text.secondary">
              Paste image URLs for the MVP (Cloudinary/S3 upload can plug in later).
            </Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                size="small"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <Button
                variant="outlined"
                onClick={() => {
                  if (imageUrl.trim()) {
                    set('images', [...form.images, imageUrl.trim()]);
                    setImageUrl('');
                  }
                }}
              >
                Add
              </Button>
            </Stack>
            <Grid container spacing={1}>
              {form.images.map((img) => (
                <Grid key={img} size={{ xs: 6, sm: 3 }}>
                  <Box
                    component="img"
                    src={img}
                    alt=""
                    sx={{
                      width: '100%',
                      height: 100,
                      objectFit: 'cover',
                      borderRadius: 1,
                    }}
                  />
                  <Button
                    size="small"
                    color="error"
                    onClick={() =>
                      set(
                        'images',
                        form.images.filter((i) => i !== img),
                      )
                    }
                  >
                    Remove
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Stack>
        )}

        {activeStep === 7 && (
          <Stack spacing={2}>
            <Typography variant="h6">Description</Typography>
            <TextField
              label="Listing title"
              fullWidth
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="e.g. 2 BHK Apartment"
            />
            <TextField
              label="Property Description"
              fullWidth
              multiline
              rows={5}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
            />
          </Stack>
        )}

        {activeStep === 8 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Preview
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 5 }}>
                <PropertyCard property={preview} />
              </Grid>
              <Grid size={{ xs: 12, md: 7 }}>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Review how your listing will appear. Submit for admin approval, or save as
                  draft.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                  <Button variant="outlined" onClick={() => submit('draft')}>
                    Save Draft
                  </Button>
                  <Button variant="contained" onClick={() => submit('pending')}>
                    Submit Property
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      <Stack direction="row" justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={() => setActiveStep((s) => s - 1)}>
          Back
        </Button>
        {activeStep < steps.length - 1 && (
          <Button variant="contained" onClick={() => setActiveStep((s) => s + 1)}>
            Next
          </Button>
        )}
      </Stack>
    </Box>
  );
}
