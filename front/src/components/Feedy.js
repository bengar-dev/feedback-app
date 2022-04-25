import React from 'react'
import {Link} from 'react-router-dom'

import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init();

export default function Feedy(props) {
  return (
    <div className="transition-all duration-500 flex mb-4 bg-white h-32 w-full rounded shadow-md p-4 text-cyan-900"  data-aos="fade-up" data-aos-duration='2000'>
        <div className="w-1/6 border-r">
          
        </div>
        <div className="relative w-4/6 p-2 flex flex-col space-y-2">
          <Link to='/' className="transiton-all duration-200 text-sm font-bold text-sky-900 hover:text-sky-500">{props.name}</Link>
          <p className="text-xs text-slate-500">{props.desc}</p>
          <button className="absolute right-2 bottom-2 text-xs font-medium bg-sky-200 w-max p-1 rounded-lg">{props.username}</button>
        </div>
        <button className="transition-all duration-500 w-1/6 flex space-x-2 items-center justify-center hover:scale-125">
            <i className="fas fa-comment text-slate-400" />
            <span className="text-xs text-sky-800 font-bold">2</span>
        </button>
    </div>
  )
}
