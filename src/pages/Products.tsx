// import { useEffect, useState } from "react";
// import axios from "axios";
import { Card } from "../components/Card";
import { fakeData } from "../data/fakeData";

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
  // English Users

  // const [products, setProducts] = useState<Product[]>([]);

  // useEffect(() => {
  //   axios
  //     .get("https://fakestoreapi.com/products")
  //     .then((data) => {
  //       console.log(data.data);
  //       setProducts(data.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  return (
    <div
      className="max-w-[2000px] h-[90vh] grid grid-cols-5 gap-5 mx-auto place-items-center bg-[#3d247116] backdrop-blur-lg
          py-32 px-24 rounded-2xl overflow-hidden"
    >
      {fakeData.map((item) => (
        <Card
          key={item.id}
          image={item.image}
          title={item.title}
          description={item.description}
          rating={item.rating.rate}
          price={item.price}
        />
      ))}
    </div>
  );
};
