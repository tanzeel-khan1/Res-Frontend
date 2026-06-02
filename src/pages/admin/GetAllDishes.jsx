import React, { useState } from "react";
import { useDishes, useUpdateDish, useDeleteDish } from "../../hooks/useDishes";
import Loading from "../../components/Loading";

const GetAllDishes = () => {
  const { data: dishes, isLoading } = useDishes();
  const { mutate: updateDish } = useUpdateDish();
  const { mutate: deleteDish } = useDeleteDish();

  const [editDish, setEditDish] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#181C14] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181C14] p-4 md:p-8">
      <h2 className="text-3xl font-bold text-amber-400 mb-8">🍽️ Dishes</h2>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dishes?.map((dish) => (
          <div
            key={dish._id}
            className="bg-[#1f241b] border border-amber-400/20 rounded-xl p-5 hover:border-amber-400 transition"
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-lg font-semibold text-amber-400">
                {dish.name}
              </h4>
              <span
                className={`text-xs px-2 py-1 rounded-full border ${
                  dish.available
                    ? "border-green-500 text-green-400"
                    : "border-red-500 text-red-400"
                }`}
              >
                {dish.available ? "Available" : "Unavailable"}
              </span>
            </div>

            <p className="text-amber-400/80 mb-1">💰 ${dish.price}</p>
            <p className="text-amber-400/60 text-sm mb-4">🍴 {dish.category}</p>

            <div className="flex gap-2">
              <button
                onClick={() => setEditDish(dish)}
                className="flex-1 cursor-pointer border border-amber-400 text-amber-400 rounded-lg py-1 hover:bg-amber-400 hover:text-black transition text-sm"
              >
                Update
              </button>

              <button
                onClick={() => setConfirmDelete(dish)}
                className="flex-1 cursor-pointer border border-red-500 text-red-400 rounded-lg py-1 hover:bg-red-500 hover:text-black transition text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* UPDATE MODAL */}
      {editDish && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1f241b] border border-amber-400/30 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl text-amber-400 font-semibold mb-4">
              Update Dish
            </h3>

            <input
              className="w-full mb-3 bg-transparent border border-amber-400/30 rounded px-3 py-2 text-amber-400"
              value={editDish.name}
              onChange={(e) =>
                setEditDish({ ...editDish, name: e.target.value })
              }
            />

            <input
              type="number"
              className="w-full mb-3 bg-transparent border border-amber-400/30 rounded px-3 py-2 text-amber-400"
              value={editDish.price}
              onChange={(e) =>
                setEditDish({ ...editDish, price: e.target.value })
              }
            />

            <select
              className="w-full mb-3 bg-[#1f241b] border border-amber-400/30 rounded px-3 py-2 text-amber-400"
              value={editDish.category}
              onChange={(e) =>
                setEditDish({ ...editDish, category: e.target.value })
              }
            >
              <option>Dinner/Lunch</option>
              <option>Breakfast</option>
            </select>

            <label className="flex items-center gap-2 text-amber-400 text-sm mb-4">
              <input
                type="checkbox"
                checked={editDish.available}
                onChange={(e) =>
                  setEditDish({ ...editDish, available: e.target.checked })
                }
              />
              Available
            </label>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  updateDish({
                    id: editDish._id,
                    updatedDish: {
                      name: editDish.name,
                      price: editDish.price,
                      category: editDish.category,
                      available: editDish.available,
                    },
                  });
                  setEditDish(null);
                }}
                className="flex-1 bg-amber-400 text-black rounded-lg py-2 hover:opacity-90"
              >
                Save
              </button>

              <button
                onClick={() => setEditDish(null)}
                className="flex-1 border border-amber-400 text-amber-400 rounded-lg py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1f241b] border border-red-500/30 rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-lg text-red-400 font-semibold mb-4">
              Delete Dish?
            </h3>

            <p className="text-amber-400/80 mb-6 text-sm">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{confirmDelete.name}</span>?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  deleteDish(confirmDelete._id);
                  setConfirmDelete(null);
                }}
                className="flex-1 cursor-pointer bg-red-500 text-black rounded-lg py-2"
              >
                Delete
              </button>

              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 cursor-pointer border border-amber-400 text-amber-400 rounded-lg py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAllDishes;
