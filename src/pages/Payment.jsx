import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import API from "../utils/api";

const Payment = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const amount = location.state?.amount;
  const currency = location.state?.currency || "usd";

  const handleStripeCheckout = async () => {
    if (!amount || amount <= 0) {
      toast.error("Advance amount missing, order dobara start karein.");
      navigate(`/orders/${tableId}`, { replace: true });
      return;
    }

    setLoading(true);
    try {
      const { data } = await API.post("/payments/create-checkout-session", {
        amount,
        currency,
        tableId,
      });
      if (!data?.url) {
        throw new Error("Unable to create Stripe checkout URL");
      }
      window.location.assign(data.url);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Payment failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#181C14] p-6">
      <div className="bg-black/40 rounded-2xl p-8 max-w-md w-full border border-[#D4AF37]/30">
        <h1 className="text-2xl font-bold text-[#D4AF37] text-center">
          Advance Payment
        </h1>
        <p className="text-center text-gray-300 mt-3">
          Stripe test checkout se aapka advance receive hoga, uske baad order
          auto confirm ho jayega.
        </p>

        <div className="mt-6 bg-[#1E1E1E] rounded-lg p-4 text-[#D4AF37]">
          <div className="flex justify-between">
            <span>Advance Amount</span>
            <span>{amount ? `$${amount}` : "-"}</span>
          </div>
        </div>

        <button
          onClick={handleStripeCheckout}
          disabled={loading}
          className="w-full mt-6 py-3 rounded-lg cursor-pointer text-black font-semibold bg-[#D4AF37] hover:bg-yellow-500 transition disabled:opacity-60"
        >
          {loading ? "Redirecting..." : "Pay with Stripe"}
        </button>

        <button
          onClick={() => navigate(`/orders/${tableId}`)}
          className="w-full mt-3 py-3 rounded-lg cursor-pointer text-[#D4AF37] border border-[#D4AF37]/50"
        >
          Back to Order
        </button>
      </div>
    </div>
  );
};

export default Payment;
