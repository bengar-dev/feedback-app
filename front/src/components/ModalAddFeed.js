import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sendProduct } from '../services/product'

export default function ModalAddFeed(props) {

  const dispatch = useDispatch()

  const {productArray, userInfo} = useSelector(state => ({
    ...state.productReducer,
    ...state.userReducer
  }))

  const [addFeedBack, setAddFeedBack] = useState({
    name: '',
    manufacturer: '',
    price: '',
    link: '',
    desc: '',
    image: ''
  })

  const handleInput = (e) => {
    if(e.target.id === 'name') {
      setAddFeedBack({
        ...addFeedBack,
        name: e.target.value
      })
    } else if(e.target.id === 'manufacturer') {
      setAddFeedBack({
        ...addFeedBack,
        manufacturer: e.target.value
      })
    } else if(e.target.id === 'price') {
      setAddFeedBack({
        ...addFeedBack,
        price: e.target.value
      })
    } else if(e.target.id === 'link') {
      setAddFeedBack({
        ...addFeedBack,
        link: e.target.value
      })
    } else if(e.target.id === 'desc') {
      setAddFeedBack({
        ...addFeedBack,
        desc: e.target.value
      })
    } else if(e.target.id === 'image') {
      setAddFeedBack({
        ...addFeedBack,
        image: e.target.value
      })
    }
  }

  const handleSubmit = () => {

    async function verifSubmit() {
      const result = await sendProduct(addFeedBack)
      if(typeof result === 'string') {
        console.log(result)
      } else {
        setAddFeedBack({
          name: '',
          manufacturer: '',
          price: '',
          link: '',
          desc: '',
          image: ''
        })
        let newObject = {
          ...result,
          User: userInfo
        }
        dispatch({
          type: 'ADDPRODUCT',
          payload: newObject
        })
        props.toggle()
      }
    }
    verifSubmit()
    
  }

  return (
    <div className="absolute z-20 top-0 left-0 w-full min-h-screen bg-slate-800/50 flex items-center justify-center">
        <button 
        onClick={(e) => e.preventDefault(props.toggle())}
        className="absolute top-2 right-4"><i className='transition-all duration-200 fas fa-times text-6xl hover:text-red-500' /></button>
        <form className="rounded bg-white shadow-xl p-4 w-1/2 text-slate-900 flex flex-col space-y-2">
            <h1 className="p-2 text-slate-600 font-medium text-center text-xl">Add a new feedback</h1>
            <label htmlFor="name" className="text-sm">Name</label>
            <input 
            value={addFeedBack.name}
            onChange={(e) => handleInput(e)}
            type="text" id="name" className="border w-full p-1 outline-none" placeholder="Name"/>
            <label htmlFor="manufacturer" className="text-sm">Manufacturer</label>
            <input 
            value={addFeedBack.manufacturer}
            onChange={(e) => handleInput(e)}
            type="text" id="manufacturer" className="border w-full p-1 outline-none" placeholder="Manufacturer"/>
            <label htmlFor="price" className="text-sm">Recommended price</label>
            <input 
            value={addFeedBack.price}
            onChange={(e) => handleInput(e)}
            type="text" id="price" className="border w-full p-1 outline-none" placeholder="Price in $"/>
            <label htmlFor="link" className="text-sm">Link to product details</label>
            <input 
            value={addFeedBack.link}
            onChange={(e) => handleInput(e)}
            type="text" id="link" className="border w-full p-1 outline-none" placeholder="http://..."/>
            <label htmlFor="desc" className="text-sm">Description</label>
            <textarea 
            value={addFeedBack.desc}
            onChange={(e) => handleInput(e)}
            id="desc" className="border text-sm p-2 h-40 resize-none outline-none"></textarea>
            <label htmlFor="image" className="text-sm">Image</label>
            <input 
            value={addFeedBack.image}
            onChange={(e) => handleInput(e)}
            type="file" id="image" className="border w-full p-1"/>
            <button 
            onClick={(e) => e.preventDefault(handleSubmit())}
            className="transition-all duration-200 bg-emerald-400 border border-emerald-600 text-emerald-800 font-medium hover:bg-emerald-500 hover:shadow-lg p-2">Submit</button>
        </form>

    </div>
  )
}
