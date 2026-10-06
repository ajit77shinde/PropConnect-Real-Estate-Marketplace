import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AddHomeIcon from '@mui/icons-material/AddHome';
import MailIcon from '@mui/icons-material/Mail';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import DashboardLayout from '../../components/layout/DashboardLayout';

const items = [
  { label: 'Dashboard', path: '/broker/dashboard', icon: <DashboardIcon /> },
  { label: 'My Properties', path: '/broker/properties', icon: <HomeWorkIcon /> },
  { label: 'Add Property', path: '/broker/properties/add', icon: <AddHomeIcon /> },
  { label: 'Enquiries', path: '/broker/enquiries', icon: <MailIcon /> },
  { label: 'Customers', path: '/broker/customers', icon: <PeopleIcon /> },
  { label: 'Site Visits', path: '/broker/site-visits', icon: <EventIcon /> },
  { label: 'Profile', path: '/broker/profile', icon: <PersonIcon /> },
];

export default function BrokerLayout() {
  return <DashboardLayout title="Broker" items={items} />;
}
