import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import { getProduct } from '../services/product'

export default function ProductDetails(props) {

  const [product, setProduct] = useState([])

  useEffect(() => {

    async function awaitDetailsProduct() {

      const result = await getProduct(props.id)
      if(typeof result === 'string') {
        console.log('erreur')
      } else {
        setProduct(result)
      }

    }

    awaitDetailsProduct()

  }, [])

  console.log(product)

  return (
    <div className="w-full bg-white shadow-lg p-4 rounded flex flex-col">
          <h1 className="p-4 text-slate-800 uppercase font-bold">
            {product.name}
            <Link
              to="/"
              className="transition-all duration-200 text-xs p-2 text-rose-400 hover:text-rose-600"
            >
              {product.User.username}
            </Link>
          </h1>

          <div className="overflow-hidden">
            <img
              src="https://actu.meilleurmobile.com/wp-content/uploads/2019/02/iPad-iPhone-Apple-Watch-iPad-MacBook.jpg"
              className="transition-all duration-200 mt-4 h-24 w-full object-cover hover:scale-125 grayscale hover:grayscale-0"
            />
          </div>

          <p className="mt-2 p-2 text-sm">{product.desc}</p>
        </div>
  );
}
