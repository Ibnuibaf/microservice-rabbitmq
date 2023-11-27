"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./(common)/Navbar";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get("/api/products/getproducts");
    setProducts(res.data.products);
  };

  const handleBook = async (id) => {
    console.log(token)
    axios.post("/api/orders/book", { productId: id, token:token }).then(() => {
      fetchProducts();
    });
    return;
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken); 
    
    fetchProducts();
  }, []);
  return (
    <>
      <Navbar />

      <div className="grid grid-cols-3 grid-rows-2 mt-20">
        {products?.map((product, index) => (
          <div
            key={index}
            className="bg-gray-700 m-3 p-3 flex justify-between rounded-md"
          >
            <h6>{product.name}</h6>
            {product.booked ? (
              <button className="bg-red-800 text-black px-3 py-1 rounded-3xl hover:bg-red-600 border-none">
                Booked
              </button>
            ) : (
              <button
                onClick={() => handleBook(product._id)}
                className="bg-gray-300 text-black px-3 py-1 rounded-3xl hover:bg-gray-600 border-none"
              >
                Order Now
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
