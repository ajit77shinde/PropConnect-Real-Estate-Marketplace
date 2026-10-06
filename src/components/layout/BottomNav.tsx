import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';

export default function BottomNav() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();

  if (!isMobile) return null;

  const path = location.pathname;
  let value = 0;
  if (path.startsWith('/properties') || path.startsWith('/projects')) value = 1;
  else if (path.startsWith('/dashboard/saved')) value = 2;
  else if (path.startsWith('/dashboard/enquiries')) value = 3;
  else if (path.startsWith('/dashboard') || path.startsWith('/login')) value = 4;

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1100 }}
      elevation={8}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, v) => {
          const routes = [
            '/',
            '/properties',
            '/dashboard/saved',
            '/dashboard/enquiries',
            '/dashboard',
          ];
          navigate(routes[v]);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
        <BottomNavigationAction label="Saved" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Enquiries" icon={<MailOutlineIcon />} />
        <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
