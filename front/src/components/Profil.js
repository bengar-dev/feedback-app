import React from 'react'
import {Link} from 'react-router-dom'

export default function Profil() {

    const handleLogout = () => {
        localStorage.removeItem('token')
        setTimeout(() => {
            window.location.reload(false)
        }, 500)
    }

  return (
    <div className="relative bg-gradient-to-r rounded p-8 from-violet-500 via-rose-400 to-fuchsia-500 shadow-lg">      
        <h1 className="text-white">Welcome, <Link to='/' className="transition-all font-medium hover:text-yellow-300">pressycw</Link></h1>
        <p className="text-sm font-medium text-white"><span className="font-bold text-yellow-300">Feedy</span> board</p>
        <button 
        onClick={(e) => e.preventDefault(handleLogout())}
        className="transition-all absolute right-4 text-white hover:text-yellow-400"><i className="fas fa-sign-out-alt" /></button>
    </div>
  )
}
