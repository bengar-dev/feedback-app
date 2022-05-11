import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom'

import { getProduct } from '../services/product'

export default function ProductDetails(props) {

  const dispatch = useDispatch();

  return (
    <div>
      {props.details &&
      <div className="relative w-full bg-white shadow-lg p-4 rounded flex flex-col">
      <Link 
      to='/'
      className="transition-all duration-200 absolute flex justify-center align-center right-4 rounded text-xs bg-purple-200 text-purple-600 hover:text-purple-800 hover:bg-purple-400 p-1 w-10"><i className="fas fa-arrow-left" /></Link>
      <h1 className="p-4 text-slate-800 uppercase font-bold">
      {props.details.name}
      {props.details.User && 
      <Link
      to="/"
      className="transition-all duration-200 text-xs p-2 text-rose-400 hover:text-rose-600"
    >
      {props.details.User.username}
    </Link>
      }
    </h1>

    <div className="overflow-hidden">
      <img
        src="https://actu.meilleurmobile.com/wp-content/uploads/2019/02/iPad-iPhone-Apple-Watch-iPad-MacBook.jpg"
        className="transition-all duration-200 mt-4 h-24 w-full object-cover hover:scale-125 grayscale hover:grayscale-0"
      />
    </div>

    <p className="mt-2 p-2 text-sm">{props.details.desc}</p>
  </div>
      }
    </div>
  );
}
