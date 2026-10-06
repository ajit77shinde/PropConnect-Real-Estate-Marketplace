import { Card, CardContent, Typography, Box } from '@mui/material';
import type { ReactNode } from 'react';

interface Props {
  label: string;
  value: string | number;
  icon?: ReactNode;
  color?: string;
}

export default function StatCard({ label, value, icon, color }: Props) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {label}
            </Typography>
            <Typography variant="h4" fontWeight={700} color={color ?? 'text.primary'}>
              {value}
            </Typography>
          </Box>
          {icon && (
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                bgcolor: 'primary.main',
                color: '#fff',
                display: 'flex',
              }}
            >
              {icon}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
