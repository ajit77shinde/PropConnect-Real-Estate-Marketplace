import { Box, Typography, Button } from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';

interface Props {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: Props) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 8,
        px: 2,
        color: 'text.secondary',
      }}
    >
      <InboxOutlinedIcon sx={{ fontSize: 56, mb: 2, opacity: 0.4 }} />
      <Typography variant="h6" color="text.primary" gutterBottom>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" sx={{ mb: 2, maxWidth: 360, mx: 'auto' }}>
          {description}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Button variant="contained" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}
