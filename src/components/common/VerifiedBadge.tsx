import { Chip } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';

interface Props {
  label?: string;
  size?: 'small' | 'medium';
}

export default function VerifiedBadge({
  label = 'Verified',
  size = 'small',
}: Props) {
  return (
    <Chip
      icon={<VerifiedIcon />}
      label={label}
      size={size}
      color="success"
      variant="outlined"
      sx={{ fontWeight: 600 }}
    />
  );
}
