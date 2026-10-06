import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BottomNav from './BottomNav';

export default function MainLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, pb: { xs: 8, md: 0 } }}>
        <Outlet />
      </Box>
      <Footer />
      <BottomNav />
    </Box>
  );
}
