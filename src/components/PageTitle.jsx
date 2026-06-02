import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TITLES = {
  "/": "FineTaste Restaurant",
  "/orders": "My Orders ",
  "/login": "Login ",
  "/signup": "Sign Up ",
  "/admin": "Admin Panel ",
  "/tables": "Create Table ",
  "/profile": "Profile ",
  "/contact": "Contact Us ",
  "/location": "Location",
  "/about": "About Us ",
  "/waiter": "Your Attendance Dashboard ",
  "/admin/create-dish": "Create Dish ",
  "/admin/users": "User Management ",
  "/admin/orders": "Order Management ",
  "/admin/tables": "Table Management ",
  "/admin/pending-orders": "Pending orders ",
  "/admin/attendance-dashboard": "Attendance Management ",
  "/admin/date": "Get Orders by Date ",
  "/admin/all-reviews": "Manage Reviews ",
  "/admin/contacts": "Contact Management",
  "/admin/dish-dashboard": "Dish Management ",
};

const PageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = TITLES[location.pathname] || "Restaurant";
  }, [location.pathname]);

  return null;
};

export default PageTitle;
