import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

interface Props {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

export default function ConfirmationDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  onConfirm,
  onCancel,
  danger,
}: Props) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          variant="contained"
          color={danger ? 'error' : 'primary'}
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
