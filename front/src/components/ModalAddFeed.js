import React from 'react'


export default function ModalAddFeed(props) {
  return (
    <div className="absolute top-0 left-0 w-full min-h-screen bg-slate-800/50 flex items-center justify-center">
        <button 
        onClick={(e) => e.preventDefault(props.toggle())}
        className="absolute top-2 right-4"><i className='transition-all duration-200 fas fa-times text-6xl hover:text-red-500' /></button>
        <form className="bg-white p-4 w-1/2 text-slate-900 flex flex-col">
            <h1 className="p-2 mb-6 font-medium text-center text-xl">Add a new feedback</h1>
            <label htmlFor="manufacturer" className="text-sm">Manufactur</label>
            <input type="text" className="border w-full p-1" placeholder="Manufactur"/>
        </form>

    </div>
  )
}
