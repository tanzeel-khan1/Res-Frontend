import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegister } from "../hooks/useAuth"; 

export default function SignupPage() {
  const navigate = useNavigate();

  // ✅ React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // ✅ Register Hook
  const { mutate: registerUser, isLoading } = useRegister();

  // ✅ Submit Handler
  const onSubmit = (formData) => {
    // ✅ Auto role client
    const payload = { ...formData, role: "cleint" };

    registerUser(payload, {
      onSuccess: (data) => {
        toast.success(data.message || "OTP sent to email");

        // ✅ OTP page par redirect
        navigate("/verify-otp", {
          state: { email: formData.email, role: "cleint" },
        });
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || "Signup failed!"
        );
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#181C14] flex items-center justify-center p-4">
      <div className="bg-[#222] rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-amber-400 text-center mb-2">
          Signup
        </h1>
        <p className="text-amber-400 text-center mb-6">
          Create your account
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div>
            <label className="block text-amber-400 font-medium mb-2">
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 bg-[#181C14] border border-amber-400 rounded-lg text-amber-400"
              placeholder="name"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-amber-400 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Sahi email likhein",
                },
              })}
              className="w-full px-4 py-2 bg-[#181C14] border border-amber-400 rounded-lg text-amber-400"
              placeholder="email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-amber-400 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "At least 6 characters",
                },
              })}
              className="w-full px-4 py-2 bg-[#181C14] border border-amber-400 rounded-lg text-amber-400"
              placeholder="password"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-amber-400 cursor-pointer hover:bg-amber-500 text-[#181C14] font-bold py-3 rounded-lg disabled:opacity-50"
          >
            {isLoading ? "Signing up..." : "Signup"}
          </button>
        </form>

        <p className="text-center text-amber-400 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-amber-300 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
