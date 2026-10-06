import { Typography, Paper, Stack, Chip, Box } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { builders } from '../../data/mockData';
import { statusLabel, statusColor } from '../../utils/format';
import EmptyState from '../../components/common/EmptyState';

export default function BuilderEnquiriesPage() {
  const user = useAppSelector((s) => s.auth.user);
  const builder = builders.find((b) => b.userId === user?.id) ?? builders[0];
  const enquiries = useAppSelector((s) =>
    s.enquiries.items.filter((e) => e.builderId === builder.id),
  );
  const projects = useAppSelector((s) => s.projects.items);

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Enquiries
      </Typography>
      {enquiries.length === 0 ? (
        <EmptyState title="No project enquiries yet" />
      ) : (
        <Stack spacing={1.5}>
          {enquiries.map((e) => {
            const project = projects.find((p) => p.id === e.projectId);
            return (
              <Paper key={e.id} variant="outlined" sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between">
                  <Box>
                    <Typography fontWeight={700}>{e.name}</Typography>
                    <Typography variant="body2">
                      {e.phone} · {project?.name ?? 'Project'}
                    </Typography>
                  </Box>
                  <Chip
                    size="small"
                    label={statusLabel(e.status)}
                    color={statusColor(e.status)}
                  />
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      )}
    </Box>
  );
}
