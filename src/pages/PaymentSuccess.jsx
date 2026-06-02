import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import API from "../utils/api";

const PaymentSuccess = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const flowHandledRef = useRef(false);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentMeta, setPaymentMeta] = useState({ paidAmount: null, currency: "usd" });

  useEffect(() => {
    const runSuccessFlow = async () => {
      if (flowHandledRef.current) return;
      flowHandledRef.current = true;

      const params = new URLSearchParams(location.search);
      const sessionId = params.get("session_id");

      try {
        if (orderId) {
          const { data } = await API.get(`/orders/by-id/${orderId}`);
          setOrder(data);
          return;
        }

        if (!sessionId) {
          setError("Order/session not found");
          return;
        }

        const { data: verifyData } = await API.get(
          `/payments/verify-session/${sessionId}`,
        );

        if (!verifyData?.isPaid) {
          setError("Payment is not confirmed yet");
          return;
        }

        const alreadyProcessed = localStorage.getItem(
          `stripe_order_done_${sessionId}`,
        );
        const storedOrderId = localStorage.getItem(
          `stripe_order_id_${sessionId}`,
        );

        if (alreadyProcessed === "1" && storedOrderId) {
          const { data } = await API.get(`/orders/by-id/${storedOrderId}`);
          setOrder(data);
          setPaymentMeta({
            paidAmount: verifyData.amountTotal ? verifyData.amountTotal / 100 : null,
            currency: verifyData.currency || "usd",
          });
          return;
        }

        const draftOrderRaw = localStorage.getItem("pendingOrderDraft");
        if (!draftOrderRaw) {
          setError("Order draft not found");
          return;
        }

        const draftOrder = JSON.parse(draftOrderRaw);
        const { data: orderRes } = await API.post("/orders", draftOrder);
        const createdOrderId = orderRes?.order?._id;
        if (!createdOrderId) {
          setError("Order created but ID not returned");
          return;
        }

        const { data: populatedOrder } = await API.get(
          `/orders/by-id/${createdOrderId}`,
        );

        localStorage.removeItem("pendingOrderDraft");
        localStorage.setItem(`stripe_order_done_${sessionId}`, "1");
        localStorage.setItem(`stripe_order_id_${sessionId}`, createdOrderId);

        setOrder(populatedOrder);
        setPaymentMeta({
          paidAmount: verifyData.amountTotal ? verifyData.amountTotal / 100 : null,
          currency: verifyData.currency || "usd",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load order summary");
      } finally {
        setLoading(false);
      }
    };

    runSuccessFlow();
  }, [orderId, location.search]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#181C14] text-[#D4AF37] flex items-center justify-center">
        Loading order summary...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#181C14] text-[#D4AF37] flex flex-col items-center justify-center gap-4 px-4">
        <p>{error}</p>
        <button
          onClick={() => navigate("/")}
          className="bg-[#D4AF37] text-black px-4 py-2 rounded-lg font-semibold cursor-pointer"
        >
          Go Home
        </button>
      </div>
    );
  }

  const dishesTotal =
    order?.dishes?.reduce(
      (sum, item) => sum + (item.dish?.price || 0) * (item.quantity || 0),
      0,
    ) || 0;
  const tablePrice = order?.tableId?.price || 0;
  const grandTotal = dishesTotal + tablePrice;
  const paidAmount = paymentMeta.paidAmount ?? location.state?.paidAmount;
  const currency = (paymentMeta.currency || location.state?.currency || "usd").toUpperCase();

  return (
    <div className="min-h-screen bg-[#181C14] text-[#D4AF37] px-4 py-10">
      <div className="max-w-2xl mx-auto bg-black/40 border border-[#D4AF37]/30 rounded-2xl p-6 space-y-5">
        <h1 className="text-3xl font-bold text-center">Payment Successful</h1>
        <p className="text-center text-gray-300">
          Aapka order confirm ho gaya hai. Neeche order summary di hui hai.
        </p>

        <div className="bg-[#1E1E1E] rounded-lg p-4 space-y-2">
          <p>
            <span className="text-gray-300">Order ID:</span> {order?._id}
          </p>
          <p>
            <span className="text-gray-300">Status:</span> {order?.status}
          </p>
          <p>
            <span className="text-gray-300">Order Date:</span>{" "}
            {order?.orderDate ? new Date(order.orderDate).toLocaleString() : "-"}
          </p>
          {paidAmount ? (
            <p>
              <span className="text-gray-300">Advance Paid:</span> {currency}{" "}
              {paidAmount}
            </p>
          ) : null}
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Items</h2>
          {order?.dishes?.map((item) => (
            <div
              key={`${item.dish?._id}-${item.quantity}`}
              className="flex justify-between bg-[#1E1E1E] p-3 rounded-lg"
            >
              <span>
                {item.dish?.name || "Dish"} x {item.quantity}
              </span>
              <span>${(item.dish?.price || 0) * (item.quantity || 0)}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-[#D4AF37]/30 pt-4 space-y-1 text-right">
          <p>Dishes Total: ${dishesTotal}</p>
          <p>Table Charges: ${tablePrice}</p>
          <p className="font-bold text-lg">Grand Total: ${grandTotal}</p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/"
            className="flex-1 text-center bg-[#D4AF37] text-black py-2 rounded-lg font-semibold"
          >
            Go Home
          </Link>
          <Link
            to="/tables"
            className="flex-1 text-center border border-[#D4AF37]/50 py-2 rounded-lg font-semibold"
          >
            Book Another Table
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
