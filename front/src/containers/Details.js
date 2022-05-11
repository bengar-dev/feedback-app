import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Profil from "../components/Profil";
import TopBoard from "../components/TopBoard";
import Feedy from "../components/Feedy";

import { getProducts, getProduct } from "../services/product";
import BlockOptions from "../components/BlockOptions";
import ProductDetails from "../components/ProductDetails";

export default function Home() {

  const params = useParams()
  const dispatch = useDispatch();

  const [product, setProduct] = useState({})

  useEffect(() => {
    setTimeout(() => {
      document.querySelector("main").classList.remove("opacity-0", "scale-50");
    }, 200);

    async function awaitGetProduct() {
      const result = await getProduct(params.id);
      if (typeof result === "string") {
        console.log(result);
      } else {
        setProduct(result)
      }
    }

    awaitGetProduct()

  }, []);

  return (
    <div className="min-h-screen bg-slate-100 pt-20">
      <main className="transition-all duration-500 delay-200 scale-50 opacity-0 flex space-x-10 ml-auto mr-auto w-8/12">
        <div className="w-1/4">
          <Profil />
          <BlockOptions />
        </div>
        <div className="w-2/3">
          <TopBoard />
          <div className="mt-6 w-full">
            <ProductDetails 
            id={params.id}
            details={product}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
