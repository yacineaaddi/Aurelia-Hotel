import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DarkModeProvider from "./context/DarkModeContext";
import GlobalStyles from "./styles/GlobalStyles";
import ProtectedRoute from "./ui/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Settings from "./pages/Settings";
import AppLayout from "./ui/AppLayout";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import Account from "./pages/Account";
import Cabins from "./pages/Cabins";
import Guests from "./pages/Guests";
import Users from "./pages/Users";
import Login from "./pages/Login";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } },
});

export default function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<Checkin />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="guests" element={<Guests />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}
