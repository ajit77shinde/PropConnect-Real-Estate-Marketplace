import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import BusinessIcon from '@mui/icons-material/Business';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MailIcon from '@mui/icons-material/Mail';
import DashboardLayout from '../../components/layout/DashboardLayout';

const items = [
  { label: 'Dashboard', path: '/admin', icon: <DashboardIcon /> },
  { label: 'Users', path: '/admin/users', icon: <PeopleIcon /> },
  { label: 'Properties', path: '/admin/properties', icon: <HomeWorkIcon /> },
  { label: 'Brokers', path: '/admin/brokers', icon: <BusinessIcon /> },
  { label: 'Builders', path: '/admin/builders', icon: <ApartmentIcon /> },
  { label: 'Enquiries', path: '/admin/enquiries', icon: <MailIcon /> },
];

export default function AdminLayout() {
  return <DashboardLayout title="Admin" items={items} />;
}
