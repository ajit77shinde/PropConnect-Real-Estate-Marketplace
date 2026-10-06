import { useState } from 'react';
import { Box, Container, Typography, Stack, Rating, Button } from '@mui/material';
import Grid from '../../components/common/Grid';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useParams, useNavigate } from 'react-router-dom';
import { brokers } from '../../data/mockData';
import { useAppSelector } from '../../hooks/redux';
import VerifiedBadge from '../../components/common/VerifiedBadge';
import PropertyCard from '../../components/property/PropertyCard';
import EnquiryForm from '../../components/property/EnquiryForm';
import EmptyState from '../../components/common/EmptyState';

export default function BrokerProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const broker = brokers.find((b) => b.id === id);
  const listings = useAppSelector((s) =>
    s.properties.items.filter(
      (l) => l.brokerId === id && l.status === 'active',
    ),
  );
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  if (!broker) {
    return (
      <Container sx={{ py: 4 }}>
        <EmptyState
          title="Broker not found"
          actionLabel="Browse brokers"
          onAction={() => navigate('/brokers')}
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
          background: 'linear-gradient(135deg, #0B3D5C 0%, #1A5F85 100%)',
          color: '#fff',
          mb: 4,
        }}
      >
        <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
          {broker.firmName}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ my: 1 }}>
          <Rating value={broker.rating} precision={0.1} readOnly sx={{ '& .MuiRating-iconFilled': { color: '#F5B041' } }} />
          <Typography>{broker.rating}</Typography>
        </Stack>
        {broker.verified && (
          <Box sx={{ mb: 1, '& .MuiChip-root': { bgcolor: 'rgba(255,255,255,0.15)', color: '#fff', borderColor: 'rgba(255,255,255,0.4)' } }}>
            <VerifiedBadge label="Verified Broker" />
          </Box>
        )}
        <Typography sx={{ opacity: 0.9 }}>
          📍 {broker.locality}, {broker.city}, {broker.state}
        </Typography>
        <Typography sx={{ opacity: 0.9, mt: 0.5 }}>
          {broker.experienceYears}+ Years Experience · {broker.propertyCount} Properties
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<MailOutlineIcon />}
            onClick={() => setEnquiryOpen(true)}
          >
            Contact Broker
          </Button>
          {broker.whatsapp && (
            <Button
              variant="outlined"
              startIcon={<WhatsAppIcon />}
              href={`https://wa.me/${broker.whatsapp}`}
              target="_blank"
              sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }}
            >
              WhatsApp
            </Button>
          )}
        </Stack>
      </Box>

      <Typography variant="h5" gutterBottom>
        About
      </Typography>
      <Typography color="text.secondary" paragraph sx={{ maxWidth: 720 }}>
        {broker.about}
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Active Properties
      </Typography>
      <Grid container spacing={2}>
        {listings.map((p) => (
          <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <PropertyCard property={p} />
          </Grid>
        ))}
      </Grid>

      <EnquiryForm
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        brokerId={broker.id}
        recipientName={broker.firmName}
      />
    </Container>
  );
}
