import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';

import HomePage from '../pages/home/HomePage';
import PropertiesPage from '../pages/properties/PropertiesPage';
import PropertyDetailsPage from '../pages/property-details/PropertyDetailsPage';
import ProjectsPage from '../pages/projects/ProjectsPage';
import ProjectDetailsPage from '../pages/project-details/ProjectDetailsPage';
import BrokersPage from '../pages/brokers/BrokersPage';
import BrokerProfilePage from '../pages/brokers/BrokerProfilePage';
import BuildersPage from '../pages/builders/BuildersPage';
import BuilderProfilePage from '../pages/builders/BuilderProfilePage';
import LoginPage from '../pages/login/LoginPage';
import RegisterPage from '../pages/register/RegisterPage';

import BuyerLayout from '../pages/dashboard/BuyerLayout';
import BuyerDashboard from '../pages/dashboard/BuyerDashboard';
import EnquiriesPage from '../pages/dashboard/EnquiriesPage';
import SavedPage from '../pages/dashboard/SavedPage';
import SiteVisitsPage from '../pages/dashboard/SiteVisitsPage';
import ProfilePage from '../pages/dashboard/ProfilePage';

import BrokerLayout from '../pages/broker/BrokerLayout';
import BrokerDashboard from '../pages/broker/BrokerDashboard';
import MyPropertiesPage from '../pages/broker/MyPropertiesPage';
import AddPropertyPage from '../pages/broker/AddPropertyPage';
import BrokerEnquiriesPage from '../pages/broker/BrokerEnquiriesPage';
import BrokerCustomersPage from '../pages/broker/BrokerCustomersPage';
import BrokerSiteVisitsPage from '../pages/broker/BrokerSiteVisitsPage';
import BrokerDashProfilePage from '../pages/broker/BrokerProfilePage';

import BuilderLayout from '../pages/builder/BuilderLayout';
import BuilderDashboard from '../pages/builder/BuilderDashboard';
import BuilderProjectsPage from '../pages/builder/BuilderProjectsPage';
import AddProjectPage from '../pages/builder/AddProjectPage';
import BuilderInventoryPage from '../pages/builder/BuilderInventoryPage';
import BuilderEnquiriesPage from '../pages/builder/BuilderEnquiriesPage';
import BuilderDashProfilePage from '../pages/builder/BuilderProfilePage';

import AdminLayout from '../pages/admin/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsersPage from '../pages/admin/AdminUsersPage';
import AdminPropertiesPage from '../pages/admin/AdminPropertiesPage';
import AdminBrokersPage from '../pages/admin/AdminBrokersPage';
import AdminBuildersPage from '../pages/admin/AdminBuildersPage';
import AdminEnquiriesPage from '../pages/admin/AdminEnquiriesPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="properties" element={<PropertiesPage />} />
        <Route path="properties/:id" element={<PropertyDetailsPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:id" element={<ProjectDetailsPage />} />
        <Route path="brokers" element={<BrokersPage />} />
        <Route path="brokers/:id" element={<BrokerProfilePage />} />
        <Route path="builders" element={<BuildersPage />} />
        <Route path="builders/:id" element={<BuilderProfilePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        <Route
          path="dashboard"
          element={
            <ProtectedRoute roles={['buyer', 'broker', 'builder', 'admin']}>
              <BuyerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<BuyerDashboard />} />
          <Route path="enquiries" element={<EnquiriesPage />} />
          <Route path="saved" element={<SavedPage />} />
          <Route path="site-visits" element={<SiteVisitsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route
          path="broker"
          element={
            <ProtectedRoute roles={['broker', 'admin']}>
              <BrokerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<BrokerDashboard />} />
          <Route path="properties" element={<MyPropertiesPage />} />
          <Route path="properties/add" element={<AddPropertyPage />} />
          <Route path="properties/:id/edit" element={<AddPropertyPage />} />
          <Route path="enquiries" element={<BrokerEnquiriesPage />} />
          <Route path="customers" element={<BrokerCustomersPage />} />
          <Route path="site-visits" element={<BrokerSiteVisitsPage />} />
          <Route path="profile" element={<BrokerDashProfilePage />} />
        </Route>

        <Route
          path="builder"
          element={
            <ProtectedRoute roles={['builder', 'admin']}>
              <BuilderLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<BuilderDashboard />} />
          <Route path="projects" element={<BuilderProjectsPage />} />
          <Route path="projects/add" element={<AddProjectPage />} />
          <Route path="inventory" element={<BuilderInventoryPage />} />
          <Route path="enquiries" element={<BuilderEnquiriesPage />} />
          <Route path="profile" element={<BuilderDashProfilePage />} />
        </Route>

        <Route
          path="admin"
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="properties" element={<AdminPropertiesPage />} />
          <Route path="brokers" element={<AdminBrokersPage />} />
          <Route path="builders" element={<AdminBuildersPage />} />
          <Route path="enquiries" element={<AdminEnquiriesPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
