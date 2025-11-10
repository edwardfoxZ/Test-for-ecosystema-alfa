import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import type { Product as ProductType } from "./Products";
import { MdNavigateBefore } from "react-icons/md";
import { useSetLikes } from "../hooks/setLikes";

export const Product = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLiked, toggleLike } = useSetLikes();

  const productId = Number(id);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:3001/products/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Product not found");
          }
          throw new Error("Failed to load product");
        }

        const productData = await response.json();
        setProduct(productData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    } else {
      setError("No product ID provided");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[90vh] text-white">
        Loading product from server...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col justify-center items-center h-[90vh] text-white">
        <p className="text-xl mb-4">{error || "Product not found"}</p>
        <p className="text-sm mb-4 text-gray-300">
          Make sure your server is running at http://localhost:3001
        </p>
        <Link
          to={`/products${location.search}`}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-300"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[300px] md:max-w-[1200px] mx-auto bg-[#3d247116] backdrop-blur-lg py-12 px-8 rounded-2xl mt-8 mb-8">
      <Link
        to={`/products${location.search}`}
        className="mb-6 inline-block p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-300"
      >
        <MdNavigateBefore />
      </Link>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Image Section */}
        <div className="w-2/3 md:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto max-h-[500px] object-contain rounded-xl shadow-lg"
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <h1 className="md:text-3xl font-bold text-white mb-4">
            {product.title}
          </h1>
          <p className="text-white text-sm md:text-lg mb-6">
            {product.description}
          </p>
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 mr-2 text-sm md:text-lg">★</span>
            <span className="text-white text-xs md:text-sm">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>
          <h2 className="md:text-2xl font-bold text-white mb-6">
            {product.price}₽
          </h2>

          <div className="flex gap-4">
            <button
              className="p-2 md:px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition 
                duration-300 hover:scale-105 active:scale-95 text-sm md:text-base"
            >
              Add to Cart
            </button>
            <button
              onClick={() => toggleLike(productId)}
              className="p-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition 
                duration-300 hover:scale-105 active:scale-95 text-lg"
            >
              {isLiked(productId) ? <FcLike /> : <FcLikePlaceholder />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
