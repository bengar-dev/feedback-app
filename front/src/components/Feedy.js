import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getLikes } from "../services/product";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

export default function Feedy(props) {
  const token = JSON.parse(localStorage.getItem("token"));

  const dispatch = useDispatch();

  const { productArray } = useSelector((state) => ({
    ...state.productReducer,
  }));

  const likes = JSON.parse(props.like);
  const findUser = likes.findIndex((p) => p === token.userId);

  const handleLikes = (id) => {
    async function awaitLikes() {
      const result = await getLikes(id);
      if (typeof result === "string") {
        console.log(result);
      } else {
        const obj = {
          id,
          userId: token.userId,
        };
        dispatch({
          type: "LIKE",
          payload: obj,
        });
      }
    }
    awaitLikes();
  };

  return (
    <div
      className="transition-all duration-500 flex mb-4 bg-white hover:bg-slate-50 h-32 w-full rounded shadow-lg p-4 text-cyan-900"
      data-aos="fade-up"
      data-aos-duration="2000"
    >
      <div className="w-1/6 border-r flex flex-col items-center justify-center">
        {findUser === -1 ? (
          <button
            onClick={(e) => e.preventDefault(handleLikes(props.id))}
            className="transition-all duration-200 shadow-none bg-slate-300 hover:bg-emerald-400 hover:text-white text-sky-900 w-12 h-12 rounded flex flex-col justify-center items-center text-sm font-medium"
          >
            <i className="fas fa-angle-up mb-1" />
            <span className="font-bold">{likes.length}</span>
          </button>
        ) : (
          <button
            onClick={(e) => e.preventDefault(handleLikes(props.id))}
            className="transition-all duration-200 shadow-none bg-emerald-300 hover:bg-slate-400 hover:text-white text-sky-900 w-12 h-12 rounded flex flex-col justify-center items-center text-sm font-medium"
          >
            <i className="fas fa-angle-up mb-1" />
            <span className="font-bold">{likes.length}</span>
          </button>
        )}
      </div>
      <div className="relative w-4/6 p-2 flex flex-col space-y-2">
        <Link
          to="/"
          className="transiton-all duration-200 text-sm font-bold text-sky-900 hover:text-sky-500"
        >
          {props.name}
        </Link>
        <p className="text-xs text-slate-500">{props.desc}</p>
        <button className="absolute right-2 bottom-2 text-xs font-medium bg-sky-200 w-max p-1 rounded-lg">
          {props.username}
        </button>
      </div>
      <button className="transition-all duration-500 w-1/6 flex space-x-2 items-center justify-center hover:scale-125">
        <i className="fas fa-comment text-slate-400" />
        <span className="text-xs text-sky-800 font-bold">2</span>
      </button>
    </div>
  );
}
