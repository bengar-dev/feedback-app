import React from 'react'

export default function Alert(props) {

  let classAlert = ''

  if(props.type === 1) {
    classAlert = 'absolute top-10 w-max p-2 rounded bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium shadow-lg'
  } else if (props.type === 2) {
    classAlert = 'absolute top-10 w-max p-2 rounded bg-gradient-to-r from-emerald-500 to-green-500 text-white font-medium shadow-lg'
  }

  return (
    <div className={classAlert}>
      {props.msg}
    </div>
  )
}
