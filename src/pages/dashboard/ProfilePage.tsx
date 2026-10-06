import { useState } from 'react';
import {
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
  Alert,
  Box,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateProfile } from '../../features/auth/authSlice';

export default function ProfilePage() {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const [name, setName] = useState(user?.name ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={700}>
        Profile
      </Typography>
      <Paper sx={{ p: 3, maxWidth: 480 }}>
        {saved && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Profile updated
          </Alert>
        )}
        <Stack spacing={2}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          <TextField label="Email" value={user.email} fullWidth disabled />
          <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth />
          <TextField label="Role" value={user.role} fullWidth disabled sx={{ textTransform: 'capitalize' }} />
          <Button
            variant="contained"
            onClick={() => {
              dispatch(updateProfile({ name, phone }));
              setSaved(true);
            }}
          >
            Save changes
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
