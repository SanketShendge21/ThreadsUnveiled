import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import Product from "@/models/Product";
import mongoose from "mongoose";
import Error from "next/error";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from "next/head";

export default function Slug({ addToCart, product, variants, buyNow, error }) {
	if(error == 404){
		return <Error statusCode={404} />
	}
	const router = useRouter();
	const { slug } = router.query;

	// Serviceability check
	const [pin, setPin] = useState();
	const [service, setService] = useState();
	const [color, setColor] = useState(product.color);
	const [size, setSize] = useState(product.size);	

	useEffect(() => {
		if(!error) {
	  setColor(product.color);
	  setSize(product.size);
		}
	}, [router.query])
	

	// Let the promise resolve then check if the service is available
	const checkServiceability = async () => {
		let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
		let pinJson = await pins.json();
		if (Object.keys(pinJson).includes(pin)) {
			setService(true); // Set the service as available
			toast.success("Service is available")
		} else {
			setService(false);
			toast.error("Sorry, service is not available")
		}
	};

	const onChangePin = (e) => {
		setPin(e.target.value);
	};

	
	const refreshVariant = (newColor, newSize)=>{	
		let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newColor][newSize]["slug"]}`;
		router.push(url) // Refresh the product
	}

	if(error == 404){
		return <Error statusCode={404} />
	}

	return (
		<div>
			<Head>
				<title>{product.title} - ThreadsUnveiled</title>
			</Head>
			<section className="text-gray-600 body-font overflow-hidden min-h-screen">
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
				<div className="container px-5 py-16 mx-auto">
					<div className="lg:w-4/5 mx-auto flex flex-wrap">
						<img
							alt="ecommerce"
							className="lg:w-1/2 w-full lg:h-auto px-24 object-cover object-top rounded"
							src={product.img}
						/>
						<div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
							<h2 className="text-sm title-font text-gray-500 tracking-widest">Threads Unveiled</h2>
							<h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title} ({product.color}/{product.size})</h1>
							<div className="flex mb-4">

								{/* <span className="flex items-center">
									<svg
										fill="currentColor"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										className="w-4 h-4 text-orange-500"
										viewBox="0 0 24 24"
									>
										<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
									</svg>
									<svg
										fill="currentColor"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										className="w-4 h-4 text-orange-500"
										viewBox="0 0 24 24"
									>
										<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
									</svg>
									<svg
										fill="currentColor"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										className="w-4 h-4 text-orange-500"
										viewBox="0 0 24 24"
									>
										<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
									</svg>
									<svg
										fill="currentColor"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										className="w-4 h-4 text-orange-500"
										viewBox="0 0 24 24"
									>
										<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
									</svg>
									<svg
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										className="w-4 h-4 text-orange-500"
										viewBox="0 0 24 24"
									>
										<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
									</svg>
									<span className="text-gray-600 ml-3">4 Reviews</span>
								</span>
								<span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
									<a className="text-gray-500">
										<svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
											<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
										</svg>
									</a>
									<a className="text-gray-500">
										<svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
											<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
										</svg>
									</a>
									<a className="text-gray-500">
										<svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
											<path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
										</svg>
									</a>
								</span> */}

							</div>
							<p className="leading-relaxed">
								{product.desc}
							</p>
							<div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
								<div className="flex">
									<span className="mr-3">Color</span>
									{Object.keys(variants).includes('Red') && Object.keys(variants["Red"]).includes(size) && (
										<button onClick={()=>{refreshVariant('Red',size)}} className={`border-2 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none ${color === 'Red'?'border-black' : 'border-gray-300'}`}></button>
									)}
									{Object.keys(variants).includes("Yellow") && Object.keys(variants["Yellow"]).includes(size) && (
										<button onClick={()=>{refreshVariant('Yellow',size)}} className={`border-2 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${color === 'Yellow'?'border-black' : 'border-gray-300'}`}></button>
									)}
									{Object.keys(variants).includes("Blue") && Object.keys(variants["Blue"]).includes(size) && (
										<button onClick={()=>{refreshVariant('Blue',size)}} className={`border-2 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none ${color === 'Blue'?'border-black' : 'border-gray-300'}`}></button>
									)}
									{Object.keys(variants).includes("Green") && Object.keys(variants["Green"]).includes(size) && (
										<button onClick={()=>{refreshVariant('Green',size)}} className={`border-2 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none ${color === 'Green'?'border-black' : 'border-gray-300'}`}></button>
									)}
									{Object.keys(variants).includes("Purple") && Object.keys(variants["Purple"]).includes(size) && (
										<button onClick={()=>{refreshVariant('Purple',size)}} className={`border-2 ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none ${color === 'Purple'?'border-black' : 'border-gray-300'}`}></button>
									)}
								</div>
								<div className="flex ml-6 items-center">
									<span className="mr-3">Size</span>
									<div className="relative">
										<select onChange={(e)=>{refreshVariant(color,e.target.value)}} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 text-base pl-3 pr-10">
											{Object.keys(variants[color]).includes('S') && <option value={'S'} >S</option>}
											{Object.keys(variants[color]).includes('M') && <option value={'M'} >M</option>}
											{Object.keys(variants[color]).includes('L') && <option value={'L'} >L</option>}
											{Object.keys(variants[color]).includes('XL') && <option value={'XL'} >XL</option>}
											{Object.keys(variants[color]).includes('XXL') && <option value={'XXL'} >XXL</option>}
										</select>
										<span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
											<svg
												fill="none"
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												className="w-4 h-4"
												viewBox="0 0 24 24"
											>
												<path d="M6 9l6 6 6-6"></path>
											</svg>
										</span>
									</div>
								</div>
							</div>
							<div className="flex">
								{product.availableQty <=0 && <span className="title-font font-medium text-2xl text-gray-900">Out of Stock</span>}
								{product.availableQty > 0 && <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>}
								<button disabled={product.availableQty<=0} onClick={()=>{buyNow(slug, 1, product.price, product.title, size, color)}} className="flex ml-6 text-white bg-orange-500 border-0 disabled:bg-orange-300 py-2 px-2 md:px-6 focus:outline-none hover:bg-orange-600 rounded">
									Buy Now
								</button>
								{/* Adding the item to the cart */}
								<button disabled={product.availableQty<=0}
									onClick={() => {
										addToCart(slug, product.qty, product.price, product.title, size, color);
									}}
									className="flex ml-4 text-white bg-orange-500 border-0 disabled:bg-orange-300 py-2 px-2 md:px-6 focus:outline-none hover:bg-orange-600 rounded"
								>
									<BsFillCartPlusFill className="mr-1 mt-1" />
									Add To Cart
								</button>
								{/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
									<svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
										<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
									</svg>
								</button> */}
							</div>
							<div className="pin mt-6 flex space-x-2 text-sm">
								<input
									onChange={onChangePin}
									type="text"
									name="pincode"
									id="pincode"
									className="px-2 border-2 rounded-md border-gray-400"
									placeholder="Enter Your Pincode"
								/>
								<button
									onClick={checkServiceability}
									className="flex ml-auto text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded"
								>
									Check
								</button>
							</div>
							{!service && service != null && <div className="text-red-700 text-sm mt-3">Sorry, we do not deliver to this pincode at this moment.</div>}
							{service && service != null && <div className="text-green-700 text-sm mt-3">The pincode is serviceable</div>}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export async function getServerSideProps(context) {
	let error=null;
	if (!mongoose.connections[0].readyState) {
		// if no connection is available connect to the server and return
		await mongoose.connect(process.env.MONGO_URI);
	}
	// Fetch the main product based on the provided slug
	let product = await Product.findOne({ slug: context.query.slug });

	if(product == null){
		return {
			props: { error:404 }
		};
	}

	// Fetch all variants of the product with the same title (assuming variants have the same title)
	let variants = await Product.find({ title: product.title, category: product.category});

	// Create an empty object to store color, size, and corresponding slugs
	let colorSizeSlug = {}; // {red : {xl : {slug : threads-unveiled}}}

	// Iterate over each variant to populate the colorSizeSlug object
	for (let item of variants) {
		// Check if the color is already a key in colorSizeSlug
		if (Object.keys(colorSizeSlug).includes(item.color)) {
			// If color exists,and size exists set the slug
			colorSizeSlug[item.color][item.size] = { slug: item.slug };
		} else {
			// If color doesn't exist, create a new entry for that color with an empty object for sizes
			colorSizeSlug[item.color] = {};

			// Add a new entry for the size with the slug
			colorSizeSlug[item.color][item.size] = { slug: item.slug };
		}
	}

	// Now, colorSizeSlug object is populated with color, size, and corresponding slugs

	return {
		// We have a _id field in the product which is a object so we need to convert it to a string and then again parse as JSON object
		props: { error:error, product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) }, // will be passed to the page component as props
	};
}
