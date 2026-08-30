import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Public/Home';
import ProductDetail from './pages/Public/ProductDetail';
import Checkout from './pages/Public/Checkout';
import OrderResult from './pages/Public/OrderResult';
import CustomerLogin from './pages/Public/CustomerLogin';
import CustomerRegister from './pages/Public/CustomerRegister';
import CustomerDashboard from './pages/Public/CustomerDashboard';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminStaff from './pages/Admin/AdminStaff';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="product/:slug" element={<ProductDetail />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order/:token" element={<OrderResult />} />
          <Route path="login" element={<CustomerLogin />} />
          <Route path="register" element={<CustomerRegister />} />
          <Route path="dashboard" element={<CustomerDashboard />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="login" element={<AdminLogin />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="staff" element={<AdminStaff />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
