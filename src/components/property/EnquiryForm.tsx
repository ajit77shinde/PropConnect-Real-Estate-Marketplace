import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Stack,
  Typography,
  Box,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addEnquiry } from '../../features/enquiries/enquiriesSlice';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid mobile required').max(10),
  email: z.string().email('Valid email required'),
  scheduleVisit: z.boolean(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onClose: () => void;
  listingId?: string;
  projectId?: string;
  brokerId?: string;
  builderId?: string;
  recipientName: string;
}

export default function EnquiryForm({
  open,
  onClose,
  listingId,
  projectId,
  brokerId,
  builderId,
  recipientName,
}: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name ?? '',
      phone: user?.phone ?? '',
      email: user?.email ?? '',
      scheduleVisit: false,
      message: '',
    },
  });

  const onSubmit = (data: FormData) => {
    dispatch(
      addEnquiry({
        id: `e-${Date.now()}`,
        listingId,
        projectId,
        brokerId,
        builderId,
        buyerId: user?.id,
        name: data.name,
        phone: data.phone,
        email: data.email,
        message: data.message,
        scheduleVisit: data.scheduleVisit,
        status: data.scheduleVisit ? 'site_visit_scheduled' : 'new',
        createdAt: new Date().toISOString().slice(0, 10),
      }),
    );
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      {submitted ? (
        <>
          <DialogContent sx={{ textAlign: 'center', py: 5 }}>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 64, mb: 2 }} />
            <Typography variant="h5" gutterBottom fontWeight={700}>
              Thank you!
            </Typography>
            <Typography color="text.secondary">
              Your enquiry has been sent to <strong>{recipientName}</strong>.
              They will contact you shortly.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
            <Button variant="contained" onClick={handleClose}>
              Done
            </Button>
          </DialogActions>
        </>
      ) : (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Are you interested in this property?</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                label="Name"
                fullWidth
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                label="Mobile Number"
                fullWidth
                {...register('phone')}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
              <TextField
                label="Email"
                fullWidth
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Message (optional)"
                fullWidth
                multiline
                rows={2}
                {...register('message')}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={watch('scheduleVisit')}
                    {...register('scheduleVisit')}
                  />
                }
                label="I want to schedule a site visit"
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Send Enquiry
            </Button>
          </DialogActions>
        </Box>
      )}
    </Dialog>
  );
}
