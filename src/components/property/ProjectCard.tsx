import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Chip,
  Box,
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../../types';
import { formatPrice } from '../../utils/format';
import VerifiedBadge from '../common/VerifiedBadge';
import { builders } from '../../data/mockData';

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const navigate = useNavigate();
  const builder = builders.find((b) => b.id === project.builderId);

  return (
    <Card
      sx={{
        height: '100%',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'translateY(-3px)' },
      }}
    >
      <CardActionArea onClick={() => navigate(`/projects/${project.id}`)}>
        <CardMedia
          component="img"
          height="180"
          image={project.images[0]}
          alt={project.name}
        />
        <CardContent>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            {project.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            By {builder?.companyName ?? 'Builder'}
          </Typography>
          <Typography variant="subtitle1" color="primary" fontWeight={700}>
            {formatPrice(project.priceFrom)} onwards
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0.5} sx={{ my: 1 }}>
            <LocationOnOutlinedIcon sx={{ fontSize: 16 }} color="action" />
            <Typography variant="body2" color="text.secondary">
              {project.locality}, {project.city}
            </Typography>
          </Stack>
          <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
            <Chip
              label={project.bhkOptions.map((b) => `${b} BHK`).join(' & ')}
              size="small"
            />
            {project.verified && <VerifiedBadge label="Verified Builder" />}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
