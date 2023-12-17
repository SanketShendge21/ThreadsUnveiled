import Link from 'next/link'
import React from 'react'
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { CiMoneyCheck1 } from "react-icons/ci";

const Checkout = ({cart, addToCart, removeFromCart, subTotal}) => {
  return (
    <div className='container px-8 sm:m-auto'>
      <h1 className='font-bold text-xl my-8 text-center' >Checkout</h1>
      <h2 className='text-xl font-bold'>Delivery Details</h2>
      <div className="mx-auto flex my-2">
        <div className='px-2 w-1/2'>
        <div className="mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Name</label>
          <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        </div>

        <div className='px-2 w-1/2'>
        <div className="mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
          <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        </div>
      </div>
      
      <div className='px-2 w-full'>
      <div className="mb-4">
        <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
        <textarea id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" cols="30" rows="2"></textarea>
      </div>
      </div>

      <div className="mx-auto flex my-2">
        <div className='px-2 w-1/2'>
        <div className="mb-4">
          <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
          <input type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        </div>

        <div className='px-2 w-1/2'>
        <div className="mb-4">
          <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
          <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        </div>


      </div>
      <div className="mx-auto flex my-2">
      <div className='px-2 w-1/2'>
        <div className="mb-4">
          <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
          <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        </div>

        <div className='px-2 w-1/2'>
        <div className="mb-4">
          <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
          <input type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        </div>
      </div>
      <h2 className='text-xl font-bold'>2.Review Cart & Pay</h2>
      <div className="sideCart bg-slate-50 p-6 m-2 shadow-md">
				<ol className="list-decimal font-semibold">
					{/* If the cart is empty display no items message */}
					{ Object.keys(cart).length === 0 &&
						<div className="my-2">No items present in the cart.</div>
					}
					
					 {/* iterates through each item in the cart object using Object.keys(cart). It returns an array of React elements, each representing an item in the cart. */}
					{Object.keys(cart).map((k)=>{
            return <li key={k}>
						<div className="item flex my-3">
							<div className="flex font-semibold">{cart[k].name}</div>
							<div className="w-1/3 flex items-center justify-center font-semibold text-lg">
								<FaCircleMinus onClick={()=>{removeFromCart(k,1,cart[k].price, cart[k].name,cart[k].size,cart[k].variant)}} className="cursor-pointer text-orange-500" />
								<span className="mx-2 text-sm">{cart[k].qty}</span>
								<FaCirclePlus onClick={()=>{addToCart(k,1,cart[k].price, cart[k].name,cart[k].size,cart[k].variant)}} className="cursor-pointer text-orange-500" />
							</div>
						</div>
					</li> })}
				</ol>
        <span className="font-bold">Subtotal: {subTotal}</span>
			</div>
      <div className="mx-4">
        <Link href={"/checkout"}>
          <button className="flex mr-2 text-white bg-orange-500 border-0 py-2 pr-2 focus:outline-none hover:bg-orange-600 rounded text-sm">
          <CiMoneyCheck1 className="m-1 text-center text-xl" /> <span className='mt-1 font-semibold'>Pay : ₹{subTotal}</span>
          
					</button>
        </Link>
      </div>
    </div>
  )
}

export default Checkout