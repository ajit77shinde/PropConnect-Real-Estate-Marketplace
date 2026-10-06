import { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  Link,
  Chip,
} from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../hooks/redux';
import { authenticate, loginSuccess } from '../../features/auth/authSlice';
import { DEMO_CREDENTIALS } from '../../data/mockData';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname;
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: FormData) => {
    const result = authenticate(data.email, data.password);
    if (!result) {
      setError('Invalid email or password');
      return;
    }
    dispatch(loginSuccess(result));
    const roleHome: Record<string, string> = {
      buyer: '/dashboard',
      broker: '/broker/dashboard',
      builder: '/builder/dashboard',
      admin: '/admin',
    };
    navigate(from || roleHome[result.user.role] || '/');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper sx={{ p: { xs: 3, md: 4 } }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Welcome back
        </Typography>
        <Typography color="text.secondary" textAlign="center" mb={3}>
          Login to manage enquiries, saved properties and listings.
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              fullWidth
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button type="submit" variant="contained" size="large">
              Login
            </Button>
          </Stack>
        </Box>
        <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
          Don&apos;t have an account?{' '}
          <Link component={RouterLink} to="/register">
            Register
          </Link>
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>
            Quick demo login:
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {DEMO_CREDENTIALS.map((c) => (
              <Chip
                key={c.email}
                label={c.role}
                size="small"
                clickable
                onClick={() => {
                  setValue('email', c.email);
                  setValue('password', c.password);
                  setError('');
                }}
              />
            ))}
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
