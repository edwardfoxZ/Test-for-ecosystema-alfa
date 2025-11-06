import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import axios from "axios";

interface Product {
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
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((data) => {
        console.log(data.data);
        setProducts(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div
      className="max-w-[2000px] h-[90vh] mx-auto place-items-center bg-[#3d247116] backdrop-blur-lg py-32
            rounded-2xl"
    >
      {products.map((item) => (
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
