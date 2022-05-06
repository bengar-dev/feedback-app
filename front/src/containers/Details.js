import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Profil from "../components/Profil";
import TopBoard from "../components/TopBoard";
import Feedy from "../components/Feedy";

import { getProducts } from "../services/product";
import BlockOptions from "../components/BlockOptions";
import ProductDetails from "../components/ProductDetails";

export default function Home() {

  const params = useParams()
  const dispatch = useDispatch();

  const { productArray } = useSelector((state) => ({
    ...state.productReducer,
  }));

  useEffect(() => {
    setTimeout(() => {
      document.querySelector("main").classList.remove("opacity-0", "scale-50");
    }, 200);

    async function awaitGetProducts() {
      const result = await getProducts();
      if (typeof result === "string") {
        console.log(result);
      } else {
        dispatch({
          type: "GETPRODUCTS",
          payload: result,
        });
      }
    }

    if (productArray.length <= 0) {
      awaitGetProducts();
    }
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
            />
          </div>
        </div>
      </main>
    </div>
  );
}
