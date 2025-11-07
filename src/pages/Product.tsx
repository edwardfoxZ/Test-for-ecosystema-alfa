import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { fakeData } from "../data/fakeData";
import type { Product as ProductType } from "./Products";
import { MdNavigateBefore } from "react-icons/md";

export const Product = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") || "1";

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const foundProduct = fakeData.find(
          (item) => item.id === parseInt(id || "", 10)
        );
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to load product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[90vh] text-white">
        Loading...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col justify-center items-center h-[90vh] text-white">
        <p>{error || "Product not found"}</p>
        <Link
          to={`/products?page=${page}`}
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
        to={`/products?page=${page}`}
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
              className="p-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition 
                duration-300 hover:scale-105 active:scale-95 text-lg"
            >
              <FcLikePlaceholder />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
