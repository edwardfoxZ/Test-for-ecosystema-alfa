import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { productApi } from "../services/productApi";

interface ProductFormData {
  title: string;
  price: number;
  description: string;
  image: string;
}

export const AddProduct = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>();

  const onSubmit = async (data: ProductFormData) => {
    try {
      const productData = {
        ...data,
        rating: {
          rate: 0,
          count: 0,
        },
      };

      await productApi.addProduct(productData);

      alert("Product added successfully!");
      reset();
      navigate("/products");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div
      className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 
            flex items-center justify-center"
    >
      <div className="max-w-[500px] mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Add New Product</h1>
          <button
            onClick={() => navigate("/products")}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
          >
            <IoIosArrowBack />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Product Title *
            </label>
            <input
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
              })}
              type="text"
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter product title"
            />
            {errors.title && (
              <p className="mt-1 text-red-300 text-sm">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Price (₽) *
            </label>
            <input
              {...register("price", {
                required: "Price is required",
                min: {
                  value: 1,
                  message: "Price must be at least 1",
                },
                valueAsNumber: true,
              })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="0.00"
            />
            {errors.price && (
              <p className="mt-1 text-red-300 text-sm">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Description *
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
              })}
              rows={3}
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-vertical"
              placeholder="Enter product description"
            />
            {errors.description && (
              <p className="mt-1 text-red-300 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Image URL *
            </label>
            <input
              {...register("image", {
                required: "Image URL is required",
                pattern: {
                  value: /^https?:\/\/.+\..+/,
                  message: "Please enter a valid URL",
                },
              })}
              type="url"
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="https://example.com/image.jpg"
            />
            {errors.image && (
              <p className="mt-1 text-red-300 text-sm">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 font-medium"
          >
            {isSubmitting ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};
