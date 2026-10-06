import DashboardIcon from '@mui/icons-material/Dashboard';
import MailIcon from '@mui/icons-material/Mail';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import DashboardLayout from '../../components/layout/DashboardLayout';

const items = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { label: 'My Enquiries', path: '/dashboard/enquiries', icon: <MailIcon /> },
  { label: 'Saved Properties', path: '/dashboard/saved', icon: <FavoriteIcon /> },
  { label: 'Site Visits', path: '/dashboard/site-visits', icon: <EventIcon /> },
  { label: 'Profile', path: '/dashboard/profile', icon: <PersonIcon /> },
];

export default function BuyerLayout() {
  return <DashboardLayout title="Buyer" items={items} />;
}
