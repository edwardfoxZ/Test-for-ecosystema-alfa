import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { fakeData } from "../data/fakeData";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import { Menu } from "../components/Menu";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { useSetLikes } from "../hooks/setLikes";

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

// We use https://fakestoreapi.com/products for data and put them in fakeData.js

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isToggleHambOn, setToggleHamOn] = useState(false);
  const { setLikes, likes } = useSetLikes();

  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 5;

  useEffect(() => {
    setProducts(fakeData);
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setSearchParams({ page: pageNumber.toString() });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative max-w-[2000px] h-[90vh] grid grid-cols-5 gap-5 mx-auto place-items-center bg-[#3d247116] backdrop-blur-lg
          py-32 px-24 rounded-xl overflow-hidden"
    >
      {/* Nav */}
      <div
        className="absolute top-10 left-10 max-w-[500px]"
        onClick={() => setToggleHamOn((prev) => !prev)}
      >
        <Menu isOn={isToggleHambOn} setLikes={setLikes} />
      </div>

      {/* Cards */}
      {currentItems.map((item) => (
        <main className="relative group">
          <Link
            key={item.id}
            to={`product/${item.id}?page=${currentPage}`}
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
            className="opacity-0 group-hover:opacity-100 absolute bottom-0 left-3 p-2 text-2xl z-30
              transition-opacity duration-300 delay-100 ease-in-out"
          >
            <button onClick={() => setLikes((prev) => !prev)}>
              {likes ? <FcLike /> : <FcLikePlaceholder />}
            </button>
          </div>
        </main>
      ))}

      {/* Pagination Controls */}
      <div className="absolute top-3/4">
        {products.length > 0 && (
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

            {/* Optional: Render page numbers */}
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
        )}
      </div>
    </div>
  );
};
