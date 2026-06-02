import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDishById, useCreateDish, useUpdateDish } from "../hooks/useDishes";

const DishForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
      price: "",
      description: "",
      image: "",
      available: true,
    },
  });

  const { data: dishData } = useDishById(id);

  if (dishData) {
    Object.keys(dishData).forEach((key) => {
      setValue(key, dishData[key]);
    });
  }

  const createDish = useCreateDish();
  const updateDish = useUpdateDish();

  const onSubmit = (formData) => {
    const action = id
      ? updateDish.mutate({ id, updatedDish: formData })
      : createDish.mutate(formData);

    toast.success(id ? "Dish updated successfully!" : "Dish added!");
    setTimeout(() => navigate(-1), 1200);
  };

  return (
    <>
      <div className="min-h-screen bg-[#181C14] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-lg bg-[#1f241b] border border-amber-400/20 rounded-2xl p-8 shadow-2xl"
        >
          <h1 className="text-3xl font-bold text-center text-amber-400 mb-8">
            {id ? "✏️ Update Dish" : "➕ Add Dish"}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {["name", "category", "price", "image"].map((field) => (
              <div key={field}>
                <label className="block text-sm text-amber-400/80 mb-1 capitalize">
                  {field}
                </label>
                <input
                  type={field === "price" ? "number" : "text"}
                  {...register(field, { required: true })}
                  className="w-full bg-transparent border border-amber-400/30 rounded-lg px-4 py-2 text-amber-400 focus:outline-none focus:border-amber-400"
                />
                {errors[field] && (
                  <p className="text-red-400 text-xs mt-1">
                    {field} is required
                  </p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-sm text-amber-400/80 mb-1">
                Description
              </label>
              <textarea
                rows="4"
                {...register("description", { required: true })}
                className="w-full bg-transparent border border-amber-400/30 rounded-lg px-4 py-2 text-amber-400 resize-none focus:outline-none focus:border-amber-400"
              />
              {errors.description && (
                <p className="text-red-400 text-xs mt-1">
                  Description is required
                </p>
              )}
            </div>

            <label className="flex items-center gap-2 text-amber-400 text-sm">
              <input
                type="checkbox"
                {...register("available")}
                className="accent-amber-400 w-4 h-4"
              />
              Available
            </label>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              disabled={createDish.isLoading || updateDish.isLoading}
              className="w-full mt-4 py-3 rounded-lg cursor-pointer bg-amber-400 text-black font-semibold hover:opacity-90 transition"
            >
              {id ? "Update Dish" : "Add Dish"}
            </motion.button>
          </form>
        </motion.div>
      </div>

      <ToastContainer position="top-right" autoClose={2500} />
    </>
  );
};

export default DishForm;
