import { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  AppBar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';

export interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
}

interface Props {
  title: string;
  items: NavItem[];
}

const DRAWER_WIDTH = 240;

export default function DashboardLayout({ title, items }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="subtitle1" fontWeight={700}>
          {title}
        </Typography>
      </Toolbar>
      <List>
        {items.map((item) => (
          <ListItemButton
            key={item.path}
            selected={location.pathname === item.path}
            onClick={() => {
              navigate(item.path);
              setOpen(false);
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '70vh' }}>
      {isMobile && (
        <AppBar
          position="fixed"
          color="inherit"
          sx={{ top: 64, borderBottom: '1px solid', borderColor: 'divider' }}
          elevation={0}
        >
          <Toolbar variant="dense">
            <IconButton edge="start" onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="subtitle1">{title}</Typography>
          </Toolbar>
        </AppBar>
      )}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? open : true}
        onClose={() => setOpen(false)}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            top: { xs: 0, md: 64 },
            height: { md: 'calc(100% - 64px)' },
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        {drawer}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: { xs: 6, md: 0 },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
