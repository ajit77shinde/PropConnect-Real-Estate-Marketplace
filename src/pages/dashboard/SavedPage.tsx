import { Typography, Box } from '@mui/material';
import Grid from '../../components/common/Grid';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import PropertyCard from '../../components/property/PropertyCard';
import EmptyState from '../../components/common/EmptyState';

export default function SavedPage() {
  const favIds = useAppSelector((s) => s.favourites.ids);
  const listings = useAppSelector((s) =>
    s.properties.items.filter((l) => favIds.includes(l.id)),
  );
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={700}>
        Saved Properties
      </Typography>
      {listings.length === 0 ? (
        <EmptyState
          title="No saved properties"
          description="Tap the heart on any listing to save it here."
          actionLabel="Browse properties"
          onAction={() => navigate('/properties')}
        />
      ) : (
        <Grid container spacing={2}>
          {listings.map((p) => (
            <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <PropertyCard property={p} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
