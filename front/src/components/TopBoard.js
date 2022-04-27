import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import ModalAddFeed from './ModalAddFeed'

export default function TopBoard() {

  const [toggle, setToggle] = useState(false)

  const {productArray} = useSelector(state => ({
    ...state.productReducer
  }))

  const handleToggle = () => {
    setToggle(!toggle)
  }

  const handleChange = (e) => {
    console.log(e.selected)
  }

  return (
    <div className="flex items-center h-max bg-sky-900 rounded p-4 text-white text-sm">
      {toggle &&
      <ModalAddFeed 
      toggle={handleToggle}/>
      }
        <i className="fas fa-comment-dots" />
        <p className="ml-4 font-medium"><span className="font-bold text-sky-400">{productArray.length}</span> Feedback</p>
        <div className="ml-10 flex items-center space-x-2">
            <p>Sort by : </p>
            <select
            onChange={(e) => handleChange(e)}
            className="w-40 bg-transparent font-medium outline-none">
                <option className="p-2 bg-sky-900 text-white">Most Upvotes</option>
                <option className="p-2 bg-sky-900 text-white">Alphabétic</option>
            </select>
        </div>
        <button 
        onClick={(e) => e.preventDefault(handleToggle())}
        className="transition-all duration-200 text-xs mr-0 ml-auto flex items-center bg-yellow-500 hover:bg-rose-400 p-2 rounded">
            <i className="text-xs fas fa-plus mr-2" />
            Add feedback
        </button>
    </div>
  )
}
