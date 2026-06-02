import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyOtp } from "../hooks/useAuth";
import { useState } from "react";

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const { mutate: verifyOtp, isLoading } = useVerifyOtp();

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyOtp(
      { email, otp },
      {
        onSuccess: () => {
          alert("Verified! Now you can login");
          navigate("/login");
        },
        onError: (err) => {
          alert(err.response?.data?.message || "OTP verification failed");
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center mb-2">Verify OTP</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          We have sent a 6-digit OTP to <br />
          <span className="font-medium">{email}</span>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            maxLength={6}
            className="w-full text-center tracking-widest text-lg border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer bg-amber-400 hover:bg-amber-500 transition px-4 py-3 rounded-lg font-medium disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
