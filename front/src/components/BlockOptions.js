import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function BlockOptions() {
  const { productArray } = useSelector((state) => ({
    ...state.productReducer,
  }));

  const token = JSON.parse(localStorage.getItem("token"));

  const handleNbrProducts = () => {
    let nbrUserProducts = 0;
    for (const item of productArray) {
      if (item.autorId === token.userId) {
        nbrUserProducts++;
      }
    }
    return nbrUserProducts;
  };

  return (
    <div className="mt-4 relative rounded p-4 bg-white shadow-lg">
      <h2 className="text-sm">
        Feedy<span className="font-bold">board</span>
      </h2>
      <div className="mt-4 flex flex-col space-y-2">
        <div className="flex justify-between text-xs">
          <p>
            <i className="fas fa-flask text-sky-600 w-8"></i> Products shared
          </p>
          <span className="font-bold">{handleNbrProducts()}</span>
        </div>
        <div className="flex justify-between text-xs">
          <p>
            <i className="fas fa-comment text-rose-600 w-8"></i> Feedback shared
          </p>
          <span className="font-bold">0</span>
        </div>
        <button className="transition-all duration-200 text-white hover:text-pink-100 text-sm bg-gradient-to-r from-rose-300 to-pink-600 hover:shadow-lg p-2 font-medium rounded">
          Go to dashboard
        </button>
      </div>
    </div>
  );
}
