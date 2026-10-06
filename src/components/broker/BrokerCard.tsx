import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Stack,
  Rating,
  Box,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import { useNavigate } from 'react-router-dom';
import type { BrokerProfile } from '../../types';
import VerifiedBadge from '../common/VerifiedBadge';

interface Props {
  broker: BrokerProfile;
}

export default function BrokerCard({ broker }: Props) {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea onClick={() => navigate(`/brokers/${broker.id}`)}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                bgcolor: 'primary.main',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BusinessIcon />
            </Box>
            <Box flex={1}>
              <Typography variant="subtitle1" fontWeight={700}>
                {broker.firmName}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Rating value={broker.rating} precision={0.1} size="small" readOnly />
                <Typography variant="caption">{broker.rating}</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {broker.locality}, {broker.city}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {broker.propertyCount} properties · {broker.experienceYears}+ yrs
              </Typography>
              {broker.verified && (
                <Box sx={{ mt: 1 }}>
                  <VerifiedBadge label="Verified Broker" />
                </Box>
              )}
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
