import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from "react-router-dom";

import logo from '../assets/feedy_logo.png'

import Alert from '../components/Alert';

import { getLogin } from '../services/user';

export default function Home() {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        username: '',
        password: ''
    })
    const [alert, setAlert] = useState({
        msg: '',
        type: 0
    })

    useEffect(() => {
        setTimeout(() => {
            document.getElementById('login').classList.remove('opacity-0') 
            document.querySelector('#form-title').classList.remove('scale-0') 
        }, 100)
    })

    const handleInput = (e) => {
        if(e.target.id === 'username') {
            setForm({
                ...form,
                username: e.target.value
            })
        } else if(e.target.id === 'password') {
            setForm({
                ...form,
                password: e.target.value
            })
        }
    }

    const verifLogin = () => {
        async function awaitLogin() {
            const result = await getLogin(form.username, form.password)
            if(!result) {
                console.log('erreur')
            } else {
                setAlert({
                    ...alert,
                    msg: 'Login successful, you are going to be redirected',
                    type: 2
                })
                setTimeout(() => {
                    setAlert({
                        msg: '',
                        type: 0
                    })
                },  3000)
                localStorage.setItem('token', JSON.stringify(result))
                setForm({
                    username: '',
                    password: ''
                })
                setTimeout(() => {
                    window.location.reload(false)
                }, 3000)
            }
        }
        awaitLogin()
    }

  return (
    <div className='w-full h-screen bg-slate-900 flex'>
        
        <div className='w-1/3 h-screen bg-white flex items-center justify-center'>
            <img src={logo} />
        </div>
        <div id="login" className='relative transition-all duration-500 opacity-0 w-2/3 h-screen border-l-2 border-yellow-500 flex flex-col items-center justify-center'>
            <Alert
            type={alert.type} 
            msg={alert.msg}
            />
            <h3 id="form-title" className='transition-all delay-100 duration-500 text-white font-medium scale-0'><span className="text-4xl text-yellow-500">Feedy</span> Your feedback App</h3>
            <div className="mt-4 p-4 w-max bg-slate-800 rounded flex flex-col items-center shadow-xl">
                <p className="text-center text-white text-xs"><span className="font-medium">Feedy</span> is an application to help you getting feedback on your product.</p>
                <p className="text-center text-white text-xs"><span className="font-medium">Feedy</span> is simple and easy. Just try now !</p>
            </div>
            <form className="mt-10 bg-white p-4 w-1/3 rounded flex flex-col space-y-4">
                <div className="relative flex justify-around items-center text-sm">
                    <label htmlFor='username' className="absolute right-4"><i className="fas fa-at text-sm" /></label>
                    <input type="email"
                    onChange={(e) => handleInput(e)}
                    value={form.username}
                    id="username" 
                    placeholder="email"
                    className="w-full transition-all duration-200 border border-zinc-300 focus:border-blue-800 focus:text-blue-700 outline-none p-2"/>
                </div>
                <div className="relative flex justify-around items-center text-sm">
                    <label htmlFor='password' className="absolute right-4"><i className="fas fa-key text-sm" /></label>
                    <input type="password"
                    onChange={(e) => handleInput(e)}
                    value={form.password}
                    id="password" 
                    placeholder="password"
                    className="w-full transition-all duration-200 border border-zinc-300 focus:border-blue-800 focus:text-blue-700 outline-none p-2"/>
                </div>
                <button 
                onClick={(e) => e.preventDefault(verifLogin())}
                className="transition-all duration-200 bg-slate-900 text-white p-3 text-sm hover:bg-emerald-400">Sign in</button>
            </form>
            <p className="mt-6 text-white text-sm font-medium">Not register ? <Link to='/register' className="hover:text-sky-400">Create an account now</Link></p>
        </div>

    </div>
  )
}
