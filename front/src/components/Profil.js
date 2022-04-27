import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getInfo } from '../services/user'

export default function Profil() {

    const dispatch = useDispatch()

    const {userInfo} = useSelector(state => ({
      ...state.userReducer
    }))

    const handleLogout = () => {
        localStorage.removeItem('token')
        setTimeout(() => {
            window.location.reload(false)
        }, 500)
    }

    useEffect(() => {
      async function getInfoProfil() {
        const result = await getInfo()
        if(typeof result === 'string') {
          console.log(result)
        } else {
          dispatch({
            type: 'GETUSER',
            payload: result
          })
        }
      }
      if(userInfo.length === 0) {
        getInfoProfil()
      }
    })

  return (
    <div className="relative bg-gradient-to-r rounded p-8 from-violet-500 via-rose-400 to-fuchsia-500 shadow-lg">      
        <div className='flex items-center space-x-4'>
        <h1 className="text-white">Welcome, <Link to={'/profil/' + userInfo.id} className="transition-all font-medium hover:text-yellow-300">{userInfo.username}</Link></h1>
        <img src={userInfo.avatar} className="w-12 h-12 object-cover rounded-full border-2 border-yellow-400 shadow-lg"/>
        </div>
        <p className="text-sm font-medium text-white"><span className="font-bold text-yellow-300">Feedy</span> board</p>
        <button 
        onClick={(e) => e.preventDefault(handleLogout())}
        className="transition-all absolute right-4 text-white hover:text-yellow-400"><i className="fas fa-sign-out-alt" /></button>
    </div>
  )
}
