import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import Dishes from "./pages/Dishes";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DishForm from "./pages/Dishes";
import Orders from "./pages/Orders";
import Tables from "./pages/Tables";
import LocationPage from "./pages/Loaction";
import AboutPage from "./pages/About";
import Online from "./pages/Online";
import AdminDashboard from "./pages/admin/dashboard";
import UsersPage from "./pages/admin/users";
import Profile from "./pages/Profile";
import SignupPage from "./pages/Signup";
import AllOrders from "./pages/admin/AllOrders";
import AllTables from "./pages/admin/AllTables";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import ContactForm from "./pages/ContactForm";
import Waiter from "./pages/Waiter";
import CreateAttendance from "./pages/CreateAttendance";
import Leave from "./pages/Leave";

import { Toaster } from "sonner";
import PendingOrder from "./pages/PendingOrder";
import AttendanceDash from "./pages/admin/AttendanceDash";
import GetByDate from "./pages/admin/GetByDate";
import CreateReview from "./pages/CreateReview";
import GetAllR from "./pages/admin/GetAllR";
import GetAllContact from "./pages/admin/GetAllContact";
import VerifyOtp from "./pages/VerifyOtp";
import PageTitle from "./components/PageTitle";
import DishDash from "./pages/admin/DishDash";
import CreateTable from "./pages/admin/CreateTable"

/* ================= PROTECTED ROUTES ================= */

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== "admin" || user.isAdmin !== true) {
    return <Navigate to="/" replace />;
  }

  return children;
}
function WaiterRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    if (user.role !== "waiter") {
      navigate("/", { replace: true });
      return;
    }

    const blockedPaths = [
      "/admin",
      "/admin/dashboard",
      "/admin/users",
      "/user",
      "/profile",
    ];

    if (blockedPaths.some((path) => location.pathname.startsWith(path))) {
      navigate("/waiter", { replace: true });
    }
  }, [user, location.pathname, navigate]);

  if (!user || user.role !== "waiter") return null;

  return children;
}
/* ================= APP ================= */

function App() {
  return (
    <div className="bg-[#181C14]">
      <AuthProvider>
        <Router>
          <Toaster
            position="top-center"
            richColors
            toastOptions={{
              style: { textAlign: "center" },
            }}
          />
          <PageTitle />
          <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* User Routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/dishes"
              element={
                <PrivateRoute>
                  <DishForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders/:tableId"
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            />
            <Route
              path="/tables"
              element={
                <PrivateRoute>
                  <Tables />
                </PrivateRoute>
              }
            />
            <Route
              path="/reviews/:orderId"
              element={
                <PrivateRoute>
                  <CreateReview />
                </PrivateRoute>
              }
            />
            <Route
              path="/payment/:tableId"
              element={
                <PrivateRoute>
                  <Payment />
                </PrivateRoute>
              }
            />
            <Route
              path="/payment-success/:orderId"
              element={
                <PrivateRoute>
                  <PaymentSuccess />
                </PrivateRoute>
              }
            />
            <Route
              path="/payment-success"
              element={
                <PrivateRoute>
                  <PaymentSuccess />
                </PrivateRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <PrivateRoute>
                  <ContactForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/location"
              element={
                <PrivateRoute>
                  <LocationPage />
                </PrivateRoute>
              }
            />
            <Route path="/verify-otp" element={<VerifyOtp />} />

            <Route
              path="/about"
              element={
                <PrivateRoute>
                  <AboutPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/online"
              element={
                <PrivateRoute>
                  <Online />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PrivateRoute>
                  <SignupPage />
                </PrivateRoute>
              }
            />

            {/* Waiter Only */}
            <Route
              path="/waiter"
              element={
                <WaiterRoute>
                  <Waiter />
                </WaiterRoute>
              }
            />
            <Route
              path="/waiter/attendance"
              element={
                <WaiterRoute>
                  <CreateAttendance />
                </WaiterRoute>
              }
            />
            <Route
              path="/waiter/leave"
              element={
                <WaiterRoute>
                  <Leave />
                </WaiterRoute>
              }
            />

            {/* Admin Only */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/pending-orders"
              element={
                <AdminRoute>
                  <PendingOrder />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/contacts"
              element={
                <AdminRoute>
                  <GetAllContact />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/date"
              element={
                <AdminRoute>
                  <GetByDate />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/attendance-dashboard"
              element={
                <AdminRoute>
                  <AttendanceDash />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/all-reviews"
              element={
                <AdminRoute>
                  <GetAllR />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <UsersPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <AllOrders />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/tables"
              element={
                <AdminRoute>
                  <AllTables />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/create-dish"
              element={
                <AdminRoute>
                  <Dishes />
                </AdminRoute>
              }
            />
             <Route
              path="/admin/create-table"
              element={
                <AdminRoute>
                  <CreateTable />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/dish-dashboard"
              element={
                <AdminRoute>
                  <DishDash />
                </AdminRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
