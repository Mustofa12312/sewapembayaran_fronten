import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import NotFound from './pages/NotFound';

// Public Pages
import Home from './pages/Public/Home';
import ProductDetail from './pages/Public/ProductDetail';
import Checkout from './pages/Public/Checkout';
import OrderResult from './pages/Public/OrderResult';
import CustomerLogin from './pages/Public/CustomerLogin';
import CustomerRegister from './pages/Public/CustomerRegister';
import CustomerDashboard from './pages/Public/CustomerDashboard';

// Admin Pages (lazy-loaded so public users don't download admin bundle)
const AdminLogin = lazy(() => import('./pages/Admin/Login'));
const Dashboard = lazy(() => import('./pages/Admin/Dashboard'));
const AdminProducts = lazy(() => import('./pages/Admin/AdminProducts'));
const AdminPackages = lazy(() => import('./pages/Admin/AdminPackages'));
const AdminLicenses = lazy(() => import('./pages/Admin/AdminLicenses'));
const AdminOrders = lazy(() => import('./pages/Admin/AdminOrders'));
const AdminCustomers = lazy(() => import('./pages/Admin/AdminCustomers'));
const AdminAuditLogs = lazy(() => import('./pages/Admin/AdminAuditLogs'));
const AdminStaff = lazy(() => import('./pages/Admin/AdminStaff'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="product/:slug" element={<ProductDetail />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order/:token" element={<OrderResult />} />
            <Route path="login" element={<CustomerLogin />} />
            <Route path="register" element={<CustomerRegister />} />
            {/* Protected Customer Route */}
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Admin Login (public) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="packages" element={<AdminPackages />} />
            <Route path="licenses" element={<AdminLicenses />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="audit-logs" element={<AdminAuditLogs />} />
            <Route path="staff" element={<AdminStaff />} />
          </Route>

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
