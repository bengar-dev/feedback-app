import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";

import logo from '../assets/feedy_logo.png'

import { getRegister } from '../services/user';
import { validUsername, validEmail, validPassword } from '../functions/regex';
import Alert from '../components/Alert';

export default function Home() {

    const navigate = useNavigate()

    const [form, setForm] = useState({ // STATE GESTION DES INPUTS FORM
        username: '',
        email: '',
        password: '',
        rules: 'checked'
    })
    const [alert, setAlert] = useState({
        msg: '',
        type: 0
    })

    useEffect(() => { // EFFET FONDU AU CHARGEMENT DE LA PAGE
        setTimeout(() => {
            document.getElementById('register').classList.remove('opacity-0') 
        }, 100)
    })

    const handleInput = (e) => { // VERIFICATION DES CHAMPS INPUTS
        if(e.target.id === 'username') {
            setForm({
                ...form,
                username: e.target.value
            })
            if(!validUsername(e.target.value)) {
               e.target.classList.remove('focus:border-blue-800', 'focus:text-blue-700')
               e.target.classList.add('focus:border-red-500', 'focus:text-red-400')
            } else if(validUsername(e.target.value)){
                e.target.classList.remove('focus:border-red-500', 'focus:text-red-400')
               e.target.classList.add('focus:border-blue-800', 'focus:text-blue-700')
            }
        } else if(e.target.id === 'email') {
            setForm({
                ...form,
                email: e.target.value
            })
            if(!validEmail(e.target.value)) {
                e.target.classList.remove('focus:border-blue-800', 'focus:text-blue-700')
                e.target.classList.add('focus:border-red-500', 'focus:text-red-400')
             } else if(validEmail(e.target.value)){
                 e.target.classList.remove('focus:border-red-500', 'focus:text-red-400')
                e.target.classList.add('focus:border-blue-800', 'focus:text-blue-700')
             }
        } else if(e.target.id === 'password') {
            setForm({
                ...form,
                password: e.target.value
            })
            if(!validPassword(e.target.value)) {
                e.target.classList.remove('focus:border-blue-800', 'focus:text-blue-700')
                e.target.classList.add('focus:border-red-500', 'focus:text-red-400')
                document.getElementById('icon-times').classList.add('text-red-500', 'fa-times')
                document.getElementById('icon-times').classList.remove('text-green-500', 'fa-check')

             } else if(validPassword(e.target.value)){
                 e.target.classList.remove('focus:border-red-500', 'focus:text-red-400')
                e.target.classList.add('focus:border-blue-800', 'focus:text-blue-700')
                document.getElementById('icon-times').classList.remove('text-red-500', 'fa-times')
                document.getElementById('icon-times').classList.add('text-green-500', 'fa-check')
             }
        }
    }

    const handleSubmit = () => {
        const checkRules = document.getElementById('rules')
        if(!form.username || !form.email || !form.password) {
            setAlert({
                ...alert,
                msg: 'All inputs must be completed',
                type: 1
            })
            setTimeout(() => {
                setAlert({
                    msg: '',
                    type: 0
                })
            },  3000)
        }
        else if(!validUsername(form.username)) {
            setAlert({
                ...alert,
                msg: 'Username must have more than 2 characters',
                type: 1
            })
            setTimeout(() => {
                setAlert({
                    msg: '',
                    type: 0
                })
            },  3000)
        }
        else if(!validPassword(form.password)) {
            setAlert({
                ...alert,
                msg: 'Password must have 8 characters, 1 uppercase, 1 lowercase, 1 number',
                type: 1
            })
            setTimeout(() => {
                setAlert({
                    msg: '',
                    type: 0
                })
            },  3000)
        }
        else if(!validEmail(form.email)) {
            setAlert({
                ...alert,
                msg: 'Verify your email format',
                type: 1
            })
            setTimeout(() => {
                setAlert({
                    msg: '',
                    type: 0
                })
            },  3000)
        } 
        else if(!checkRules.checked) {
            setAlert({
                ...alert,
                msg: 'You must agree with all statements',
                type: 1
            })
            setTimeout(() => {
                setAlert({
                    msg: '',
                    type: 0
                })
            },  3000)
        }
        else {
            async function verifRegister() {
                const result = await getRegister(form.username, form.email, form.password)
                if(!result) {
                    setAlert({
                        ...alert,
                        msg: 'Email/Username already exist',
                        type: 1
                    })
                    setTimeout(() => {
                        setAlert({
                            msg: '',
                            type: 0
                        })
                    },  3000)
                } else {
                    setAlert({
                        ...alert,
                        msg: 'Your account has been created ! Welcome',
                        type: 2
                    })
                    setTimeout(() => {
                        setAlert({
                            msg: '',
                            type: 0
                        })
                        navigate('/')
                    },  3000)
                }
            }
            verifRegister()
        }
    }

  return (
    <div className='w-full h-screen bg-slate-900 flex'>
        
        <div className='w-1/3 h-screen bg-white flex items-center justify-center'>
            <img src={logo} />
        </div>
        <div id="register" className='relative transition-all duration-500 opacity-0 w-2/3 h-screen border-l-2 border-yellow-500 flex flex-col items-center justify-center'>
            <Alert
            type={alert.type} 
            msg={alert.msg}
            />
            <h3 className='text-white font-medium'><span className="text-4xl text-yellow-500">Feedy</span> Your feedback App</h3>
            <div className="mt-4 p-4 w-max bg-slate-800 rounded flex flex-col items-center shadow-xl">
                <p className="text-center text-white text-xs">All in <span className="font-medium">Feedy</span> is simple ! <br/>Our goal is to make the simpliest and usefull application possible !</p>
                <p className="text-center text-white text-xs">That's why we go directly to the essential. Get community feedback's of your product ! <span className="font-medium">Simple & easy</span></p>
            </div>
            <form className="mt-10 bg-white p-4 w-1/3 rounded flex flex-col space-y-4">
                <div className="relative flex justify-around items-center text-sm">
                    <label htmlFor='username' className="absolute right-4"><i className="fas fa-user text-sm" /></label>
                    <input type="text"
                    onChange={(e) => handleInput(e)}
                    value={form.username}
                    id="username" 
                    placeholder="username"
                    className="w-full transition-all duration-200 border border-zinc-300 focus:border-blue-800 focus:text-blue-700 outline-none p-2"/>
                </div>
                <div className="relative flex justify-around items-center text-sm">
                    <label htmlFor='email' className="absolute right-4"><i className="fas fa-at text-sm" /></label>
                    <input type="email"
                    onChange={(e) => handleInput(e)}
                    value={form.email}
                    id="email" 
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
                <p className="rounded text-xs bg-zinc-100 w-fit p-1 flex items-center"><i id="icon-times" className="fas fa-times text-red-500 mr-1" />8 characters, 1 uppercase, 1 lowercase, 1 number</p>
                <div className="flex items-center text-xs space-x-2">
                    <input
                    onClick={(e) => handleInput(e)}
                    type="checkbox" id="rules"/><label htmlFor="rules">I agree all statements in <a href="#" className="transition-all duration-200 underline font-medium hover:text-blue-800 hover:no-underline">Terms of service</a></label>
                </div>
                <button 
                onClick={(e) => e.preventDefault(handleSubmit())}
                type="submit" className="rounded transition-all duration-200 bg-slate-900 text-white p-3 text-sm hover:bg-emerald-400">Create account</button>
            </form>
            <p className="mt-6 text-white text-sm font-medium">Already have an account ? <Link to='/' className="hover:text-sky-400">Login</Link></p>
        </div>

    </div>
  )
}
