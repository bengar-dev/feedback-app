import React, {useEffect} from 'react'

import Profil from '../components/Profil'
import TopBoard from '../components/TopBoard'
import Feedy from '../components/Feedy'

export default function Home() {

  useEffect(() => {
    
    setTimeout(() => {
      document.querySelector('main').classList.remove('opacity-0', 'scale-50')
    }, 200)
    
  })

  return (
    <div className="min-h-screen bg-slate-100 pt-20">
      <main className="transition-all duration-500 delay-200 scale-50 opacity-0 flex space-x-10 ml-auto mr-auto w-8/12">
        <div className="w-1/4">
          <Profil />
        </div>
        <div className="w-2/3">
         <TopBoard />
         <div className="mt-6 w-full">
          <Feedy />
         </div>
        </div>
      </main>
    </div>
  )
}
