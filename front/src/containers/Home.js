import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Profil from "../components/Profil";
import TopBoard from "../components/TopBoard";
import Feedy from "../components/Feedy";

import { getProducts } from "../services/product";
import BlockOptions from "../components/BlockOptions";

export default function Home() {
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
            {productArray.length > 0 ? (
              productArray.map((item) => (
                <Feedy
                  key={item.productId}
                  id={item.productId}
                  like={item.like}
                  username={item.User.username}
                  name={item.name}
                  desc={item.desc}
                />
              ))
            ) : (
              <div className="transition-all duration-500 flex justify-center mb-4 bg-white h-max w-full rounded p-4 text-cyan-900">
                <p className="font-medium text-sm">There is no products...</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
