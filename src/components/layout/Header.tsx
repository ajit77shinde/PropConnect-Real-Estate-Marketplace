import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  useTheme,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../features/auth/authSlice';

const navLinks = [
  { label: 'Buy', to: '/properties?transaction=sell' },
  { label: 'Rent', to: '/properties?transaction=rent' },
  { label: 'Projects', to: '/projects' },
  { label: 'Brokers', to: '/brokers' },
];

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const { user, isAuthenticated } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const dashboardPath = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'broker':
        return '/broker/dashboard';
      case 'builder':
        return '/builder/dashboard';
      case 'admin':
        return '/admin';
      default:
        return '/dashboard';
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setAnchor(null);
    navigate('/');
  };

  return (
    <>
      <AppBar position="sticky" color="inherit" elevation={0}>
        <Toolbar sx={{ gap: 1, py: 0.5 }}>
          {isMobile && (
            <IconButton edge="start" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            component={RouterLink}
            to="/"
            sx={{ textDecoration: 'none', color: 'inherit', mr: 2 }}
          >
            <HomeWorkOutlinedIcon color="primary" />
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Fraunces", Georgia, serif',
                fontWeight: 700,
                color: 'primary.main',
              }}
            >
              PropConnect
            </Typography>
          </Stack>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 0.5, flexGrow: 1 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  component={RouterLink}
                  to={link.to}
                  color="inherit"
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ flexGrow: isMobile ? 1 : 0 }} />

          <IconButton component={RouterLink} to="/dashboard/saved" color="inherit">
            <FavoriteBorderIcon />
          </IconButton>

          {isAuthenticated ? (
            <>
              <Button
                startIcon={<PersonOutlineIcon />}
                onClick={(e) => setAnchor(e.currentTarget)}
                color="inherit"
              >
                {!isMobile && user?.name.split(' ')[0]}
              </Button>
              <Menu
                anchorEl={anchor}
                open={Boolean(anchor)}
                onClose={() => setAnchor(null)}
              >
                <MenuItem
                  onClick={() => {
                    setAnchor(null);
                    navigate(dashboardPath());
                  }}
                >
                  Dashboard
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setAnchor(null);
                    navigate('/dashboard/profile');
                  }}
                >
                  Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Stack direction="row" spacing={1}>
              <Button component={RouterLink} to="/login" color="inherit">
                Login
              </Button>
              {!isMobile && (
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  size="small"
                >
                  Register
                </Button>
              )}
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 260, pt: 2 }}>
          <Typography
            variant="h6"
            sx={{ px: 2, mb: 1, fontFamily: '"Fraunces", Georgia, serif' }}
          >
            PropConnect
          </Typography>
          <List>
            {navLinks.map((link) => (
              <ListItemButton
                key={link.label}
                component={RouterLink}
                to={link.to}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}
            <Divider sx={{ my: 1 }} />
            {isAuthenticated ? (
              <>
                <ListItemButton
                  onClick={() => {
                    setDrawerOpen(false);
                    navigate(dashboardPath());
                  }}
                >
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton
                  onClick={() => {
                    setDrawerOpen(false);
                    handleLogout();
                  }}
                >
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </>
            ) : (
              <>
                <ListItemButton
                  component={RouterLink}
                  to="/login"
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemText primary="Login" />
                </ListItemButton>
                <ListItemButton
                  component={RouterLink}
                  to="/register"
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemText primary="Register" />
                </ListItemButton>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
