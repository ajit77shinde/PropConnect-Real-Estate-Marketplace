import { Container, Typography } from '@mui/material';
import Grid from '../../components/common/Grid';
import { brokers } from '../../data/mockData';
import BrokerCard from '../../components/broker/BrokerCard';

export default function BrokersPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Verified Brokers
      </Typography>
      <Typography color="text.secondary" mb={3}>
        Connect with trusted real-estate professionals in your area.
      </Typography>
      <Grid container spacing={2}>
        {brokers.map((b) => (
          <Grid key={b.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <BrokerCard broker={b} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
