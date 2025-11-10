import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import {
  MdNavigateNext,
  MdNavigateBefore,
  MdKeyboardArrowDown,
  MdRemoveCircle,
} from "react-icons/md";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { Menu } from "../components/Menu";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { useSetLikes } from "../hooks/setLikes";
import { CgAdd } from "react-icons/cg";
import { productApi } from "../services/productApi";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category?: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const Products = () => {
  const { isLiked, toggleLike, likesList } = useSetLikes();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [isToggleHambOn, setToggleHamOn] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 5;
  const showFavorites = searchParams.get("favorites") === "true";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productApi.getProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError("Failed to load products from server");
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const setShowFavorites = (value: boolean | ((prev: boolean) => boolean)) => {
    let newValue: boolean;
    if (typeof value === "function") {
      newValue = value(showFavorites);
    } else {
      newValue = value;
    }

    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (newValue) {
      params.set("favorites", "true");
    } else {
      params.delete("favorites");
    }
    setSearchParams(params);
  };

  const filteredProducts = showFavorites
    ? products.filter((product) => likesList.includes(product.id))
    : products;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Mobile pagination - show first 5 items immediately, then load more on click
  const [mobileVisibleCount, setMobileVisibleCount] = useState(itemsPerPage);
  const mobileItems = filteredProducts.slice(0, mobileVisibleCount);
  const hasMoreMobileItems = mobileVisibleCount < filteredProducts.length;

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    let changed = false;

    if (currentPage > totalPages && totalPages > 0) {
      params.set("page", totalPages.toString());
      changed = true;
    } else if (currentPage < 1) {
      params.set("page", "1");
      changed = true;
    }

    if (changed) {
      setSearchParams(params);
    }
  }, [currentPage, totalPages, searchParams, setSearchParams]);

  // Reset mobile visible count when filter changes
  useEffect(() => {
    setMobileVisibleCount(itemsPerPage);
  }, [showFavorites, itemsPerPage]);

  // Mobile Pagination - Load more
  const handleLoadMore = () => {
    setMobileVisibleCount((prev) =>
      Math.min(prev + itemsPerPage, filteredProducts.length)
    );
  };

  // Desktop Pagination
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setSearchParams((prev) => {
        prev.set("page", pageNumber.toString());
        return prev;
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Determine which items to render based on screen size
  const isMobile = window.innerWidth < 768;
  const itemsToRender = isMobile ? mobileItems : currentItems;

  const removeProduct = async (id: number) => {
    try {
      await productApi.deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="relative max-w-[1750px] md:h-[90vh] grid grid-cols-1 md:grid-cols-5 gap-5 mx-auto place-items-center bg-[#3d247116] backdrop-blur-lg py-32 px-24 rounded-xl md:overflow-hidden">
        <div className="col-span-full flex items-center justify-center text-white text-xl">
          Loading products from server...
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="relative max-w-[1750px] md:h-[90vh] grid grid-cols-1 md:grid-cols-5 gap-5 mx-auto place-items-center bg-[#3d247116] backdrop-blur-lg py-32 px-24 rounded-xl md:overflow-hidden">
        <div className="col-span-full flex flex-col items-center justify-center text-white text-xl text-center">
          <div>{error}</div>
          <div className="text-sm mt-2">
            Make sure your server is running at http://localhost:3001
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative max-w-[1750px] md:h-[90vh] grid grid-cols-1 md:grid-cols-5 gap-5 mx-auto place-items-center bg-[#3d247116] backdrop-blur-lg
          py-32 px-24 rounded-xl md:overflow-hidden"
    >
      {/* Nav */}
      <div className="fixed md:absolute top-10 left-10 max-w-[500px] z-30">
        <Menu
          setIsOn={setToggleHamOn}
          isOn={isToggleHambOn}
          setLiked={setShowFavorites}
          liked={showFavorites}
          likedList={likesList}
        />
      </div>

      <Link
        to="/create-product"
        className="absolute top-[50px] right-10 md:top-16 md:right-20 text-purple-300 md:text-xl"
      >
        <CgAdd size={25} />
      </Link>

      {/* Cards or No Favorites Message */}
      {showFavorites && filteredProducts.length === 0 ? (
        <div className="col-span-full flex items-center justify-center text-center text-white py-10 text-xl min-h-[50vh]">
          No favorites yet. Start liking some products!
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="col-span-full flex items-center justify-center text-center text-white py-10 text-xl min-h-[50vh]">
          No products found.
        </div>
      ) : (
        itemsToRender.map((item) => (
          <main className="relative group" key={item.id}>
            <Link
              to={`product/${item.id}${location.search}`}
              className="group relative"
            >
              <Card
                image={item.image}
                title={item.title}
                description={item.description}
                rating={item.rating.rate}
                price={item.price}
              />
            </Link>
            <div
              className="absolute bottom-0 left-3 p-2 text-2xl z-30 opacity-100 md:opacity-0 md:group-hover:opacity-100
              transition-opacity duration-300 delay-100 space-x-3 ease-in-out"
            >
              <button onClick={() => toggleLike(item.id)}>
                {isLiked(item.id) ? <FcLike /> : <FcLikePlaceholder />}
              </button>

              <button
                className="text-red-600"
                onClick={() => removeProduct(item.id)}
              >
                <MdRemoveCircle />
              </button>
            </div>
          </main>
        ))
      )}

      {/* Mobile Load More Button */}
      {isMobile && hasMoreMobileItems && (
        <div className="md:hidden flex justify-center mt-8 col-span-full">
          <button
            onClick={handleLoadMore}
            className="flex items-center p-2 bg-purple-600 text-white rounded-full
                     transition duration-300 ease-in-out hover:scale-105 hover:bg-purple-700 hover:shadow-lg
                     active:scale-95"
          >
            <MdKeyboardArrowDown size={22} />
          </button>
        </div>
      )}

      {/* Desktop Pagination Controls */}
      {!isMobile && filteredProducts.length > 0 && (
        <div className="hidden md:block absolute top-3/4">
          <div className="flex justify-center items-center mx-auto mt-8 gap-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-3 bg-purple-600 text-white rounded-full disabled:opacity-50 
                       transition duration-300 ease-in-out hover:scale-105 hover:bg-purple-700 hover:shadow-lg 
                       active:scale-95 disabled:cursor-not-allowed"
            >
              <MdNavigateBefore />
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 ${
                  currentPage === index + 1
                    ? "bg-purple-800 opacity-50"
                    : "bg-purple-600"
                } text-white rounded-full
                         transition duration-300 ease-in-out hover:scale-105 hover:bg-purple-700 hover:shadow-lg 
                         active:scale-95`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-3 bg-purple-600 text-white rounded-full disabled:opacity-50 
                       transition duration-300 ease-in-out hover:scale-105 hover:bg-purple-700 hover:shadow-lg 
                       active:scale-95 disabled:cursor-not-allowed"
            >
              <MdNavigateNext />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
