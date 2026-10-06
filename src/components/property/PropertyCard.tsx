import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Chip,
  Stack,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useNavigate } from 'react-router-dom';
import type { Listing } from '../../types';
import { formatPrice, formatArea, listingTypeLabel } from '../../utils/format';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleFavourite } from '../../features/favourites/favouritesSlice';
import VerifiedBadge from '../common/VerifiedBadge';

interface Props {
  property: Listing;
}

export default function PropertyCard({ property }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favourites = useAppSelector((s) => s.favourites.ids);
  const liked = favourites.includes(property.id);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 8px 24px rgba(18, 38, 58, 0.1)',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardActionArea onClick={() => navigate(`/properties/${property.id}`)}>
          <CardMedia
            component="img"
            height="180"
            image={property.images[0]}
            alt={property.title}
            sx={{ objectFit: 'cover' }}
          />
        </CardActionArea>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleFavourite(property.id));
          }}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'rgba(255,255,255,0.9)',
            '&:hover': { bgcolor: '#fff' },
          }}
        >
          {liked ? (
            <FavoriteIcon color="error" fontSize="small" />
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}
        </IconButton>
        <Chip
          label={property.transaction === 'rent' ? 'Rent' : 'Sale'}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            bgcolor: 'primary.main',
            color: '#fff',
            fontWeight: 600,
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          {property.bhk ? `${property.bhk} BHK ` : ''}
          {listingTypeLabel(property.listingType)}
        </Typography>
        <Typography variant="h6" color="primary" fontWeight={700}>
          {formatPrice(property.price, property.transaction)}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {formatArea(property.carpetArea)}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1.5 }}>
          <LocationOnOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary" noWrap>
            {property.locality}, {property.city}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mt: 'auto' }}>
          {property.reraVerified && (
            <Chip label="RERA ✓" size="small" variant="outlined" />
          )}
          {property.verified && <VerifiedBadge />}
        </Stack>
      </CardContent>
    </Card>
  );
}
