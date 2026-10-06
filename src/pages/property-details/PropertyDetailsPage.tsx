import { useState } from 'react';
import { Box, Container, Typography, Stack, Button, Chip, Divider, Paper, IconButton } from '@mui/material';
import Grid from '../../components/common/Grid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleFavourite } from '../../features/favourites/favouritesSlice';
import { brokers } from '../../data/mockData';
import {
  formatPrice,
  formatArea,
  listingTypeLabel,
} from '../../utils/format';
import VerifiedBadge from '../../components/common/VerifiedBadge';
import EnquiryForm from '../../components/property/EnquiryForm';
import EmptyState from '../../components/common/EmptyState';

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const property = useAppSelector((s) =>
    s.properties.items.find((l) => l.id === id),
  );
  const favourites = useAppSelector((s) => s.favourites.ids);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  if (!property) {
    return (
      <Container sx={{ py: 4 }}>
        <EmptyState
          title="Property not found"
          actionLabel="Browse properties"
          onAction={() => navigate('/properties')}
        />
      </Container>
    );
  }

  const broker = brokers.find((b) => b.id === property.brokerId);
  const liked = favourites.includes(property.id);

  const highlights = [
    { label: 'Property Type', value: listingTypeLabel(property.listingType) },
    { label: 'Carpet Area', value: formatArea(property.carpetArea) },
    { label: 'Built-up Area', value: formatArea(property.builtUpArea) },
    { label: 'Floor', value: property.floor != null ? `${property.floor}` : '—' },
    { label: 'Total Floors', value: property.totalFloors ?? '—' },
    { label: 'Age', value: property.propertyAge != null ? `${property.propertyAge} Years` : '—' },
    { label: 'Possession', value: property.possession === 'ready' ? 'Ready' : 'Under Construction' },
    { label: 'Furnishing', value: property.furnishing?.replace('-', ' ') ?? '—' },
    { label: 'Facing', value: property.facing ?? '—' },
    { label: 'Parking', value: property.parking ?? '—' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Gallery */}
      <Box
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          mb: 2,
          height: { xs: 240, md: 420 },
          bgcolor: 'grey.200',
        }}
      >
        <Box
          component="img"
          src={property.images[activeImg]}
          alt={property.title}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
      {property.images.length > 1 && (
        <Stack direction="row" spacing={1} mb={3} sx={{ overflowX: 'auto' }}>
          {property.images.map((img, i) => (
            <Box
              key={img}
              component="img"
              src={img}
              onClick={() => setActiveImg(i)}
              sx={{
                width: 88,
                height: 64,
                objectFit: 'cover',
                borderRadius: 1,
                cursor: 'pointer',
                border: i === activeImg ? '2px solid' : '2px solid transparent',
                borderColor: i === activeImg ? 'primary.main' : 'transparent',
              }}
            />
          ))}
        </Stack>
      )}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Typography variant="h4" fontWeight={700}>
                {property.bhk ? `${property.bhk} BHK ` : ''}
                {listingTypeLabel(property.listingType)}
              </Typography>
              <Typography variant="h5" color="primary" fontWeight={700} sx={{ my: 1 }}>
                {formatPrice(property.price, property.transaction)}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <LocationOnIcon fontSize="small" color="action" />
                <Typography color="text.secondary">
                  {property.building ? `${property.building}, ` : ''}
                  {property.locality}, {property.city}
                </Typography>
              </Stack>
            </Box>
            <IconButton onClick={() => dispatch(toggleFavourite(property.id))}>
              {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </IconButton>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ my: 2 }}>
            {property.bhk && <Chip label={`${property.bhk} BHK`} />}
            {property.bathrooms && <Chip label={`${property.bathrooms} Bath`} />}
            <Chip label={formatArea(property.carpetArea)} />
            {property.parking != null && <Chip label={`${property.parking} Parking`} />}
            {property.reraVerified && <Chip label="RERA ✓" color="success" variant="outlined" />}
            {property.verified && <VerifiedBadge />}
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Highlights
          </Typography>
          <Grid container spacing={1.5} sx={{ mb: 3 }}>
            {highlights.map((h) => (
              <Grid key={h.label} size={{ xs: 6, sm: 4 }}>
                <Typography variant="caption" color="text.secondary">
                  {h.label}
                </Typography>
                <Typography variant="body2" fontWeight={600} sx={{ textTransform: 'capitalize' }}>
                  {h.value}
                </Typography>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" gutterBottom>
            Description
          </Typography>
          <Typography color="text.secondary" paragraph>
            {property.description}
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Amenities
          </Typography>
          <Grid container spacing={1}>
            {property.amenities.map((a) => (
              <Grid key={a} size={{ xs: 6, sm: 4 }}>
                <Stack direction="row" spacing={0.75} alignItems="center">
                  <CheckCircleOutlineIcon color="success" fontSize="small" />
                  <Typography variant="body2">{a}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Location
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              height: 220,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#E8F0F5',
              borderRadius: 2,
            }}
          >
            <Stack alignItems="center" spacing={1}>
              <LocationOnIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography fontWeight={600}>
                {property.locality}, {property.city}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Map integration ready (Google Maps / Mapbox)
              </Typography>
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            variant="outlined"
            sx={{ p: 2.5, position: { md: 'sticky' }, top: { md: 88 } }}
          >
            {broker ? (
              <>
                <Typography variant="h6" fontWeight={700}>
                  {broker.firmName}
                </Typography>
                {broker.verified && (
                  <Box sx={{ my: 1 }}>
                    <VerifiedBadge label="Verified Broker" />
                  </Box>
                )}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {broker.locality}, {broker.city} · {broker.experienceYears}+ yrs
                </Typography>
                <Stack spacing={1}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<MailOutlineIcon />}
                    onClick={() => setEnquiryOpen(true)}
                  >
                    Send Enquiry
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<CalendarMonthIcon />}
                    onClick={() => setEnquiryOpen(true)}
                  >
                    Schedule Site Visit
                  </Button>
                  {broker.whatsapp && (
                    <Button
                      variant="outlined"
                      fullWidth
                      color="success"
                      startIcon={<WhatsAppIcon />}
                      href={`https://wa.me/${broker.whatsapp}?text=${encodeURIComponent(
                        `Hi, I'm interested in ${property.title} on PropConnect`,
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp
                    </Button>
                  )}
                  <Button
                    component={RouterLink}
                    to={`/brokers/${broker.id}`}
                    fullWidth
                  >
                    View Broker Profile
                  </Button>
                </Stack>
              </>
            ) : (
              <Button variant="contained" fullWidth onClick={() => setEnquiryOpen(true)}>
                Contact Seller
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>

      <EnquiryForm
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        listingId={property.id}
        brokerId={property.brokerId}
        recipientName={broker?.firmName ?? 'the seller'}
      />
    </Container>
  );
}
