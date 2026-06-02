import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedAdmin({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (!raw) {
      navigate("/admin/login");
      return;
    }

    try {
      const auth = JSON.parse(raw);

      if (auth?.role !== "admin") {
        navigate("/admin/login");
        return;
      }
    } catch (err) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return children;
}
