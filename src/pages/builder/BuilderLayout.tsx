import DashboardIcon from '@mui/icons-material/Dashboard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import InventoryIcon from '@mui/icons-material/Inventory';
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import DashboardLayout from '../../components/layout/DashboardLayout';

const items = [
  { label: 'Dashboard', path: '/builder/dashboard', icon: <DashboardIcon /> },
  { label: 'Projects', path: '/builder/projects', icon: <ApartmentIcon /> },
  { label: 'Add Project', path: '/builder/projects/add', icon: <AddBusinessIcon /> },
  { label: 'Inventory', path: '/builder/inventory', icon: <InventoryIcon /> },
  { label: 'Enquiries', path: '/builder/enquiries', icon: <MailIcon /> },
  { label: 'Profile', path: '/builder/profile', icon: <PersonIcon /> },
];

export default function BuilderLayout() {
  return <DashboardLayout title="Builder" items={items} />;
}
