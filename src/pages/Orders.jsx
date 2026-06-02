import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import API from "../utils/api";

const Orders = () => {
  const { tableId: paramTableId } = useParams();
  const navigate = useNavigate();

  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState(paramTableId || "");
  const [orderDate, setOrderDate] = useState("");
  const [orderTime, setOrderTime] = useState("");

  const [dishes, setDishes] = useState([]);
  const [selectedDishes, setSelectedDishes] = useState([]);

  /* ===============================
     🔐 ACCESS CONTROL
  =============================== */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Please login first");
      navigate("/login", { replace: true });
      return;
    }
  }, [navigate]);

  /* ===============================
     🍽️ FETCH TABLES & DISHES
  =============================== */
  useEffect(() => {
    API.get("/tables")
      .then((res) => setTables(res.data.tables || []))
      .catch(() => setTables([]));

    API.get("/dishes")
      .then((res) => setDishes(res.data || []))
      .catch(() => setDishes([]));
  }, []);

  /* ===============================
     ➕ ADD / MANAGE DISHES
  =============================== */
  const addDish = (dish) => {
    const exists = selectedDishes.find((d) => d.dish._id === dish._id);
    if (exists) {
      setSelectedDishes(
        selectedDishes.map((d) =>
          d.dish._id === dish._id ? { ...d, quantity: d.quantity + 1 } : d,
        ),
      );
    } else {
      setSelectedDishes([...selectedDishes, { dish, quantity: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setSelectedDishes(
      selectedDishes.map((d) =>
        d.dish._id === id ? { ...d, quantity: d.quantity + 1 } : d,
      ),
    );
  };

  const decreaseQty = (id) => {
    setSelectedDishes(
      selectedDishes
        .map((d) =>
          d.dish._id === id ? { ...d, quantity: d.quantity - 1 } : d,
        )
        .filter((d) => d.quantity > 0),
    );
  };

  const removeItem = (id) => {
    setSelectedDishes(selectedDishes.filter((d) => d.dish._id !== id));
  };

  /* ===============================
     💰 TOTAL PRICE
  =============================== */
  const totalPrice = selectedDishes.reduce(
    (sum, d) => sum + d.dish.price * d.quantity,
    0,
  );

  const handleCreateOrder = () => {
    if (!tableId) return toast.error("Please select a table");
    if (!orderDate || !orderTime) return toast.error("Select date & time");
    if (!selectedDishes.length) return toast.error("Select at least one dish");

    const selectedDateTime = new Date(
      `${orderDate}T${orderTime}`,
    ).toISOString();

    const orderDraft = {
      tableId,
      dishes: selectedDishes.map((d) => ({
        dish: d.dish._id,
        quantity: d.quantity,
      })),
      totalPrice,
      orderDate: selectedDateTime,
    };

    const advanceAmount = Number((totalPrice * 0.3).toFixed(2));
    localStorage.setItem("pendingOrderDraft", JSON.stringify(orderDraft));
    navigate(`/payment/${tableId}`, {
      state: {
        amount: advanceAmount,
        currency: "usd",
      },
    });
  };

  return (
    <div className="p-6 min-h-screen bg-[#181C14] text-[#D4AF37]">
      <h1 className="text-3xl font-bold text-center mb-6">
        Create Your Order 🍽️
      </h1>

      {/* ================= DATE & TIME ================= */}
      <div className="mb-4 flex gap-4">
        <label>
          Order Date:
          <input
            type="date"
            value={orderDate}
            min={new Date().toISOString().split("T")[0]} // 👈 today se pehle disable
            onChange={(e) => setOrderDate(e.target.value)}
            className="bg-[#1E1E1E] text-[#D4AF37] p-2 rounded"
          />
        </label>

        <label>
          Order Time:{" "}
          <input
            type="time"
            value={orderTime}
            onChange={(e) => setOrderTime(e.target.value)}
            className="bg-[#1E1E1E] text-[#D4AF37] p-2 rounded"
          />
        </label>
      </div>

      {/* ================= DISHES ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {dishes.map((d) => (
          <button
            key={d._id}
            onClick={() => addDish(d)}
            className="border border-[#D4AF37]/40 p-3 rounded-lg hover:bg-[#D4AF37]/10 cursor-pointer"
          >
            <p>{d.name}</p>
            <p className="text-sm text-gray-400">${d.price}</p>
          </button>
        ))}
      </div>

      {/* ================= SELECTED ITEMS ================= */}
      <AnimatePresence>
        {selectedDishes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 border-t border-[#D4AF37]/30 pt-4"
          >
            <h3 className="font-semibold mb-3">🧾 Selected Items</h3>
            {selectedDishes.map((item) => (
              <motion.div
                key={item.dish._id}
                layout
                className="flex justify-between items-center bg-[#181C14] p-3 mb-2 rounded-lg"
              >
                <div>
                  <p>{item.dish.name}</p>
                  <p className="text-sm text-gray-400">${item.dish.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.dish._id)}
                    className="px-2 bg-red-500/20 rounded cursor-pointer"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.dish._id)}
                    className="px-2 bg-green-500/20 rounded cursor-pointer"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.dish._id)}
                    className="ml-2 text-red-400 cursor-pointer"
                  >
                    ❌
                  </button>
                </div>
              </motion.div>
            ))}
            <div className="flex justify-between mt-4 font-bold text-lg">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleCreateOrder}
        className="w-full mt-6 py-2 rounded-lg cursor-pointer text-black font-bold transition flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-amber-400"
      >
        Pay Advance & Place Order
      </button>
    </div>
  );
};

export default Orders;
