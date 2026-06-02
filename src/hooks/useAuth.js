import { useMutation } from "@tanstack/react-query";
import API from "../utils/api";

/* =======================
   ✅ REGISTER (Send OTP)
======================= */
export const useRegister = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await API.post("/auth/register", formData);
      return data; // { message, userId }
    },
  });
};

/* =======================
   🔐 VERIFY OTP
======================= */
export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async ({ email, otp }) => {
      const { data } = await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      // token save
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      return data;
    },
  });
};

/* =======================
   🔁 RESEND OTP
======================= */
export const useResendOtp = () => {
  return useMutation({
    mutationFn: async (email) => {
      const { data } = await API.post("/auth/resend-otp", { email });
      return data;
    },
  });
};

/* =======================
   🔓 LOGIN (Verified only)
======================= */
export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      return data;
    },
  });
};

/* =======================
   🚪 LOGOUT
======================= */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
