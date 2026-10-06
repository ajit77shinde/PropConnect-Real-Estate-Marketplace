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
  MenuItem,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../hooks/redux';
import { loginSuccess, registerUser } from '../../features/auth/authSlice';
import type { UserRole } from '../../types';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10).max(10),
  password: z.string().min(6),
  role: z.enum(['buyer', 'broker', 'builder']),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      role: 'buyer',
    },
  });

  const onSubmit = (data: FormData) => {
    try {
      const result = registerUser({
        ...data,
        role: data.role as UserRole,
      });
      dispatch(loginSuccess(result));
      const roleHome: Record<string, string> = {
        buyer: '/dashboard',
        broker: '/broker/dashboard',
        builder: '/builder/dashboard',
      };
      navigate(roleHome[data.role] || '/');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Registration failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper sx={{ p: { xs: 3, md: 4 } }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Create account
        </Typography>
        <Typography color="text.secondary" textAlign="center" mb={3}>
          Join as a buyer, broker or builder.
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              label="Full Name"
              fullWidth
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              label="Email"
              fullWidth
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Mobile"
              fullWidth
              {...register('phone')}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              select
              label="I am a"
              fullWidth
              defaultValue="buyer"
              {...register('role')}
            >
              <MenuItem value="buyer">Buyer</MenuItem>
              <MenuItem value="broker">Broker</MenuItem>
              <MenuItem value="builder">Builder</MenuItem>
            </TextField>
            <Button type="submit" variant="contained" size="large">
              Register
            </Button>
          </Stack>
        </Box>
        <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link component={RouterLink} to="/login">
            Login
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
