import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CiShoppingCart } from "react-icons/ci";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { BsBagCheckFill } from "react-icons/bs";
const Navbar = () => {
    const toggleCart = () => {
        // We are removing and adding translate-x-full class to toggle the sideCart menu
        if(ref.current.classList.contains('translate-x-full')){
            ref.current.classList.remove('translate-x-full');
            ref.current.classList.add('translate-x-0');
        }
        else if(!ref.current.classList.contains('translate-x-full')){
            ref.current.classList.remove('translate-x-0');
            ref.current.classList.add('translate-x-full');
        }
    }
    // Using the useRef hook to access the sideCart menu using ref
    const ref = useRef();
  return (

    // Code for Navbar - Start
    // md:property referes to properties that will be applied to devies of medium screen size or above
    <div className='flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md'>
        <div className="logo mx-5">
            <Link href={'/'}><Image src="/logo.png" alt="Error" width={200} height={40}/></Link>
        </div>
        <div className="nav">
            <ul className='flex items-center space-x-4 font-bold md:text-l'>
                <Link href={'/hoodies'}><li>Hoodies</li></Link>
                <Link href={'/tshirts'}><li>Tshirts</li></Link>
                <Link href={'/stickers'}><li>Stickers</li></Link>
                <Link href={'/mugs'}><li>Mugs</li></Link>
            </ul>
        </div>
        <div className="cart absolute right-0 top-4 mx-5">
            <CiShoppingCart onClick={toggleCart} className='text-xl md:text-2xl cursor-pointer'/> {/* Using React Icon */}
        </div>
    {/* Navbar End  */}
        
        {/* Code for Sidebar - Start */}
        {/* Create a reference for this element using React's useRef hook */}
        {/* CSS Properties 
        1. absolute top-0 right-0: Positions the cart at the top-right corner of its containing element.
        2. transform transition-transform translate-x-full: Initiates a transformation and transition effect. The translate-x-full moves the cart fully outside the viewport horizontally. */}
        <div ref={ref} className="z-10 sideCart w-72 h-full absolute top-0 right-0 bg-slate-50 px-10 p-10 transfrom transition-transform translate-x-full">
            <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
            <span className='absolute top-5 right-3 cursor-pointer text-2xl text-orange-500' onClick={toggleCart}><IoClose /></span>
            <ol className='list-decimal font-semibold'>
                <li>
                    <div className="item flex my-3">
                        <div className='w-2/3 flex items-center justify-center font-semibold'>Tshirts</div>
                        <div className='w-1/3 flex items-center justify-center font-semibold text-lg'>
                        <FaCircleMinus className='cursor-pointer text-orange-500' />
                        <span className='mx-2 text-sm'>1</span>
                        <FaCirclePlus className='cursor-pointer text-orange-500' />
                        </div>
                    </div>
                </li>
                <li>
                    <div className="item flex my-3">
                        <div className='w-2/3 flex items-center justify-center font-semibold'>Tshirts</div>
                        <div className='w-1/3 flex items-center justify-center font-semibold text-lg'>
                        <FaCircleMinus className='cursor-pointer text-orange-500' />
                        <span className='mx-2 text-sm'>1</span>
                        <FaCirclePlus className='cursor-pointer text-orange-500' />
                        </div>
                    </div>
                </li>
                <li>
                    <div className="item flex my-3">
                        <div className='w-2/3 flex items-center justify-center font-semibold'>Tshirts</div>
                        <div className='w-1/3 flex items-center justify-center font-semibold text-lg'>
                        <FaCircleMinus className='cursor-pointer text-orange-500' />
                        <span className='mx-2 text-sm'>1</span>
                        <FaCirclePlus className='cursor-pointer text-orange-500' />
                        </div>
                    </div>
                </li>
                <li>
                    <div className="item flex my-3">
                        <div className='w-2/3 flex items-center justify-center font-semibold'>Tshirts</div>
                        <div className='w-1/3 flex items-center justify-center font-semibold text-lg'>
                        <FaCircleMinus className='cursor-pointer text-orange-500' />
                        <span className='mx-2 text-sm'>1</span>
                        <FaCirclePlus className='cursor-pointer text-orange-500' />
                        </div>
                    </div>
                </li>
                <li>
                    <div className="item flex my-3">
                        <div className='w-2/3 flex items-center justify-center font-semibold'>Tshirts</div>
                        <div className='w-1/3 flex items-center justify-center font-semibold text-lg'>
                        <FaCircleMinus className='cursor-pointer text-orange-500' />
                        <span className='mx-2 text-sm'>1</span>
                        <FaCirclePlus className='cursor-pointer text-orange-500' />
                        </div>
                    </div>
                </li>
            </ol>
            <button className="flex mx-auto mt-16 text-white bg-orange-500 border-0 py-2 px-5 focus:outline-none hover:bg-orange-600 rounded text-md">
            <BsBagCheckFill className='m-1' />Checkout</button>
        </div>
    </div>
  )
}

export default Navbar
